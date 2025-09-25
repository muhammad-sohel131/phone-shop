import connectDB from "@/lib/connectDB";
import { Phone } from "@/models/Model";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const sort = searchParams.get("sort") 

    let query = Phone.find()

    if (sort === "recent") {
      query = query.sort({ createdAt: -1 })
    }
    if (limit) {
      query = query.limit(Number(limit))
    }
    const phones = await query.exec()

    return NextResponse.json(phones)
  } catch (err) {
    console.error("Error fetching phones:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newPhone = await new Phone(body).save();

    return NextResponse.json(newPhone, { status: 201 });
  } catch (error) {
    console.error("Error creating phone and specs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Phone ID is required for deletion" },
        { status: 400 }
      );
    }

    const deletedPhone = await Phone.findByIdAndDelete(id);

    if (!deletedPhone) {
      return NextResponse.json(
        { error: "Phone not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Phone deleted successfully", deletedPhone },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting phone:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}