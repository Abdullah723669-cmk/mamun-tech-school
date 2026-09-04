import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"

async function requireAdmin() {
  const session = await auth()
  if (!session || (session.user as any).role !== "ADMIN") return null
  return session
}

// PUT /api/admin/courses/[id] — update an existing course
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({ where: { id: params.id } })
    if (!existingCourse) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 })
    }

    // Regenerate slug only if title changed
    let slug = existingCourse.slug
    if (title && title !== existingCourse.title) {
      slug = slugify(title)
      const slugConflict = await prisma.course.findFirst({
        where: { slug, NOT: { id: params.id } },
      })
      if (slugConflict) {
        slug = `${slug}-${Date.now()}`
      }
    }

    const updated = await prisma.course.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        slug,
        ...(description && { description }),
        ...(shortDesc && { shortDesc }),
        ...(image && { image }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(duration && { duration }),
        ...(level && { level }),
        ...(category && { category }),
        ...(instructor && { instructor }),
        ...(instructorBio && { instructorBio }),
        instructorAvatar: instructorAvatar !== undefined ? (instructorAvatar || null) : existingCourse.instructorAvatar,
        ...(curriculum !== undefined && {
          curriculum: typeof curriculum === "string" ? curriculum : JSON.stringify(curriculum),
        }),
        ...(highlights !== undefined && {
          highlights: typeof highlights === "string" ? highlights : JSON.stringify(highlights),
        }),
        ...(requirements !== undefined && {
          requirements: typeof requirements === "string" ? requirements : JSON.stringify(requirements),
        }),
        ...(published !== undefined && { published }),
        ...(featured !== undefined && { featured }),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Update course error:", error)
    return NextResponse.json({ message: "Failed to update course" }, { status: 500 })
  }
}

// DELETE /api/admin/courses/[id] — delete a course
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  try {
    await prisma.course.delete({ where: { id: params.id } })
    return NextResponse.json({ message: "Course deleted" })
  } catch (error) {
    console.error("Delete course error:", error)
    return NextResponse.json({ message: "Failed to delete course" }, { status: 500 })
  }
}
