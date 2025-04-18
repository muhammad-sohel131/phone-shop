import connectDB from "@/lib/connectDB";
import { Phone } from "@/models/Model";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: Promise<{ id: string }>}) {
    const {id}= await params;
    try {
      await connectDB();
      const phones = await Phone.findById(id);
      
      return NextResponse.json(phones);
    } catch (err) {
      return NextResponse.json({ error: "Something Wrong" }, { status: 500 });
    }
  }

export async function PUT(request: Request, {params}: {params: Promise<{id: string}>}) {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = await params
    
    if (!id) {
      console.log("ok")
      return NextResponse.json(
        { error: "Phone ID is required for updating" },
        { status: 400 }
      );
    }
    console.log(id)
    const updatedPhone = await Phone.findByIdAndUpdate(
      id,
      body, 
      { new: true } 
    );
    console.log(updatedPhone)
    if (!updatedPhone) {
      return NextResponse.json(
        { error: "Phone not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedPhone, { status: 200 });
  } catch (error) {
    console.error("Error updating phone:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}