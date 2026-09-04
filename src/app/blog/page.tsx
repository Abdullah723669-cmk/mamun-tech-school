import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { Calendar, Tag, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Latest Tech Info & Articles — Mamun Tech School",
  description: "Stay updated with the latest in AI Agents, n8n automation, Python, DevOps, and Data Science.",
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "5rem" }}>
      <section style={{
        background: "var(--gradient-hero)",
        padding: "5rem 0 4rem",
        borderBottom: "1px solid rgba(108, 99, 255, 0.15)",
        textAlign: "center"
      }}>
        <div className="container-custom">
          <div className="badge badge-primary" style={{ marginBottom: "1rem" }}>
            📰 Tech Insights & News
          </div>
          <h1 style={{ fontFamily: "Outfit", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#F0F0FF", marginBottom: "1.25rem" }}>
            Latest <span className="gradient-text">Tech Information</span>
          </h1>
          <p style={{ color: "#A0A0C0", maxWidth: 600, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.8 }}>
            Discover industry trends, automation tutorials, programming guides, and AI advancements written by our instructors.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="courses-grid">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ position: "relative", height: 200 }}>
                    <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <span className="badge badge-primary" style={{ fontSize: "0.68rem" }}>{post.category}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "#6060A0" }}>
                        <Calendar size={12} /> {formatDate(post.publishedAt)}
                      </div>
                    </div>

                    <h2 style={{ fontFamily: "Outfit", fontSize: "1.15rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.6rem", lineHeight: 1.3 }}>
                      {post.title}
                    </h2>

                    <p style={{ color: "#A0A0C0", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.25rem" }} className="line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "6px", color: "#6C63FF", fontWeight: 600, fontSize: "0.85rem" }}>
                      Read Article <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
