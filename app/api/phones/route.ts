
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server"
import { Phone } from "@/models/Model"


export async function GET(request: Request) {
  try{
    await connectDB();
    const phones = await Phone.find()
    
    return NextResponse.json(phones)
}catch(err){
    console.log(err)
    return NextResponse.json({error: "Something Wrong"}, {status: 500})
}
}

// export async function POST(request: Request) {
//   const body = await request.json()
//   const newPhone = createPhone(body)
//   return NextResponse.json(newPhone, { status: 201 })
// }

// export async function PUT(request: Request) {
//   const body = await request.json()
//   const { id, ...updates } = body
//   const updatedPhone = updatePhone(id, updates)
//   if (updatedPhone) {
//     return NextResponse.json(updatedPhone)
//   }
//   return NextResponse.json({ error: "Phone not found" }, { status: 404 })
// }

// export async function DELETE(request: Request) {
//   const { searchParams } = new URL(request.url)
//   const id = searchParams.get("id")
//   if (id) {
//     const deleted = deletePhone(Number.parseInt(id, 10))
//     if (deleted) {
//       return NextResponse.json({ message: "Phone deleted successfully" })
//     }
//     return NextResponse.json({ error: "Phone not found" }, { status: 404 })
//   }
//   return NextResponse.json({ error: "Invalid request" }, { status: 400 })
// }

