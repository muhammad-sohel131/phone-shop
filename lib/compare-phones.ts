import type { Phone } from "@/types/phone"

export function comparePhones(phones: Phone[]): string {
  if (phones.length < 2) {
    return "Please select at least two phones to compare."
  }

  let bestPhone = phones[0]
  let bestScore = 0

  for (const phone of phones) {
    let score = 0

    // Price (lower is better)
    score += (2000 - phone.price) / 20 // Max 100 points

    // Rating (higher is better)
    score += phone.rating * 20 // Max 100 points

    // RAM (higher is better)
    const ram = Number.parseInt(phone.specs.ram[0])
    score += ram * 5 // 8GB = 40 points, 12GB = 60 points, etc.

    // Storage (higher is better)
    const storage = Number.parseInt(phone.specs.storage[0])
    score += storage / 8 // 128GB = 16 points, 256GB = 32 points, etc.

    // Camera (main camera MP, higher is better)
    const mainCameraMP = Number.parseInt(phone.specs.camera.main)
    score += mainCameraMP / 2 // 48MP = 24 points, 108MP = 54 points, etc.

    // Battery (higher is better)
    const battery = Number.parseInt(phone.specs.battery)
    score += battery / 100 // 4000mAh = 40 points, 5000mAh = 50 points, etc.

    if (score > bestScore) {
      bestScore = score
      bestPhone = phone
    }
  }

  let summary = `Based on our analysis, the ${bestPhone.name} appears to be the best choice among the compared phones. `

  summary += `It offers a great balance of features, including `
  if (bestPhone.price === Math.min(...phones.map((p) => p.price))) {
    summary += `the most competitive price, `
  }
  if (bestPhone.rating === Math.max(...phones.map((p) => p.rating))) {
    summary += `the highest user rating, `
  }
  summary += `a ${bestPhone.specs.ram[0]} of RAM, ${bestPhone.specs.storage[0]} of storage, `
  summary += `a ${bestPhone.specs.camera.main} main camera, and a ${bestPhone.specs.battery} battery. `

  summary += `However, please consider your specific needs and preferences when making a decision, as the best phone for you may depend on factors not fully captured by this comparison.`

  return summary
}

