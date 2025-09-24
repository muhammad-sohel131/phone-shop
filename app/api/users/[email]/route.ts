import connectDB from "@/lib/connectDB"; // Import your database connection utility
import { User } from "@/models/Model";
import { NextResponse } from "next/server";

export async function GET({ params } : {params: {email: string}}) {
  try {
    await connectDB();
    const { email } = params; 
    const user = await User.find({email});
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}