import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "react-hot-toast"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: {
    default: "Mamun Tech School — Learn Tech, Build the Future",
    template: "%s | Mamun Tech School",
  },
  description:
    "Bangladesh's premier tech school offering world-class courses in Python, DevOps, AI Agents, n8n Automation, Data Analysis with R, and Power BI. Join 4,000+ students transforming their careers.",
  keywords:
    "tech school, programming courses, DevOps, AI agents, n8n automation, Python, Power BI, data analysis, Bangladesh",
  openGraph: {
    title: "Mamun Tech School — Learn Tech, Build the Future",
    description:
      "Bangladesh's premier tech school for Python, DevOps, AI, automation, and data science.",
    type: "website",
    locale: "en_BD",
    siteName: "Mamun Tech School",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1A1A28",
                color: "#F0F0FF",
                border: "1px solid rgba(108, 99, 255, 0.2)",
                borderRadius: "12px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
