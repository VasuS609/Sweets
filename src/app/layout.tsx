import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diwali Sweet Quiz - Find Your Perfect Diwali Sweet",
  description: "Discover which Diwali sweet matches your personality! Take our fun quiz and find out if you're a Gulab Jamun, Jalebi, Barfi, or another delicious sweet. Perfect for Diwali celebrations!",
  keywords: ["Diwali", "sweet", "quiz", "personality", "Indian sweets", "festival", "celebration", "Gulab Jamun", "Jalebi", "Barfi", "Ladoo"],
  authors: [{ name: "Diwali Quiz Team" }],
  creator: "Diwali Quiz",
  publisher: "Diwali Quiz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://diwali-quiz.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Diwali Sweet Quiz - Find Your Perfect Diwali Sweet",
    description: "Discover which Diwali sweet matches your personality! Take our fun quiz and find out if you're a Gulab Jamun, Jalebi, Barfi, or another delicious sweet.",
    url: '/',
    siteName: 'Diwali Sweet Quiz',
    images: [
      {
        url: '/quizpage.jpg',
        width: 1200,
        height: 630,
        alt: 'Diwali Sweet Quiz - Find Your Perfect Sweet',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Diwali Sweet Quiz - Find Your Perfect Diwali Sweet",
    description: "Discover which Diwali sweet matches your personality! Take our fun quiz and find out if you're a Gulab Jamun, Jalebi, Barfi, or another delicious sweet.",
    images: ['/quizpage.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}