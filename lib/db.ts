import { phoneSchema } from "@/app/admin/addProductForm/[id]/page";
import { z } from "zod";

// Infer the TypeScript type
export type Phone = z.infer<typeof phoneSchema>;

export type TUser = {
  _id?: number
  name: string
  email: string
  password?: string 
  role: "user" | "admin"
  avatar?: string
  createdAt?: Date
}

export type CartItem = {
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
export type Order = {
  id: string
  userId: number
  items: {
    phoneId: number
    quantity: number
  }[]
  total: number
  status: "processing" | "shipped" | "delivered"
  createdAt: string
}

export type UserDiscussion = {
  id: number
  userId: number
  title: string
  content: string
  createdAt: string
}

export type UserReview = {
  id: number
  userId: number
  phoneId: number
  rating: number
  title: string
  content: string
  createdAt: string
}

export type UserComment = {
  id: number
  userId: number
  discussionId: number
  content: string
  createdAt: string
}

export const userOrders: Order[] = []
export const userDiscussions: UserDiscussion[] = []
export const userReviews: UserReview[] = []
export const userComments: UserComment[] = []


export const addDiscussion = (discussion: UserDiscussion) => {
  userDiscussions.push(discussion)
}

export const addReview = (review: UserReview) => {
  userReviews.push(review)
}

export const addComment = (comment: UserComment) => {
  userComments.push(comment)
}

// New functions for data persistence using localStorage
export function readDb() {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("phonefinderDb")
    if (storedData) {
      return JSON.parse(storedData)
    }
  }
  return {
    orders: userOrders,
    reviews: userReviews,
    discussions: userDiscussions,
  }
}

export function writeDb(data: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("phonefinderDb", JSON.stringify(data))
  }
}

export const globalVariables = {
  url: "http://localhost:3000",
  // url: "https://phone-shop-rho-one.vercel.app",
}

