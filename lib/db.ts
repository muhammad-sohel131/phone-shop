import { phoneSchema } from "@/app/admin/addProductForm/[id]/page";
import { parseISO, formatDistanceToNow } from "date-fns"
import { z } from "zod";

// Remove fs and path imports
// import fs from "fs"
// import path from "path"

// Remove DB_PATH constant
// const DB_PATH = path.join(process.cwd(), "data.json")

// Mock database for the Phone Finder app

// export type Phone = {
//   id: number
//   name: string
//   brand: string
//   price: number
//   originalPrice?: number
//   rating: number
//   image: string
//   images: string[]
//   isNew: boolean
//   isFeatured: boolean
//   specs: {
//     display: string
//     resolution: string
//     processor: string
//     ram: string[]
//     storage: string[]
//     battery: string
//     os: string
//     weight: string
//     dimensions: string
//     camera: {
//       main: string
//       ultraWide: string
//       telephoto: string
//       front: string
//       features: string[]
//     }
//     features: {
//       fiveG: boolean
//       wirelessCharging: boolean
//       waterResistance: string
//       expandableStorage: boolean
//       headphoneJack: boolean
//       stylus: boolean
//       faceUnlock: boolean
//       fingerprint: boolean
//     }
//     colors: string[]
//   }
//   description: string
//   releaseDate: string
// }

// Infer the TypeScript type
export type Phone = z.infer<typeof phoneSchema>;

export type User = {
  id: number
  name: string
  email: string
  password: string // In a real app, this would be hashed
  role: "user" | "admin" | "moderator"
  avatar: string
  createdAt: string
}

export type CartItem = {
  phoneId: string
  quantity: number
  color?: string
  storage?: string
}

export type Review = {
  id: number
  userId: number
  phoneId: number
  rating: number
  title: string
  content: string
  pros: string[]
  cons: string[]
  createdAt: string
  helpfulCount: number
}

export type Discussion = {
  id: number
  userId: number
  title: string
  content: string
  tags: string[]
  createdAt: string
  viewCount: number
  replyCount: number
}

export type Reply = {
  id: number
  discussionId: number
  userId: number
  content: string
  createdAt: string
  helpfulCount: number
}


export const users: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@phonefinder.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "user",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-02-15",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "moderator",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-03-20",
  },
]

export const reviews: Review[] = [
  {
    id: 1,
    userId: 2,
    phoneId: 1,
    rating: 4.8,
    title: "Impressive camera and performance",
    content:
      "After using the iPhone 15 Pro for a month, I'm extremely impressed with the camera quality and overall performance. The A17 Pro chip handles everything I throw at it with ease, and the battery life is better than I expected. The titanium design feels premium and is surprisingly lightweight.",
    pros: ["Excellent camera system", "Fast performance", "Premium build quality", "Good battery life"],
    cons: ["Expensive", "No USB-C to Lightning adapter included"],
    createdAt: formatDistanceToNow(parseISO("2023-10-25T14:30:00Z"), { addSuffix: true }),
    helpfulCount: 42,
  },
  {
    id: 2,
    userId: 3,
    phoneId: 2,
    rating: 4.7,
    title: "Best Android phone of 2024",
    content:
      "The S23 Ultra exceeds expectations in almost every category. The display is stunning and the S Pen functionality is more useful than I anticipated. The camera system is versatile and produces excellent photos in various lighting conditions. Battery life is impressive, easily lasting a full day of heavy use.",
    pros: ["Versatile camera system", "S Pen functionality", "Excellent display", "Long battery life"],
    cons: ["Expensive", "Large and heavy", "Learning curve for all features"],
    createdAt: formatDistanceToNow(parseISO("2023-03-10T11:15:00Z"), { addSuffix: true }),
    helpfulCount: 38,
  },
  {
    id: 3,
    userId: 2,
    phoneId: 3,
    rating: 4.5,
    title: "AI features make this phone stand out",
    content:
      "The Pixel 8 Pro's AI capabilities are truly game-changing. From photo editing to real-time translation, the AI features make this phone stand out from the competition. The camera quality is exceptional, especially in low light. The clean Android experience is refreshing, and the guaranteed software updates provide peace of mind.",
    pros: ["Exceptional camera", "Useful AI features", "Clean Android experience", "Guaranteed updates"],
    cons: ["Battery life could be better", "Occasional software bugs"],
    createdAt: formatDistanceToNow(parseISO("2023-11-05T16:45:00Z"), { addSuffix: true }),
    helpfulCount: 29,
  },
]

export const discussions: Discussion[] = [
  {
    id: 1,
    userId: 2,
    title: "iPhone 15 Pro vs Samsung S23 Ultra - Camera Comparison",
    content:
      "I've been testing both phones for the past week and wanted to share my thoughts on the camera performance. The iPhone 15 Pro excels in color accuracy and video recording, while the S23 Ultra offers more versatility with its zoom capabilities. What has been your experience with these cameras?",
    tags: ["iPhone", "Samsung", "Camera", "Comparison"],
    createdAt: formatDistanceToNow(parseISO("2024-03-01T12:00:00Z"), { addSuffix: true }),
    viewCount: 356,
    replyCount: 24,
  },
  {
    id: 2,
    userId: 3,
    title: "Best budget phones under $400 in 2024",
    content:
      "Looking for recommendations on budget-friendly phones that don't compromise on essential features. I've been considering the Google Pixel 7a and the Samsung Galaxy A54. Any other suggestions or experiences with these models?",
    tags: ["Budget", "Recommendations", "Pixel", "Samsung"],
    createdAt: formatDistanceToNow(parseISO("2024-02-28T15:30:00Z"), { addSuffix: true }),
    viewCount: 789,
    replyCount: 42,
  },
  {
    id: 3,
    userId: 2,
    title: "Battery life comparison: Pixel 8 Pro vs OnePlus 12",
    content:
      "After using both phones extensively, I've noticed significant differences in battery performance. The OnePlus 12 consistently lasts longer, but the Pixel 8 Pro's adaptive battery features seem to improve over time. What has been your experience with these devices?",
    tags: ["Battery", "Pixel", "OnePlus", "Comparison"],
    createdAt: formatDistanceToNow(parseISO("2024-02-26T09:45:00Z"), { addSuffix: true }),
    viewCount: 412,
    replyCount: 18,
  },
]

export const replies: Reply[] = [
  {
    id: 1,
    discussionId: 1,
    userId: 3,
    content:
      "I've been using the S23 Ultra for about 3 months now, and I'm consistently impressed with the zoom capabilities. The 10x optical zoom is surprisingly useful, and even the digital zoom produces usable photos. However, I do agree that the iPhone has better video recording and more natural colors.",
    createdAt: "2024-03-01",
    helpfulCount: 15,
  },
  {
    id: 2,
    discussionId: 1,
    userId: 2,
    content:
      "Thanks for sharing your experience! Have you tried the portrait mode on both phones? I find the iPhone's edge detection to be more accurate, but the S23 Ultra offers more versatility with the portrait effects.",
    createdAt: "2024-03-01",
    helpfulCount: 8,
  },
]

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

// Functions to add new items
export const addOrder = (order: Order) => {
  userOrders.push(order)
}

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
    users,
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

