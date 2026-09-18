import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shikha Khandelwal | Senior Product Manager · AI & Enterprise Transformation",
  description: "Senior Product Manager portfolio spanning AI, automation, enterprise transformation, People Systems, responsible governance, roadmaps and measurable product adoption.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans no-scrollbar">{children}</body>
    </html>
  );
}
