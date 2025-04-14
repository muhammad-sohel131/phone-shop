import { parseISO, formatDistanceToNow } from "date-fns"

// Remove fs and path imports
// import fs from "fs"
// import path from "path"

// Remove DB_PATH constant
// const DB_PATH = path.join(process.cwd(), "data.json")

// Mock database for the Phone Finder app

export type Phone = {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  image: string
  images: string[]
  isNew: boolean
  isFeatured: boolean
  specs: {
    display: string
    resolution: string
    processor: string
    ram: string[]
    storage: string[]
    battery: string
    os: string
    weight: string
    dimensions: string
    camera: {
      main: string
      ultraWide: string
      telephoto: string
      front: string
      features: string[]
    }
    features: {
      fiveG: boolean
      wirelessCharging: boolean
      waterResistance: string
      expandableStorage: boolean
      headphoneJack: boolean
      stylus: boolean
      faceUnlock: boolean
      fingerprint: boolean
    }
    colors: string[]
  }
  description: string
  releaseDate: string
}

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
  phoneId: number
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

// Mock data
export const phones: Phone[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999,
    originalPrice: 1099,
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    isNew: true,
    isFeatured: true,
    specs: {
      display: '6.1" Super Retina XDR OLED',
      resolution: "2556 x 1179 pixels",
      processor: "A17 Pro",
      ram: ["8GB"],
      storage: ["128GB", "256GB", "512GB", "1TB"],
      battery: "3,274 mAh",
      os: "iOS 17",
      weight: "187g",
      dimensions: "146.7 x 71.5 x 8.3 mm",
      camera: {
        main: "48MP, f/1.8, OIS",
        ultraWide: "12MP, f/2.2, 120° FOV",
        telephoto: "12MP, f/2.8, 3x optical zoom",
        front: "12MP, f/1.9",
        features: ["Night mode", "Deep Fusion", "Smart HDR 4", "Portrait mode", "4K Dolby Vision HDR recording"],
      },
      features: {
        fiveG: true,
        wirelessCharging: true,
        waterResistance: "IP68",
        expandableStorage: false,
        headphoneJack: false,
        stylus: false,
        faceUnlock: true,
        fingerprint: false,
      },
      colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    },
    description:
      "The iPhone 15 Pro features a strong and lightweight titanium design with the A17 Pro chip, the most powerful smartphone chip yet. It has a 48MP Main camera with a 3x Telephoto camera, and a customizable Action button. The phone supports USB-C and has all-day battery life.",
    releaseDate: "2023-09-22",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    price: 1199,
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    isNew: true,
    isFeatured: true,
    specs: {
      display: '6.8" Dynamic AMOLED 2X',
      resolution: "3088 x 1440 pixels",
      processor: "Snapdragon 8 Gen 2",
      ram: ["8GB", "12GB"],
      storage: ["256GB", "512GB", "1TB"],
      battery: "5,000 mAh",
      os: "Android 14 (One UI 6)",
      weight: "234g",
      dimensions: "163.4 x 78.1 x 8.9 mm",
      camera: {
        main: "200MP, f/1.7, OIS",
        ultraWide: "12MP, f/2.2, 120° FOV",
        telephoto: "10MP, f/2.4, 3x optical zoom + 10MP, f/4.9, 10x optical zoom",
        front: "12MP, f/2.2",
        features: ["Nightography", "Portrait mode", "8K video recording", "Director's View", "Super Steady"],
      },
      features: {
        fiveG: true,
        wirelessCharging: true,
        waterResistance: "IP68",
        expandableStorage: false,
        headphoneJack: false,
        stylus: true,
        faceUnlock: true,
        fingerprint: true,
      },
      colors: ["Phantom Black", "Green", "Cream", "Lavender"],
    },
    description:
      "The Samsung Galaxy S23 Ultra features a 200MP camera for stunning photos and videos, and the embedded S Pen for easy navigation and precision. It has a powerful Snapdragon 8 Gen 2 processor and a long-lasting 5,000 mAh battery. The phone is built with Armor Aluminum and Corning Gorilla Glass Victus 2.",
    releaseDate: "2023-02-17",
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 899,
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    isNew: true,
    isFeatured: true,
    specs: {
      display: '6.7" Super Actua OLED',
      resolution: "2992 x 1344 pixels",
      processor: "Google Tensor G3",
      ram: ["12GB"],
      storage: ["128GB", "256GB", "512GB"],
      battery: "5,050 mAh",
      os: "Android 14",
      weight: "213g",
      dimensions: "162.6 x 76.5 x 8.8 mm",
      camera: {
        main: "50MP, f/1.7, OIS",
        ultraWide: "48MP, f/1.95, 125.5° FOV",
        telephoto: "48MP, f/2.8, 5x optical zoom",
        front: "10.5MP, f/2.2",
        features: ["Night Sight", "Real Tone", "Magic Editor", "Photo Unblur", "4K60 video"],
      },
      features: {
        fiveG: true,
        wirelessCharging: true,
        waterResistance: "IP68",
        expandableStorage: false,
        headphoneJack: false,
        stylus: false,
        faceUnlock: true,
        fingerprint: true,
      },
      colors: ["Obsidian", "Porcelain", "Bay"],
    },
    description:
      "The Google Pixel 8 Pro features Google's most advanced Pixel camera, with AI-powered editing tools like Magic Editor and Best Take. It has a 6.7-inch Super Actua display that's bright enough to see in direct sunlight. The phone is powered by the Google Tensor G3 chip and has a battery that can last beyond 24 hours with Extreme Battery Saver.",
    releaseDate: "2023-10-12",
  },
  {
    id: 4,
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 799,
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    isNew: false,
    isFeatured: true,
    specs: {
      display: '6.82" LTPO AMOLED',
      resolution: "3168 x 1440 pixels",
      processor: "Snapdragon 8 Gen 3",
      ram: ["12GB", "16GB"],
      storage: ["256GB", "512GB"],
      battery: "5,400 mAh",
      os: "OxygenOS 14 (Android 14)",
      weight: "220g",
      dimensions: "164.3 x 75.8 x 9.2 mm",
      camera: {
        main: "50MP, f/1.6, OIS",
        ultraWide: "48MP, f/2.2, 114° FOV",
        telephoto: "64MP, f/2.6, 3x optical zoom",
        front: "32MP, f/2.4",
        features: ["Hasselblad Camera", "Natural Color Calibration", "Pro Mode", "4K HDR recording"],
      },
      features: {
        fiveG: true,
        wirelessCharging: true,
        waterResistance: "IP65",
        expandableStorage: false,
        headphoneJack: false,
        stylus: false,
        faceUnlock: true,
        fingerprint: true,
      },
      colors: ["Silky Black", "Flowy Emerald"],
    },
    description:
      "The OnePlus 12 features a Snapdragon 8 Gen 3 processor and a 5,400 mAh battery with 100W SUPERVOOC fast charging. It has a 50MP main camera with a Hasselblad Camera System for natural colors. The phone has a 6.82-inch 2K 120Hz ProXDR display that's bright and smooth.",
    releaseDate: "2024-01-23",
  },
  {
    id: 5,
    name: "Xiaomi 14",
    brand: "Xiaomi",
    price: 699,
    rating: 4.4,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    isNew: false,
    isFeatured: false,
    specs: {
      display: '6.36" AMOLED',
      resolution: "2670 x 1200 pixels",
      processor: "Snapdragon 8 Gen 3",
      ram: ["8GB", "12GB", "16GB"],
      storage: ["256GB", "512GB", "1TB"],
      battery: "4,610 mAh",
      os: "HyperOS (Android 14)",
      weight: "193g",
      dimensions: "152.8 x 71.5 x 8.2 mm",
      camera: {
        main: "50MP, f/1.6, OIS",
        ultraWide: "50MP, f/2.2, 115° FOV",
        telephoto: "50MP, f/2.0, 3.2x optical zoom",
        front: "32MP, f/2.0",
        features: ["Leica Optics", "Night Mode", "Portrait Mode", "8K video recording"],
      },
      features: {
        fiveG: true,
        wirelessCharging: true,
        waterResistance: "IP68",
        expandableStorage: false,
        headphoneJack: false,
        stylus: false,
        faceUnlock: true,
        fingerprint: true,
      },
      colors: ["Black", "White", "Jade Green", "Titanium Blue"],
    },
    description:
      "The Xiaomi 14 features a Leica professional optical lens and a Light Fusion 900 image sensor for stunning photos. It has a Snapdragon 8 Gen 3 processor and a 4,610 mAh battery with 90W HyperCharge. The phone has a 6.36-inch AMOLED display with a 120Hz refresh rate.",
    releaseDate: "2024-02-25",
  },
]

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
    phones,
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
  // url: "http://localhost:3000",
  url: "https://phone-shop-rho-one.vercel.app",
}

