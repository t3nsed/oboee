import { Geist, Geist_Mono } from "next/font/google"
import { Fira_Mono } from "next/font/google"

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
})
