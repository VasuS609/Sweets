import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  await prisma.option.deleteMany()
  await prisma.question.deleteMany()
  await prisma.sweet.deleteMany()

  // Seed Questions
  const questions = [
    {
      order: 1,
      text: "Your Ideal Diwali Evening",
      options: [
        {
          text: "Bursting crackers with friends",
          emoji: "🎆",
          tags: ["energetic", "social", "bold", "adventurous"],
          order: 1
        },
        {
          text: "Lighting diyas peacefully at home",
          emoji: "🪔",
          tags: ["calm", "traditional", "peaceful", "spiritual"],
          order: 2
        },
        {
          text: "Decorating rangoli creatively",
          emoji: "🎨",
          tags: ["creative", "artistic", "thoughtful", "unique"],
          order: 3
        },
        {
          text: "Hosting a big celebration party",
          emoji: "🎉",
          tags: ["bold", "social", "fun-loving", "energetic"],
          order: 4
        }
      ]
    },
    {
      order: 2,
      text: "Your Diwali Shopping Style",
      options: [
        {
          text: "Buy everything weeks in advance",
          emoji: "🛍️",
          tags: ["organized", "traditional", "family-first", "quality"],
          order: 1
        },
        {
          text: "Last-minute rush on Dhanteras",
          emoji: "🏃",
          tags: ["spontaneous", "adventurous", "bold", "energetic"],
          order: 2
        },
        {
          text: "Handmade/personalized gifts only",
          emoji: "🎁",
          tags: ["creative", "thoughtful", "unique", "artistic"],
          order: 3
        },
        {
          text: "Prefer staying home, online shopping",
          emoji: "🏠",
          tags: ["practical", "introverted", "modern", "calm"],
          order: 4
        }
      ]
    },
    {
      order: 3,
      text: "Which Color Excites You Most?",
      options: [
        {
          text: "Bold Red & Gold",
          emoji: "❤️",
          tags: ["traditional", "bold", "passionate", "classic"],
          order: 1
        },
        {
          text: "Royal Purple & Silver",
          emoji: "💜",
          tags: ["elegant", "refined", "luxurious", "sophisticated"],
          order: 2
        },
        {
          text: "Bright Orange & Yellow",
          emoji: "🧡",
          tags: ["energetic", "cheerful", "fun-loving", "social"],
          order: 3
        },
        {
          text: "Soft Green & White",
          emoji: "💚",
          tags: ["calm", "natural", "peaceful", "simple"],
          order: 4
        }
      ]
    },
    {
      order: 4,
      text: "Your Diwali Morning Ritual",
      options: [
        {
          text: "Temple visit and prayers",
          emoji: "🙏",
          tags: ["spiritual", "traditional", "devoted", "peaceful"],
          order: 1
        },
        {
          text: "Long relaxing bath with music",
          emoji: "🛁",
          tags: ["calm", "indulgent", "self-care", "luxurious"],
          order: 2
        },
        {
          text: "Help family with preparations",
          emoji: "👨‍👩‍👧",
          tags: ["family-oriented", "traditional", "comforting", "warm"],
          order: 3
        },
        {
          text: "Sleep in, celebrate at night",
          emoji: "😴",
          tags: ["relaxed", "modern", "introverted", "practical"],
          order: 4
        }
      ]
    },
    {
      order: 5,
      text: "Pick Your Diwali Vibe",
      options: [
        {
          text: "Grand & Glamorous",
          emoji: "🎊",
          tags: ["bold", "luxurious", "social", "premium"],
          order: 1
        },
        {
          text: "Simple & Meaningful",
          emoji: "🕯️",
          tags: ["minimalist", "spiritual", "genuine", "peaceful"],
          order: 2
        },
        {
          text: "Unique & Unconventional",
          emoji: "🎭",
          tags: ["creative", "unique", "adventurous", "artistic"],
          order: 3
        },
        {
          text: "Cozy & Family-focused",
          emoji: "👪",
          tags: ["traditional", "warm", "family-first", "comforting"],
          order: 4
        }
      ]
    },
    {
      order: 6,
      text: "Your Sweet Tooth Preference",
      options: [
        {
          text: "Super sweet, can't get enough",
          emoji: "🍯",
          tags: ["indulgent", "bold", "fun-loving", "energetic"],
          order: 1
        },
        {
          text: "Balanced, not too sweet",
          emoji: "⚖️",
          tags: ["moderate", "health-conscious", "quality", "sophisticated"],
          order: 2
        },
        {
          text: "Prefer savory over sweet",
          emoji: "🌶️",
          tags: ["unique", "bold", "adventurous", "different"],
          order: 3
        },
        {
          text: "Rich and creamy desserts",
          emoji: "🍰",
          tags: ["luxurious", "indulgent", "romantic", "premium"],
          order: 4
        }
      ]
    },
    {
      order: 7,
      text: "How Do You Handle Diwali Stress?",
      options: [
        {
          text: "Make detailed plans and lists",
          emoji: "📝",
          tags: ["organized", "quality", "family-first", "traditional"],
          order: 1
        },
        {
          text: "Go with the flow, it'll work out",
          emoji: "🧘",
          tags: ["calm", "flexible", "peaceful", "simple"],
          order: 2
        },
        {
          text: "Turn it into fun with friends",
          emoji: "🎉",
          tags: ["social", "cheerful", "fun-loving", "energetic"],
          order: 3
        },
        {
          text: "Procrastinate then power through",
          emoji: "😅",
          tags: ["spontaneous", "energetic", "adventurous", "bold"],
          order: 4
        }
      ]
    },
    {
      order: 8,
      text: "Your Diwali Outfit Choice",
      options: [
        {
          text: "Traditional ethnic wear",
          emoji: "👗",
          tags: ["classic", "traditional", "elegant", "family-oriented"],
          order: 1
        },
        {
          text: "Designer fusion with bling",
          emoji: "✨",
          tags: ["modern", "luxurious", "premium", "sophisticated"],
          order: 2
        },
        {
          text: "Bright, colorful, experimental",
          emoji: "🌈",
          tags: ["bold", "creative", "unique", "adventurous"],
          order: 3
        },
        {
          text: "Comfortable and simple",
          emoji: "👔",
          tags: ["practical", "simple", "genuine", "calm"],
          order: 4
        }
      ]
    },
    {
      order: 9,
      text: "Favorite Diwali Memory Type",
      options: [
        {
          text: "Making sweets with family",
          emoji: "👨‍👩‍👧‍👦",
          tags: ["family-oriented", "traditional", "nostalgic", "comforting"],
          order: 1
        },
        {
          text: "Epic fireworks display",
          emoji: "🎆",
          tags: ["adventurous", "bold", "energetic", "fun-loving"],
          order: 2
        },
        {
          text: "Perfect gift surprises",
          emoji: "🎁",
          tags: ["thoughtful", "creative", "warm", "romantic"],
          order: 3
        },
        {
          text: "Winning at Diwali card games",
          emoji: "🏆",
          tags: ["competitive", "social", "bold", "fun-loving"],
          order: 4
        }
      ]
    },
    {
      order: 10,
      text: "After Diwali, You Feel...",
      options: [
        {
          text: "Energized and ready for more",
          emoji: "🔋",
          tags: ["energetic", "social", "bold", "fun-loving"],
          order: 1
        },
        {
          text: "Peacefully content and grateful",
          emoji: "😌",
          tags: ["calm", "spiritual", "peaceful", "traditional"],
          order: 2
        },
        {
          text: "Inspired to create something",
          emoji: "🎨",
          tags: ["creative", "artistic", "thoughtful", "unique"],
          order: 3
        },
        {
          text: "Need a week to recover",
          emoji: "🛋️",
          tags: ["introverted", "practical", "calm", "simple"],
          order: 4
        }
      ]
    }
  ]

  // Create questions with options
  for (const q of questions) {
    await prisma.question.create({
      data: {
        text: q.text,
        order: q.order,
        options: {
          create: q.options
        }
      }
    })
  }

  console.log('✅ Questions seeded!')

  // Seed Sweets (from previous data)
  const sweets = [
    {
      name: "Gulab Jamun",
      emoji: "🟤",
      description: "The beloved classic - soft, syrupy, and comforting. You're the heart of every celebration.",
      tagline: "Classic, beloved, and slightly soaked in drama. Everyone wants you at their celebration.",
      funFact: "Like this sweet, you get better with time... and a little bit of sugar syrup never hurt anyone.",
      imageUrl: "/sweets/gulab-jamun.jpg",
      tags: ["traditional", "family-oriented", "warm", "classic"],
      calories: 150,
      protein: 3,
      carbs: 25,
      fat: 5,
      fiber: 0.5,
      sugar: 20
    },
    // ... (add all 15 sweets from previous message)
  ]

  for (const sweet of sweets) {
    await prisma.sweet.create({ data: sweet })
  }

  console.log('✅ Sweets seeded!')
  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })