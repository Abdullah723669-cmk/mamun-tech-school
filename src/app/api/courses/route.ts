import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
