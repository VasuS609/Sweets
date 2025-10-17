import { PrismaClient } from'../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Create sample questions
  const question1 = await prisma.question.create({
    data: {
      text: "What's your ideal Diwali celebration style?",
      order: 1,
      options: {
        create: [
          {
            text: "Grand family gathering with lots of people",
            emoji: "👨‍👩‍👧‍👦",
            tags: ["social", "family", "traditional"],
            order: 1
          },
          {
            text: "Intimate celebration with close friends",
            emoji: "🕯️",
            tags: ["intimate", "calm", "modern"],
            order: 2
          },
          {
            text: "Quiet evening with just myself",
            emoji: "🧘‍♀️",
            tags: ["peaceful", "introspective", "minimal"],
            order: 3
          }
        ]
      }
    }
  });

  const question2 = await prisma.question.create({
    data: {
      text: "Which activity energizes you most?",
      order: 2,
      options: {
        create: [
          {
            text: "Dancing to festive music",
            emoji: "💃",
            tags: ["energetic", "social", "fun"],
            order: 1
          },
          {
            text: "Cooking traditional dishes",
            emoji: "👨‍🍳",
            tags: ["creative", "traditional", "nurturing"],
            order: 2
          },
          {
            text: "Meditating or reading",
            emoji: "📚",
            tags: ["calm", "intellectual", "peaceful"],
            order: 3
          }
        ]
      }
    }
  });

  // Create sample sweets
  const gulabJamun = await prisma.sweet.create({
    data: {
      name: "Gulab Jamun",
      emoji: "🍯",
      description: "Soft, spongy milk dumplings soaked in rose-flavored syrup",
      tagline: "Sweet, traditional, and absolutely irresistible!",
      funFact: "Gulab Jamun was originally made with khoya (milk solids) but now often uses milk powder for convenience.",
      imageUrl: "/gulab-jamun.jpg",
      tags: ["traditional", "sweet", "popular", "festive"],
      calories: 150,
      protein: 4.2,
      carbs: 22.5,
      fat: 5.8,
      fiber: 0.3,
      sugar: 18.2
    }
  });

  const rasgulla = await prisma.sweet.create({
    data: {
      name: "Rasgulla",
      emoji: "🥛",
      description: "Spongy cottage cheese balls in light sugar syrup",
      tagline: "Light, refreshing, and perfect for any celebration!",
      funFact: "Rasgulla originated in Odisha and is the state's official sweet!",
      imageUrl: "/rasgulla.jpg",
      tags: ["light", "refreshing", "healthy", "traditional"],
      calories: 120,
      protein: 6.8,
      carbs: 18.5,
      fat: 2.1,
      fiber: 0.2,
      sugar: 15.3
    }
  });

  const KajuKatli = await prisma.sweet.create({
    data: {
      name: "Kaju Katli",
      emoji: "💎",
      description: "Diamond-shaped cashew fudge with silver leaf",
      tagline: "Elegant, rich, and perfect for special occasions!",
      funFact: "The silver leaf (varak) is edible and adds a luxurious touch!",
      imageUrl: "/kaju-katli.jpg",
      tags: ["elegant", "rich", "luxurious", "premium"],
      calories: 180,
      protein: 5.2,
      carbs: 15.8,
      fat: 12.5,
      fiber: 1.2,
      sugar: 12.1
    }
  });

  console.log('Sample data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
