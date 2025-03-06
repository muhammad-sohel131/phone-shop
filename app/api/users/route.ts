import { NextResponse } from "next/server"
import { readDb, writeDb } from "@/lib/db"

export async function GET() {
  const db = readDb()
  return NextResponse.json(db.users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const db = readDb()
  const newUser = { ...body, id: db.users.length + 1 }
  db.users.push(newUser)
  writeDb(db)
  return NextResponse.json(newUser, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body
  const db = readDb()
  const index = db.users.findIndex((user: any) => user.id === id)
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...updates }
    writeDb(db)
    return NextResponse.json(db.users[index])
  }
  return NextResponse.json({ error: "User not found" }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (id) {
    const db = readDb()
    const initialLength = db.users.length
    db.users = db.users.filter((user: any) => user.id !== Number.parseInt(id, 10))
    if (db.users.length < initialLength) {
      writeDb(db)
      return NextResponse.json({ message: "User deleted successfully" })
    }
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  return NextResponse.json({ error: "Invalid request" }, { status: 400 })
}

