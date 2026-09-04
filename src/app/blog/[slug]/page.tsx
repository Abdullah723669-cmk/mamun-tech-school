import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { Calendar, ArrowLeft } from "lucide-react"

interface BlogDetailProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogDetailProps) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post) return { title: "Article Not Found" }
  return {
    title: `${post.title} — Mamun Tech School Blog`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })

  if (!post) notFound()

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="container-custom" style={{ maxWidth: 800 }}>
        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#6C63FF", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, marginBottom: "2rem" }}>
          <ArrowLeft size={16} /> Back to Blog Articles
        </Link>

        <div className="badge badge-primary" style={{ marginBottom: "1rem" }}>
          {post.category}
        </div>

        <h1 style={{ fontFamily: "Outfit", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#F0F0FF", marginBottom: "1rem", lineHeight: 1.2 }}>
          {post.title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#6060A0", fontSize: "0.85rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Calendar size={14} /> Published {formatDate(post.publishedAt)}
          </div>
        </div>

        <div style={{ position: "relative", height: 360, borderRadius: "16px", overflow: "hidden", marginBottom: "2.5rem" }}>
          <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />
        </div>

        <div style={{ color: "#C0C0E0", lineHeight: 1.8, fontSize: "1.05rem" }} dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  )
}
