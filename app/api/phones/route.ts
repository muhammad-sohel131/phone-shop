import connectDB from "@/lib/connectDB";
import { Phone } from "@/models/Model";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") || "12");
    const page = Number(searchParams.get("page") || "1");
    const sortBy = searchParams.get("sort") || "featured";
    const brandParam = searchParams.get("brand") || "";
    const minPrice = Number(searchParams.get("minPrice") || "0");
    const maxPrice = Number(searchParams.get("maxPrice") || "2000000");

    const brands = brandParam ? brandParam.split(",") : [];

    let query = Phone.find();

    // Filter by brands
    if (brands.length > 0) query = query.where("brand").in(brands);

    // Filter by price
    query = query.where("specs.originalPrice").gte(minPrice).lte(maxPrice);

    // Sorting
    switch (sortBy) {
      case "price-low":
        query = query.sort({ "specs.originalPrice": 1 });
        break;
      case "price-high":
        query = query.sort({ "specs.originalPrice": -1 });
        break;
      case "newest":
        query = query.sort({ createdAt: -1 });
        break;
      default:
        query = query.sort({ featuredRank: 1 }); // optional
    }

    // Pagination
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const phones = await query.exec();

    return NextResponse.json(phones, { headers: { "x-revalidate": "1" } }); // ISR tag optional
  } catch (err) {
    console.error("Error fetching phones:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
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