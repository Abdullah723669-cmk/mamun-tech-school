import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, phone: true, bio: true, address: true, avatar: true, role: true }
  })

  return NextResponse.json(user)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { name, phone, bio, address } = await req.json()

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { name, phone, bio, address }
  })

  return NextResponse.json(updatedUser)
}
