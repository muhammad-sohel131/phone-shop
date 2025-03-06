import type { User } from "@/types/user"

let users: User[] = [
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

export function getUsers(): User[] {
  return users
}

export function getUserById(id: number): User | undefined {
  return users.find((user) => user.id === id)
}

export function createUser(user: Omit<User, "id">): User {
  const newUser = { ...user, id: users.length + 1 }
  users.push(newUser)
  return newUser
}

export function updateUser(id: number, updates: Partial<User>): User | undefined {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    users[index] = { ...users[index], ...updates }
    return users[index]
  }
  return undefined
}

export function deleteUser(id: number): boolean {
  const initialLength = users.length
  users = users.filter((user) => user.id !== id)
  return users.length < initialLength
}

