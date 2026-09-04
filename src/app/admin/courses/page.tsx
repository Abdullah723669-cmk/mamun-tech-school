import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import {
  Users, BookOpen, ShoppingCart, Settings, FileText,
  BarChart3, GraduationCap,
} from "lucide-react"
import CoursesManager from "@/components/courses/CoursesManager"

export default async function AdminCoursesPage() {
  const session = await auth()
  if (!session || (session.user as any).role !== "ADMIN") redirect("/")

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
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
              <Link key={item.href} href={item.href} className={`sidebar-link ${item.href === "/admin/courses" ? "active" : ""}`}>
                <item.icon size={17} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: 240, padding: "2rem" }}>
        {/* CoursesManager is a client component that renders the full header + table + modal */}
        <CoursesManager initialCourses={courses} />
      </main>
    </div>
  )
}
