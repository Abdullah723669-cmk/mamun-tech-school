import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"

async function requireAdmin() {
  const session = await auth()
  if (!session || (session.user as any).role !== "ADMIN") {
    return null
  }
  return session
}

// POST /api/admin/courses — create a new course
export async function POST(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  try {
    const body = await request.json()
    const {
      title,
      description,
      shortDesc,
      image,
      price,
      duration,
      level,
      category,
      instructor,
      instructorBio,
      instructorAvatar,
      curriculum,
      highlights,
      requirements,
      published,
      featured,
    } = body

    if (!title || !description || !shortDesc || !image || !price || !duration || !category || !instructor || !instructorBio) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Generate unique slug
    let slug = slugify(title)
    const existing = await prisma.course.findUnique({ where: { slug } })
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        shortDesc,
        image,
        price: parseFloat(price),
        duration,
        level: level || "Beginner",
        category,
        instructor,
        instructorBio,
        instructorAvatar: instructorAvatar || null,
        curriculum: typeof curriculum === "string" ? curriculum : JSON.stringify(curriculum || []),
        highlights: typeof highlights === "string" ? highlights : JSON.stringify(highlights || []),
        requirements: typeof requirements === "string" ? requirements : JSON.stringify(requirements || []),
        published: published !== undefined ? published : true,
        featured: featured || false,
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error("Create course error:", error)
    return NextResponse.json({ message: "Failed to create course" }, { status: 500 })
  }
}

// GET /api/admin/courses — list all courses (including unpublished)
export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch courses" }, { status: 500 })
  }
}
