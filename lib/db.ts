import { phoneSchema } from "@/app/dashboard/admin/addProductForm/[id]/page";
import { z } from "zod";

// Infer the TypeScript type
export type TPhone = z.infer<typeof phoneSchema>;

export type TUser = {
  _id?: number
  name: string
  email: string
  password?: string 
  role: "user" | "admin"
  avatar?: string
  createdAt?: Date
}

export type TCartItem = {
  phoneId: string
  quantity: number
  color?: string
  storage?: string
}

export type TReview = {
  _id?: number
  userId: number
  phoneId: number
  rating: number
  content: string
  createdAt?: Date
}

export type TDiscussion = {
  _id?: string
  userId: string
  title: string
  content: string
  createdAt: Date
  replyCount: number
}

export type TReply = {
  _id?: string
  discussionId: string
  userId: number
  content: string
  createdAt?: Date
}




// JSON storage for user actions
export type TOrder = {
  _id?: string
  userId: number
  items: {
    phoneId: number
    quantity: number
  }[]
  total: number
  status: "processing" | "shipped" | "delivered"
  createdAt: Date
}


export const globalVariables = {
  url: process.env.NEXT_PUBLIC_API_URL!,
};


