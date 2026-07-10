import type { Metadata } from "next";
import { Sora, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: "Muhammad Awais — 3D Animator & Game Developer",
  description:
    "Portfolio of Muhammad Awais, a 3D animator and game developer who brings characters and worlds to life using Blender and After Effects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${hanken.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
