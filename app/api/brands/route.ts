// app/api/brands/route.ts
import { NextResponse } from "next/server";
import { Phone } from "@/models/Model";
import connectDB from "@/lib/connectDB";

export async function GET() {
  try {
    await connectDB();

    const brands = await Phone.distinct("brand");

    return NextResponse.json(brands, { headers: { "x-revalidate": "1" } });
  } catch (err) {
    console.error("Error fetching brands:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
