// import {Phone} from "@/models/Model"


// export function getPhones(): Phone[] {

//   return 
// }

// // export function getPhoneById(id: number): Phone | undefined {
// //   return phones.find((phone) => phone.id === id)
// // }

// // export function createPhone(phone: Omit<Phone, "id">): Phone {
// //   const newPhone = { ...phone, id: phones.length + 1 }
// //   phones.push(newPhone)
// //   return newPhone
// // }

// // export function updatePhone(id: number, updates: Partial<Phone>): Phone | undefined {
// //   const index = phones.findIndex((phone) => phone.id === id)
// //   if (index !== -1) {
// //     phones[index] = { ...phones[index], ...updates }
// //     return phones[index]
// //   }
// //   return undefined
// // }

// // export function deletePhone(id: number): boolean {
// //   const initialLength = phones.length
// //   phones = phones.filter((phone) => phone.id !== id)
// //   return phones.length < initialLength
// // }
// import { NextResponse } from "next/server";

// export async function POST(request) {
//     try{
//         await connectDB();
//         const { name, email } = await request.json()
//         const newUser = new User({name, email})
//         await newUser.save();
//         return NextResponse.json(newUser, {status: 201})
//     }catch(err){
//         console.log(err)
//         return NextResponse.json({error: "Something Wrong"}, {status: 500})
//     }
// }
