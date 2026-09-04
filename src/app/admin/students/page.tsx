import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import {
  Users, BookOpen, ShoppingCart, Settings, FileText,
  BarChart3, GraduationCap, CheckCircle
} from "lucide-react"

export default async function AdminStudentsPage() {
  const session = await auth()
  if (!session || (session.user as any).role !== "ADMIN") redirect("/")

  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    include: { _count: { select: { enrollments: true } } },
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
              <Link key={item.href} href={item.href} className={`sidebar-link ${item.href === "/admin/students" ? "active" : ""}`}>
                <item.icon size={17} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: 240, padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "Outfit", fontSize: "1.8rem", fontWeight: 800, color: "#F0F0FF" }}>
            Student Management ({students.length})
          </h1>
          <p style={{ color: "#6060A0", fontSize: "0.9rem" }}>
            View and manage all registered students and their course enrollments.
          </p>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Enrolled Courses</th>
                <th>Joined Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td style={{ color: "#F0F0FF", fontWeight: 600, fontSize: "0.9rem" }}>
                    {student.name}
                  </td>
                  <td style={{ color: "#A0A0C0", fontSize: "0.85rem" }}>
                    {student.email}
                  </td>
                  <td style={{ color: "#6C63FF", fontWeight: 700 }}>
                    {student._count.enrollments} courses
                  </td>
                  <td style={{ color: "#6060A0", fontSize: "0.85rem" }}>
                    {formatDate(student.createdAt)}
                  </td>
                  <td>
                    <span className="badge badge-green" style={{ fontSize: "0.68rem" }}>
                      <CheckCircle size={10} style={{ marginRight: 3 }} /> Active
                    </span>
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
