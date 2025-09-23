import { NextResponse } from "next/server"
import { createUser, getUsers } from "@/lib/users"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  const users = getUsers()
  const existingUser = users.find((u) => u.email === email)

  if (existingUser) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 })
  }

  
  const newUser = createUser({
   ...body
  })

  // In a real application, you would create a session or JWT here
  const { password: _, ...userWithoutPassword } = newUser
  return NextResponse.json(userWithoutPassword, { status: 201 })
}

