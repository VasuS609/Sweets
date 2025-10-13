import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Starting seed...');

  // Clear existing data
  await prisma.quizResult.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.sweet.deleteMany();

  // Create Questions with Options
  const questions = [
    {
      text: "How do you celebrate Diwali?",
      order: 1,
      options: [
        { text: "Big family gathering with lots of noise!", emoji: "🎉", tags: ["social", "energetic", "traditional"], order: 1 },
        { text: "Quiet evening with close ones", emoji: "🕯️", tags: ["calm", "intimate", "peaceful"], order: 2 },
        { text: "Party with friends and music", emoji: "🎊", tags: ["modern", "social", "bold"], order: 3 },
        { text: "Spiritual prayers and meditation", emoji: "🙏", tags: ["traditional", "spiritual", "calm"], order: 4 }
      ]
    },
    {
      text: "Your ideal Diwali outfit is?",
      order: 2,
      options: [
        { text: "Traditional silk saree/kurta", emoji: "👘", tags: ["traditional", "elegant", "classic"], order: 1 },
        { text: "Indo-western fusion", emoji: "✨", tags: ["modern", "creative", "bold"], order: 2 },
        { text: "Comfortable ethnic wear", emoji: "👔", tags: ["practical", "calm", "simple"], order: 3 },
        { text: "Bold & bling designer wear", emoji: "💎", tags: ["bold", "energetic", "luxurious"], order: 4 }
      ]
    },
    {
      text: "What's your Diwali decoration style?",
      order: 3,
      options: [
        { text: "Traditional diyas and rangoli", emoji: "🪔", tags: ["traditional", "artistic", "spiritual"], order: 1 },
        { text: "LED lights and modern décor", emoji: "💡", tags: ["modern", "practical", "bold"], order: 2 },
        { text: "Minimalist and elegant", emoji: "🌟", tags: ["simple", "calm", "elegant"], order: 3 },
        { text: "Over-the-top everything!", emoji: "🎆", tags: ["energetic", "social", "bold"], order: 4 }
      ]
    },
    {
      text: "Your favorite Diwali activity?",
      order: 4,
      options: [
        { text: "Making sweets at home", emoji: "🍪", tags: ["traditional", "creative", "homely"], order: 1 },
        { text: "Bursting crackers", emoji: "🎇", tags: ["energetic", "bold", "adventurous"], order: 2 },
        { text: "Playing card games", emoji: "🃏", tags: ["social", "fun", "strategic"], order: 3 },
        { text: "Lakshmi Puja", emoji: "🪷", tags: ["spiritual", "traditional", "calm"], order: 4 }
      ]
    },
    {
      text: "How do you handle Diwali chaos?",
      order: 5,
      options: [
        { text: "I thrive in chaos!", emoji: "⚡", tags: ["energetic", "social", "bold"], order: 1 },
        { text: "I plan everything in advance", emoji: "📋", tags: ["practical", "calm", "organized"], order: 2 },
        { text: "Go with the flow", emoji: "🌊", tags: ["flexible", "calm", "easy"], order: 3 },
        { text: "I prefer peaceful celebrations", emoji: "☮️", tags: ["calm", "spiritual", "peaceful"], order: 4 }
      ]
    },
    {
      text: "Your Diwali morning routine?",
      order: 6,
      options: [
        { text: "Early oil bath and prayers", emoji: "🛁", tags: ["traditional", "spiritual", "disciplined"], order: 1 },
        { text: "Sleep in, it's a holiday!", emoji: "😴", tags: ["relaxed", "modern", "calm"], order: 2 },
        { text: "Start cooking early", emoji: "👨‍🍳", tags: ["homely", "practical", "traditional"], order: 3 },
        { text: "Shopping for last-minute things", emoji: "🛍️", tags: ["energetic", "spontaneous", "social"], order: 4 }
      ]
    },
    {
      text: "What's your Diwali sweet preference?",
      order: 7,
      options: [
        { text: "Classic traditional ones", emoji: "🍯", tags: ["traditional", "simple", "classic"], order: 1 },
        { text: "Rich and indulgent", emoji: "👑", tags: ["luxurious", "bold", "intense"], order: 2 },
        { text: "Light and mild", emoji: "🌸", tags: ["calm", "delicate", "subtle"], order: 3 },
        { text: "Unique fusion flavors", emoji: "🌈", tags: ["modern", "adventurous", "creative"], order: 4 }
      ]
    },
    {
      text: "How many Diwali parties do you attend?",
      order: 8,
      options: [
        { text: "All of them! More the merrier", emoji: "🎭", tags: ["social", "energetic", "outgoing"], order: 1 },
        { text: "2-3 close ones only", emoji: "🏠", tags: ["selective", "calm", "intimate"], order: 2 },
        { text: "Just family, no parties", emoji: "👨‍👩‍👧‍👦", tags: ["traditional", "homely", "peaceful"], order: 3 },
        { text: "I host my own!", emoji: "🎪", tags: ["bold", "social", "creative"], order: 4 }
      ]
    },
    {
      text: "Your Diwali gift giving style?",
      order: 9,
      options: [
        { text: "Traditional sweets & dry fruits", emoji: "🎁", tags: ["traditional", "classic", "thoughtful"], order: 1 },
        { text: "Personalized thoughtful gifts", emoji: "💝", tags: ["creative", "intimate", "caring"], order: 2 },
        { text: "Practical useful items", emoji: "🛠️", tags: ["practical", "simple", "sensible"], order: 3 },
        { text: "Expensive premium gifts", emoji: "💰", tags: ["luxurious", "bold", "generous"], order: 4 }
      ]
    },
    {
      text: "What does Diwali mean to you?",
      order: 10,
      options: [
        { text: "Triumph of good over evil", emoji: "⚔️", tags: ["spiritual", "traditional", "meaningful"], order: 1 },
        { text: "Time for family & togetherness", emoji: "❤️", tags: ["homely", "loving", "traditional"], order: 2 },
        { text: "Festival of lights & joy", emoji: "✨", tags: ["energetic", "positive", "celebratory"], order: 3 },
        { text: "New beginnings & prosperity", emoji: "🌅", tags: ["optimistic", "practical", "hopeful"], order: 4 }
      ]
    }
  ];

  for (const q of questions) {
    const { options, ...questionData } = q;
    await prisma.question.create({
      data: {
        ...questionData,
        options: {
          create: options
        }
      }
    });
  }

  // Create Sweets 
 
  const sweets = [
    {
      name: "Gulab Jamun",
      emoji: "🟤",
      description: "Soft, syrupy, and utterly classic",
      tagline: "You are the timeless classic everyone loves",
      funFact: "Originated in medieval India and is the most popular Indian sweet worldwide!",
      imageUrl: "../src/app/sweets/gulabjamun.jpg",
      tags: ["traditional", "sweet", "classic", "homely", "comforting"],
      calories: 175,
      protein: 3.5,
      carbs: 28.0,
      fat: 7.0,
      fiber: 0.5,
      sugar: 22.0
    },
    {
      name: "Jalebi",
      emoji: "🧡",
      description: "Crispy, tangled, and full of surprises",
      tagline: "You are bold, spontaneous, and irresistibly fun",
      funFact: "Each jalebi is hand-piped in a spiral - no two are exactly alike!",
      imageUrl: "../src/app/sweets/jalebi.jpg",
      tags: ["energetic", "bold", "adventurous", "vibrant", "unique"],
      calories: 150,
      protein: 2.0,
      carbs: 35.0,
      fat: 3.0,
      fiber: 0.3,
      sugar: 28.0
    },
    {
      name: "Kaju Katli",
      emoji: "💎",
      description: "Elegant, refined, and sophisticated",
      tagline: "You are the epitome of grace and elegance",
      funFact: "Often covered with edible silver foil (varak) - literally eating precious metal!",
      imageUrl: "../src/app/sweets/kaju-katli.jpg",
      tags: ["elegant", "luxurious", "calm", "refined", "premium"],
      calories: 140,
      protein: 4.0,
      carbs: 18.0,
      fat: 7.5,
      fiber: 1.0,
      sugar: 15.0
    },
    {
      name: "Ladoo",
      emoji: "🟡",
      description: "Round, complete, and full of energy",
      tagline: "You are the life of every celebration",
      funFact: "Ladoos are considered the most auspicious sweet for any celebration!",
      imageUrl: "../src/app/sweets/ladoo.jpg",
      tags: ["energetic", "traditional", "social", "joyful", "wholesome"],
      calories: 160,
      protein: 5.0,
      carbs: 22.0,
      fat: 6.5,
      fiber: 2.0,
      sugar: 16.0
    },
    {
      name: "Rasgulla",
      emoji: "⚪",
      description: "Soft, light, and refreshingly sweet",
      tagline: "You are gentle, calming, and effortlessly lovable",
      funFact: "Bengal and Odisha still fight over who invented it - the great Rasgulla war!",
      imageUrl: "../src/app/sweets/rasgulla.jpg",
      tags: ["calm", "peaceful", "delicate", "subtle", "refreshing"],
      calories: 135,
      protein: 5.5,
      carbs: 25.0,
      fat: 1.5,
      fiber: 0.2,
      sugar: 20.0
    },
    {
      name: "Barfi",
      emoji: "🟫",
      description: "Simple, sweet, and reliable",
      tagline: "You are dependable and everyone's comfort person",
      funFact: "The name 'Barfi' comes from Persian word 'barf' meaning snow!",
      imageUrl: "../src/app/sweets/barfi.jpg",
      tags: ["simple", "traditional", "comforting", "reliable", "homely"],
      calories: 155,
      protein: 4.5,
      carbs: 20.0,
      fat: 7.0,
      fiber: 0.8,
      sugar: 17.0
    },
    {
      name: "Mysore Pak",
      emoji: "🟨",
      description: "Rich, crumbly, and intensely satisfying",
      tagline: "You are bold, intense, and unforgettable",
      funFact: "Made with equal parts ghee, sugar, and gram flour - pure indulgence!",
      imageUrl: "../src/app/sweets/mysore-pak.jpg",
      tags: ["bold", "intense", "luxurious", "rich", "indulgent"],
      calories: 195,
      protein: 3.0,
      carbs: 24.0,
      fat: 11.0,
      fiber: 1.5,
      sugar: 19.0
    },
    {
      name: "Sandesh",
      emoji: "🤍",
      description: "Delicate, artistic, and subtly sweet",
      tagline: "You are creative, thoughtful, and refined",
      funFact: "Bengali sweet that's molded into beautiful shapes - art you can eat!",
      imageUrl: "../src/app/sweets/sandesh.jpg",
      tags: ["creative", "artistic", "delicate", "elegant", "sophisticated"],
      calories: 125,
      protein: 6.0,
      carbs: 18.0,
      fat: 4.0,
      fiber: 0.5,
      sugar: 14.0
    },
    {
      name: "Soan Papdi",
      emoji: "🟧",
      description: "Flaky, crispy, and delightfully messy",
      tagline: "You are fun, unique, and full of layers",
      funFact: "Has over 1000 layers! That's why it's so flaky and dissolves in your mouth!",
      imageUrl: "../src/app/sweets/soan-papdi.jpg",
      tags: ["unique", "fun", "complex", "light", "layered"],
      calories: 145,
      protein: 3.5,
      carbs: 26.0,
      fat: 5.0,
      fiber: 0.4,
      sugar: 21.0
    },
    {
      name: "Peda",
      emoji: "🟤",
      description: "Dense, sweet, and deeply traditional",
      tagline: "You are grounded, strong, and full of warmth",
      funFact: "Each region has its own Peda variety - Mathura's are most famous!",
      imageUrl: "../src/app/sweets/peda.jpg",
      tags: ["traditional", "strong", "spiritual", "grounded", "authentic"],
      calories: 165,
      protein: 4.0,
      carbs: 23.0,
      fat: 7.5,
      fiber: 0.3,
      sugar: 19.0
    },
    {
      name: "Kheer",
      emoji: "🍚",
      description: "Creamy, comforting, and nostalgic",
      tagline: "You are warm, nurturing, and feel like home",
      funFact: "One of the oldest desserts in the world - mentioned in ancient texts!",
      imageUrl: "../src/app/sweets/kheer.jpg",
      tags: ["comforting", "homely", "traditional", "nurturing", "soothing"],
      calories: 120,
      protein: 4.5,
      carbs: 20.0,
      fat: 3.5,
      fiber: 0.2,
      sugar: 15.0
    },
    {
      name: "Coconut Ladoo",
      emoji: "🥥",
      description: "Fresh, tropical, and delightfully different",
      tagline: "You are refreshing and bring joy wherever you go",
      funFact: "Quick to make and naturally gluten-free - the modern favorite!",
      imageUrl: "../src/app/sweets/coconut-ladoo.jpg",
      tags: ["modern", "refreshing", "simple", "light", "cheerful"],
      calories: 130,
      protein: 2.5,
      carbs: 19.0,
      fat: 6.0,
      fiber: 2.5,
      sugar: 16.0
    },
    {
      name: "Kalakand",
      emoji: "🤎",
      description: "Crumbly, milky, and authentically sweet",
      tagline: "You are genuine, warm, and absolutely original",
      funFact: "The 'milk cake' of India - pure condensed milk heaven!",
      imageUrl: "../src/app/sweets/kalakand.jpg",
      tags: ["authentic", "warm", "genuine", "traditional", "pure"],
      calories: 170,
      protein: 6.0,
      carbs: 22.0,
      fat: 7.0,
      fiber: 0.1,
      sugar: 18.0
    },
    {
      name: "Mohanthal",
      emoji: "💛",
      description: "Nutty, aromatic, and full of flavor",
      tagline: "You are complex, flavorful, and one-of-a-kind",
      funFact: "Takes hours to make with constant stirring - pure labor of love!",
      imageUrl: "../src/app/sweets/mohanthal.jpg",
      tags: ["complex", "aromatic", "luxurious", "patient", "special"],
      calories: 180,
      protein: 5.5,
      carbs: 21.0,
      fat: 9.0,
      fiber: 1.8,
      sugar: 17.0
    },
    {
      name: "Gujiya",
      emoji: "🥟",
      description: "Crispy outside, sweet inside - full of surprises",
      tagline: "You have depth and always surprise people",
      funFact: "The official sweet of Holi, but perfect for Diwali too!",
      imageUrl: "../src/app/sweets/gujiya.jpg",
      tags: ["surprising", "layered", "traditional", "festive", "special"],
      calories: 185,
      protein: 3.0,
      carbs: 27.0,
      fat: 8.5,
      fiber: 1.2,
      sugar: 19.0
    }
  ];

  for (const sweet of sweets) {
    await prisma.sweet.create({ data: sweet });
  }

  console.log('✅ Seed completed!');
  console.log('📊 Created:');
  console.log(`   - ${questions.length} questions`);
  console.log(`   - ${questions.reduce((acc, q) => acc + q.options.length, 0)} options`);
  console.log(`   - ${sweets.length} sweets`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });