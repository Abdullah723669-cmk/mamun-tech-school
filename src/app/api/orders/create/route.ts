import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { courseIds, total } = await req.json()
    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return NextResponse.json({ message: "Invalid items" }, { status: 400 })
    }

    const userId = session.user.id

    // Create Order and Enrollments transaction
    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: "PAID",
          stripeId: `pi_mock_${Date.now()}`,
          orderItems: {
            create: courseIds.map((id: string) => ({
              courseId: id,
              price: total / courseIds.length,
            })),
          },
        },
      })

      // Create enrollments
      for (const courseId of courseIds) {
        await tx.enrollment.upsert({
          where: {
            userId_courseId: { userId, courseId },
          },
          update: { status: "ACTIVE" },
          create: {
            userId,
            courseId,
            status: "ACTIVE",
            progress: 10,
          },
        })

        // Increment totalStudents
        await tx.course.update({
          where: { id: courseId },
          data: { totalStudents: { increment: 1 } },
        })
      }

      return createdOrder
    })

    return NextResponse.json({ message: "Order created successfully", orderId: order.id }, { status: 201 })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
