import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { Phone} from "@/models/Model";

export async function GET(request: Request) {
  try {
    await connectDB();
    const phones = await Phone.find();
    
    return NextResponse.json(phones);
  } catch (err) {
    return NextResponse.json({ error: "Something Wrong" }, { status: 500 });
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

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();


    if (!body._id) {
      return NextResponse.json(
        { error: "Phone ID is required for updating" },
        { status: 400 }
      );
    }

    const updatedPhone = await Phone.findByIdAndUpdate(
      body._id, 
      body, 
      { new: true } 
    );

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