import { NextResponse } from "next/server"
import { getUsers } from "@/lib/users"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    // In a real application, you would create a session or JWT here
    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}

