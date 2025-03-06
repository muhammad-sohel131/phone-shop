import { Discussion, Review, Order, Phone, User } from "./db"

const STORAGE_KEYS = {
  DISCUSSIONS: "phonefinder_discussions",
  REVIEWS: "phonefinder_reviews",
  REPLIES: "phonefinder_replies",
  ORDERS: "phonefinder_orders",
  PHONES: "phonefinder_phones",
  USERS: "phonefinder_users",
} as const

// Initialize storage with default data
export const initializeStorage = () => {
  if (typeof window === "undefined") return

  Object.values(STORAGE_KEYS).forEach((key) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]))
    }
  })
}

// Generic get function
const getItems = <T>(key: string): T[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

// Generic set function
const setItems = <T>(key: string, items: T[]) => {
  localStorage.setItem(key, JSON.stringify(items))
}

// Discussion functions
export const getDiscussions = (): Discussion[] => getItems(STORAGE_KEYS.DISCUSSIONS)
export const addDiscussion = (discussion: UserDiscussion) => {
  const discussions = getDiscussions()
  discussions.unshift(discussion)
  setItems(STORAGE_KEYS.DISCUSSIONS, discussions)
}
export const updateDiscussion = (id: number, updates: Partial<Discussion>) => {
  const discussions = getDiscussions()
  const index = discussions.findIndex((d) => d.id === id)
  if (index !== -1) {
    discussions[index] = { ...discussions[index], ...updates }
    setItems(STORAGE_KEYS.DISCUSSIONS, discussions)
  }
}
export const deleteDiscussion = (id: number) => {
  const discussions = getDiscussions()
  const filtered = discussions.filter((d) => d.id !== id)
  setItems(STORAGE_KEYS.DISCUSSIONS, filtered)
}

// Review functions
export const getReviews = (): Review[] => getItems(STORAGE_KEYS.REVIEWS)
export const addReview = (review: UserReview) => {
  const reviews = getReviews()
  reviews.unshift(review)
  setItems(STORAGE_KEYS.REVIEWS, reviews)
}
export const updateReview = (id: number, updates: Partial<Review>) => {
  const reviews = getReviews()
  const index = reviews.findIndex((r) => r.id === id)
  if (index !== -1) {
    reviews[index] = { ...reviews[index], ...updates }
    setItems(STORAGE_KEYS.REVIEWS, reviews)
  }
}
export const deleteReview = (id: number) => {
  const reviews = getReviews()
  const filtered = reviews.filter((r) => r.id !== id)
  setItems(STORAGE_KEYS.REVIEWS, filtered)
}

// Reply functions
export const getReplies = (): Reply[] => getItems(STORAGE_KEYS.REPLIES)
export const addReply = (reply: UserComment) => {
  const replies = getReplies()
  replies.push(reply)
  setItems(STORAGE_KEYS.REPLIES, replies)
}

// Order functions
export const getOrders = (): Order[] => getItems(STORAGE_KEYS.ORDERS)
export const addOrder = (order: Order) => {
  const orders = getOrders()
  orders.unshift(order)
  setItems(STORAGE_KEYS.ORDERS, orders)
}
export const updateOrder = (id: string, updates: Partial<Order>) => {
  const orders = getOrders()
  const index = orders.findIndex((o) => o.id === id)
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates }
    setItems(STORAGE_KEYS.ORDERS, orders)
  }
}
export const deleteOrder = (id: string) => {
  const orders = getOrders()
  const filtered = orders.filter((o) => o.id !== id)
  setItems(STORAGE_KEYS.ORDERS, filtered)
}

// Phone functions
export const getPhones = (): Phone[] => getItems(STORAGE_KEYS.PHONES)
export const addPhone = (phone: Phone) => {
  const phones = getPhones()
  phones.push(phone)
  setItems(STORAGE_KEYS.PHONES, phones)
}
export const updatePhone = (id: number, updates: Partial<Phone>) => {
  const phones = getPhones()
  const index = phones.findIndex((p) => p.id === id)
  if (index !== -1) {
    phones[index] = { ...phones[index], ...updates }
    setItems(STORAGE_KEYS.PHONES, phones)
  }
}
export const deletePhone = (id: number) => {
  const phones = getPhones()
  const filtered = phones.filter((p) => p.id !== id)
  setItems(STORAGE_KEYS.PHONES, filtered)
}

// User functions
export const getUsers = (): User[] => getItems(STORAGE_KEYS.USERS)
export const addUser = (user: User) => {
  const users = getUsers()
  users.push(user)
  setItems(STORAGE_KEYS.USERS, users)
}
export const updateUser = (id: number, updates: Partial<User>) => {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === id)
  if (index !== -1) {
    users[index] = { ...users[index], ...updates }
    setItems(STORAGE_KEYS.USERS, users)
  }
}
export const deleteUser = (id: number) => {
  const users = getUsers()
  const filtered = users.filter((u) => u.id !== id)
  setItems(STORAGE_KEYS.USERS, filtered)
}

