import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()
    console.log("Contact submission received:", { name, email, subject, message })
    return NextResponse.json({ message: "Message received successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
