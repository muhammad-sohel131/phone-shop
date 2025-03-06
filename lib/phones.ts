import type { Phone } from "@/types/phone"

let phones: Phone[] = [
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
  // Add more phone entries here...
]

export function getPhones(): Phone[] {
  return phones
}

export function getPhoneById(id: number): Phone | undefined {
  return phones.find((phone) => phone.id === id)
}

export function createPhone(phone: Omit<Phone, "id">): Phone {
  const newPhone = { ...phone, id: phones.length + 1 }
  phones.push(newPhone)
  return newPhone
}

export function updatePhone(id: number, updates: Partial<Phone>): Phone | undefined {
  const index = phones.findIndex((phone) => phone.id === id)
  if (index !== -1) {
    phones[index] = { ...phones[index], ...updates }
    return phones[index]
  }
  return undefined
}

export function deletePhone(id: number): boolean {
  const initialLength = phones.length
  phones = phones.filter((phone) => phone.id !== id)
  return phones.length < initialLength
}

