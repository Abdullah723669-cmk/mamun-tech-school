import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface ParamsProps {
  params: Promise<{ slug: string }>
}

export async function GET(req: Request, { params }: ParamsProps) {
  try {
    const { slug } = await params
    const course = await prisma.course.findUnique({
      where: { slug }
    })

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
