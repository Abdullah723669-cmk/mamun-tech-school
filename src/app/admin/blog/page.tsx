import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import {
  Users, BookOpen, ShoppingCart, Settings, FileText,
  BarChart3, GraduationCap, ExternalLink, Plus
} from "lucide-react"

export default async function AdminBlogPage() {
  const session = await auth()
  if (!session || (session.user as any).role !== "ADMIN") redirect("/")

  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  })

  const navItems = [
    { href: "/admin", label: "Overview", icon: BarChart3 },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "70px" }}>
      <aside style={{
        width: 240, background: "#0D0D18", borderRight: "1px solid rgba(108,99,255,0.12)",
        padding: "1.5rem 1rem", position: "fixed", top: 70, bottom: 0, overflowY: "auto",
      }}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0 0.5rem", marginBottom: "1.5rem" }}>
            <GraduationCap size={20} color="#6C63FF" />
            <span style={{ fontFamily: "Outfit", fontWeight: 700, color: "#F0F0FF", fontSize: "0.9rem" }}>
              Admin Panel
            </span>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`sidebar-link ${item.href === "/admin/blog" ? "active" : ""}`}>
                <item.icon size={17} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: 240, padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontFamily: "Outfit", fontSize: "1.8rem", fontWeight: 800, color: "#F0F0FF" }}>
              Blog Posts ({posts.length})
            </h1>
            <p style={{ color: "#6060A0", fontSize: "0.9rem" }}>
              Manage tech articles and announcements.
            </p>
          </div>
          <button className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}>
            <Plus size={16} /> New Article
          </button>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Published Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td style={{ color: "#F0F0FF", fontWeight: 600, fontSize: "0.9rem" }}>
                    {post.title}
                  </td>
                  <td style={{ color: "#A0A0C0", fontSize: "0.85rem" }}>{post.category}</td>
                  <td style={{ color: "#6060A0", fontSize: "0.85rem" }}>{formatDate(post.publishedAt)}</td>
                  <td>
                    <Link href={`/blog/${post.slug}`} style={{ color: "#6C63FF", textDecoration: "none", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      View <ExternalLink size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
