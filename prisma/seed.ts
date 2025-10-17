// @ts-nocheck
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Starting seed...');

  // Clear existing data
  await prisma.quizResult.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.sweet.deleteMany();

  // Create Questions with Options - 7 questions with 4 tags per option
  const questions = [
    {
      text: "When the Diwali prep gets chaotic, how do you handle it?",
      order: 1,
      options: [
        { text: "Jump right in — festive chaos is my vibe! ⚡", emoji: "⚡", tags: ["energetic", "bold", "adventurous"], order: 1 },
        { text: "Plan every diya and detail like a pro! 📋", emoji: "📋", tags: ["organized", "practical", "thoughtful"], order: 2 },
        { text: "Go with the flow — it all works out! 🌊", emoji: "🌊", tags: ["flexible", "calm", "easy-going"], order: 3 },
        { text: "Light a diya, breathe, and keep it peaceful. ☮️", emoji: "☮️", tags: ["peaceful", "spiritual", "introverted"], order: 4 }
      ]
    },
    {
      text: "What part of Diwali celebrations brings you the most joy?",
      order: 2,
      options: [
        { text: "Dancing and spreading that festive masti! 🎉", emoji: "🎉", tags: ["social", "energetic", "outgoing"], order: 1 },
        { text: "Quiet family pooja time with my loved ones. 🪔", emoji: "🪔", tags: ["loyal", "family-oriented", "spiritual"], order: 2 },
        { text: "Decorating rangolis and clicking aesthetic pics. 🎨", emoji: "🎨", tags: ["creative", "artistic", "thoughtful"], order: 3 },
        { text: "Enjoying traditions, sweets, and that homely glow. 🕉️", emoji: "🕉️", tags: ["traditional", "grounded", "spiritual"], order: 4 }
      ]
    },
    {
      text: "How do you take on something new this festive season?",
      order: 3,
      options: [
        { text: "Dive in — fireworks first, questions later! 🚀", emoji: "🚀", tags: ["bold", "adventurous", "confident"], order: 1 },
        { text: "Research like I’m picking the perfect mithai box. 🔍", emoji: "🔍", tags: ["analytical", "careful", "intelligent"], order: 2 },
        { text: "Ask my family squad before jumping in. 👥", emoji: "👥", tags: ["social", "collaborative", "cautious"], order: 3 },
        { text: "Trust my gut — good vibes never lie. 🎯", emoji: "🎯", tags: ["intuitive", "self-aware", "wise"], order: 4 }
      ]
    },
    {
      text: "What kind of energy do you bring to a Diwali get-together?",
      order: 4,
      options: [
        { text: "Pure sparkle — I light up the whole mood! ✨", emoji: "✨", tags: ["energetic", "inspiring", "magnetic"], order: 1 },
        { text: "Grounded and calm — like a diya that never flickers. 🛡️", emoji: "🛡️", tags: ["reliable", "protective", "grounded"], order: 2 },
        { text: "Laughter, jokes, and full-on fun vibes! 😄", emoji: "😄", tags: ["fun", "lighthearted", "joyful"], order: 3 },
        { text: "Quiet warmth — I listen and keep peace flowing. 👂", emoji: "👂", tags: ["empathetic", "caring", "humble"], order: 4 }
      ]
    },
    {
      text: "What does Diwali success mean to you?",
      order: 5,
      options: [
        { text: "Throwing the best party — lights, snacks, and vibes! 🏆", emoji: "🏆", tags: ["ambitious", "bold", "determined"], order: 1 },
        { text: "Seeing my home glow and my parents smile. 🏠", emoji: "🏠", tags: ["responsible", "practical", "caring"], order: 2 },
        { text: "Spreading happiness and sharing sweets with all. 🌟", emoji: "🌟", tags: ["compassionate", "generous", "purposeful"], order: 3 },
        { text: "Feeling calm inside — real Diwali peace. 🧘", emoji: "🧘", tags: ["introspective", "spiritual", "self-aware"], order: 4 }
      ]
    },
    {
      text: "How do you spend your festive evenings?",
      order: 6,
      options: [
        { text: "Out exploring stalls, lights, and festive chaos! 🪩", emoji: "🪩", tags: ["adventurous", "curious", "energetic"], order: 1 },
        { text: "Creating rangolis and crafting decor magic. 🎨", emoji: "🎨", tags: ["creative", "artistic", "focused"], order: 2 },
        { text: "Chai, snacks, and non-stop family laughter! 🍽️", emoji: "🍽️", tags: ["social", "warm", "connected"], order: 3 },
        { text: "Watching diyas flicker — that quiet, cozy peace. 📚", emoji: "📚", tags: ["thoughtful", "wise", "spiritual"], order: 4 }
      ]
    },
    {
      text: "When someone feels low during Diwali, what do you do?",
      order: 7,
      options: [
        { text: "Crack jokes till they smile — instant mood lift! 💪", emoji: "💪", tags: ["inspiring", "bold", "confident"], order: 1 },
        { text: "Help out — fix lights or grab them some chai. 🔧", emoji: "🔧", tags: ["practical", "reliable", "logical"], order: 2 },
        { text: "Listen with heart — sometimes that’s all we need. 🤝", emoji: "🤝", tags: ["empathetic", "caring", "supportive"], order: 3 },
        { text: "Remind them that light always wins over darkness. 🕊️", emoji: "🕊️", tags: ["wise", "spiritual", "thoughtful"], order: 4 }
      ]
    }
  ]
  

  for (const q of questions) {
    const { options, ...questionData } = q;
    const optionsWithRequiredFields = options.map((opt: any, idx: number) => ({
      text: opt.text,
      tags: opt.tags,
      emoji: '✨',
      order: idx + 1,
    }));
    await prisma.question.create({
      data: {
        ...questionData,
        options: {
          create: optionsWithRequiredFields,
        }
      }
    });
  }

  // Create Sweets with CORRECTED NUTRITION VALUES (per piece/100g serving)
  const sweets = [
    {
      name: "Gulab Jamun",
      emoji: "🟤",
      description: "You're like Gulab Jamun — soft outside, softer inside. You bring comfort to everyone around you, and your presence makes gatherings sweeter and warmer.",
      tagline: "The Timeless Comfort",
      funFact: "Still the king of Indian desserts — no competition, only respect.",
      imageUrl: "/sweets/gulab-jamun.jpg",
      tags: ["warm", "classic", "comforting", "homely"],
      calories: 194,
      protein: 2.1,
      carbs: 28.0,
      fat: 8.5,
      fiber: 0.2,
      sugar: 24.0
    },
    {
      name: "Jalebi",
      emoji: "🧡",
      description: "You're like Jalebi — a full-time entertainer with loops of chaos. You bring excitement, laughter, and unpredictable energy wherever you go.",
      tagline: "The Spirited Chaos",
      funFact: "Every spiral is unique — just like your life choices.",
      imageUrl: "/sweets/jalebi.jpg",
      tags: ["fun", "bold", "vibrant", "chaotic"],
      calories: 223,
      protein: 1.5,
      carbs: 40.0,
      fat: 6.0,
      fiber: 0.1,
      sugar: 35.0
    },
    {
      name: "Kaju Katli",
      emoji: "💎",
      description: "You're like Kaju Katli — sophisticated, elegant, and always noticed without trying. You carry yourself with grace and leave a lasting impression.",
      tagline: "The Elegant Soul",
      funFact: "Edible silver on top — your aura is equally premium.",
      imageUrl: "/sweets/kaju-katli.jpg",
      tags: ["elegant", "refined", "calm", "premium"],
      calories: 112,
      protein: 3.2,
      carbs: 13.0,
      fat: 5.5,
      fiber: 0.8,
      sugar: 10.0
    },
    {
      name: "Rasgulla",
      emoji: "⚪",
      description: "You're like Rasgulla — soft, sweet, and emotionally gentle. You are the calm in the storm and make everyone feel at ease.",
      tagline: "The Gentle Spirit",
      funFact: "Bengal and Odisha fight over your origin — legends unite people.",
      imageUrl: "/sweets/rasgulla.jpg",
      tags: ["calm", "peaceful", "delicate", "patient"],
      calories: 101,
      protein: 2.4,
      carbs: 22.0,
      fat: 0.8,
      fiber: 0.1,
      sugar: 18.0
    },
    {
      name: "Ladoo",
      emoji: "🟡",
      description: "You're like Ladoo — full of joy, energy, and celebration. Wherever you go, people feel the festive vibe and can't help smiling.",
      tagline: "The Life of the Party",
      funFact: "Auspicious at every event — your energy is the blessing itself.",
      imageUrl: "/sweets/ladoo.jpg",
      tags: ["joyful", "vibrant", "social", "playful"],
      calories: 170,
      protein: 4.8,
      carbs: 25.0,
      fat: 6.5,
      fiber: 1.2,
      sugar: 18.0
    },
    {
      name: "Barfi",
      emoji: "🟫",
      description: "You're like Barfi — simple, dependable, and full of quiet strength. People trust you and feel grounded around your calm presence.",
      tagline: "The Dependable One",
      funFact: "'Barf' means snow — just like your pure and steady nature.",
      imageUrl: "/sweets/barfi.jpg",
      tags: ["simple", "traditional", "comforting", "reliable"],
      calories: 150,
      protein: 3.8,
      carbs: 22.0,
      fat: 6.0,
      fiber: 0.5,
      sugar: 16.0
    },
    {
      name: "Mysore Pak",
      emoji: "🟨",
      description: "You're like Mysore Pak — rich, bold, and unforgettable. You leave a mark wherever you go, unapologetically yourself and intense in everything you do.",
      tagline: "The Unforgettable Force",
      funFact: "Half ghee, half attitude — full-time legend.",
      imageUrl: "/sweets/mysore-pak.jpg",
      tags: ["bold", "intense", "luxurious", "ambitious"],
      calories: 280,
      protein: 2.5,
      carbs: 18.0,
      fat: 21.0,
      fiber: 0.8,
      sugar: 14.0
    },
    {
      name: "Kheer",
      emoji: "🍚",
      description: "You're like Kheer — comforting, creamy, and nurturing. People feel safe around you, and your warmth leaves a lasting impression.",
      tagline: "The Nurturing Heart",
      funFact: "One of the world's oldest desserts — timeless comfort.",
      imageUrl: "/sweets/kheer.jpg",
      tags: ["comforting", "homely", "traditional", "nurturing"],
      calories: 192,
      protein: 5.2,
      carbs: 26.0,
      fat: 7.8,
      fiber: 0.2,
      sugar: 20.0
    },
    {
      name: "Sandesh",
      emoji: "🤍",
      description: "You're like Sandesh — artistic, delicate, and full of thoughtfulness. People admire your subtle charm and the care you put into everything.",
      tagline: "The Creative Visionary",
      funFact: "Molded into beautiful shapes — just like your soul.",
      imageUrl: "/sweets/sandesh.jpg",
      tags: ["creative", "artistic", "delicate", "thoughtful"],
      calories: 114,
      protein: 4.5,
      carbs: 12.0,
      fat: 5.2,
      fiber: 0.4,
      sugar: 10.0
    },
    {
      name: "Soan Papdi",
      emoji: "🟧",
      description: "You're like Soan Papdi — flaky, layered, and fun. People may take time to understand you, but once they do, they're hooked on your charm.",
      tagline: "The Layered Mystery",
      funFact: "Over 1000 layers — complexity is your strength.",
      imageUrl: "/sweets/soan-papdi.jpg",
      tags: ["unique", "fun", "complex", "playful"],
      calories: 185,
      protein: 3.0,
      carbs: 28.0,
      fat: 7.5,
      fiber: 0.3,
      sugar: 22.0
    },
    {
      name: "Peda",
      emoji: "🤎",
      description: "You're like Peda — dense, grounded, and deeply rooted in tradition. People rely on you for stability, values, and quiet guidance.",
      tagline: "The Grounded Soul",
      funFact: "Each region has its own Peda — staying true to roots, just like you.",
      imageUrl: "/sweets/peda.jpg",
      tags: ["traditional", "strong", "spiritual", "wise"],
      calories: 206,
      protein: 4.0,
      carbs: 30.0,
      fat: 8.5,
      fiber: 0.2,
      sugar: 24.0
    },
    {
      name: "Coconut Ladoo",
      emoji: "🥥",
      description: "You're like Coconut Ladoo — fresh, light, and refreshingly real. You're approachable, modern, and effortlessly leave a good impression.",
      tagline: "The Refreshing Spirit",
      funFact: "Naturally gluten-free and quick to make — just like your effortless charm.",
      imageUrl: "/sweets/coconut-ladoo.jpg",
      tags: ["modern", "refreshing", "simple", "cheerful"],
      calories: 156,
      protein: 2.3,
      carbs: 20.0,
      fat: 7.2,
      fiber: 2.1,
      sugar: 16.0
    },
    {
      name: "Kalakand",
      emoji: "💛",
      description: "You're like Kalakand — crumbly, warm, and authentic. People trust you because you're real, pure, and never fake.",
      tagline: "The Authentically You",
      funFact: "Pure condensed milk magic — simple ingredients, extraordinary results.",
      imageUrl: "/sweets/kalakand.jpg",
      tags: ["authentic", "warm", "genuine", "pure"],
      calories: 185,
      protein: 5.8,
      carbs: 26.0,
      fat: 6.8,
      fiber: 0.1,
      sugar: 22.0
    },
    {
      name: "Mohanthal",
      emoji: "💜",
      description: "You're like Mohanthal — nutty, aromatic, and complex. People need time to fully appreciate you, but your patience and thoughtfulness make it worth it.",
      tagline: "The Thoughtful Creator",
      funFact: "Hours of love and stirring — patience is your superpower.",
      imageUrl: "/sweets/mohanthal.jpg",
      tags: ["complex", "aromatic", "luxurious", "patient"],
      calories: 220,
      protein: 6.2,
      carbs: 24.0,
      fat: 11.5,
      fiber: 1.3,
      sugar: 18.0
    },
    {
      name: "Gujiya",
      emoji: "🥟",
      description: "You're like Gujiya — crispy outside, sweet inside, and full of surprises. You keep people guessing and make every festival more delightful.",
      tagline: "The Pleasant Surprise",
      funFact: "Official sweet of Holi, but perfect for Diwali too — versatility is your vibe.",
      imageUrl: "/sweets/gujiya.jpg",
      tags: ["surprising", "layered", "traditional", "festive"],
      calories: 236,
      protein: 2.8,
      carbs: 32.0,
      fat: 10.2,
      fiber: 0.9,
      sugar: 24.0
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
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });