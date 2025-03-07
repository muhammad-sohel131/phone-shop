import { NextResponse } from "next/server"
import { readDb, writeDb } from "@/lib/db"
import connectDB from "@/lib/connectDB";
import { User } from "@/models/Model";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try{
    await connectDB();
    const { name, email } = await request.json()
    const newUser = new User({name, email})
    await newUser.save();
    return NextResponse.json(newUser, {status: 201})
}catch(err){
    console.log(err)
    return NextResponse.json({error: "Something Wrong"}, {status: 500})
}
}

