import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import {
  Users, BookOpen, ShoppingCart, TrendingUp, DollarSign,
  Eye, Settings, FileText, BarChart3, GraduationCap
} from "lucide-react"

async function getAdminStats() {
  const [
    totalStudents, totalCourses, totalOrders, totalRevenue,
    recentOrders, recentStudents, courseStats
  ] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.course.count(),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.order.aggregate({ where: { status: "PAID" }, _sum: { total: true } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } }, orderItems: { include: { course: { select: { title: true } } } } }
    }),
    prisma.user.findMany({
      where: { role: "STUDENT" }, take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, createdAt: true }
    }),
    prisma.course.findMany({
      select: { title: true, totalStudents: true, price: true, rating: true },
      orderBy: { totalStudents: "desc" }, take: 6
    })
  ])

  return { totalStudents, totalCourses, totalOrders, totalRevenue: totalRevenue._sum.total ?? 0, recentOrders, recentStudents, courseStats }
}

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session || (session.user as any).role !== "ADMIN") redirect("/")

  const { totalStudents, totalCourses, totalOrders, totalRevenue, recentOrders, recentStudents, courseStats } = await getAdminStats()

  const stats = [
    { label: "Total Students", value: totalStudents.toLocaleString(), icon: Users, color: "#6C63FF", change: "+12% this month" },
    { label: "Active Courses", value: totalCourses.toString(), icon: BookOpen, color: "#43BCCD", change: "6 courses live" },
    { label: "Paid Orders", value: totalOrders.toLocaleString(), icon: ShoppingCart, color: "#FFD700", change: "+8% this month" },
    { label: "Total Revenue", value: formatPrice(totalRevenue), icon: DollarSign, color: "#FF6584", change: "+15% this month" },
  ]

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
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: "#0D0D18",
        borderRight: "1px solid rgba(108,99,255,0.12)",
        padding: "1.5rem 1rem",
        position: "fixed",
        top: 70, bottom: 0,
        overflowY: "auto",
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
              <Link key={item.href} href={item.href} className="sidebar-link">
                <item.icon size={17} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div style={{
          background: "rgba(108,99,255,0.08)",
          border: "1px solid rgba(108,99,255,0.15)",
          borderRadius: "12px",
          padding: "1rem",
          marginTop: "auto",
        }}>
          <div style={{ fontSize: "0.75rem", color: "#6060A0", marginBottom: "0.3rem" }}>Logged in as</div>
          <div style={{ fontSize: "0.875rem", color: "#F0F0FF", fontWeight: 600 }}>{session.user?.name}</div>
          <div style={{ fontSize: "0.75rem", color: "#6C63FF" }}>Administrator</div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 240, padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "Outfit", fontSize: "1.8rem", fontWeight: 800, color: "#F0F0FF" }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "#6060A0", fontSize: "0.9rem" }}>
            Welcome back, {session.user?.name}! Here's what's happening.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{
              background: "#1A1A28",
              border: "1px solid rgba(108,99,255,0.12)",
              borderRadius: "16px",
              padding: "1.5rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "11px",
                  background: `${stat.color}20`,
                  border: `1px solid ${stat.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <stat.icon size={20} color={stat.color} />
                </div>
                <TrendingUp size={14} color="#22c55e" />
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "Outfit", color: "#F0F0FF", lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#6060A0", marginTop: "0.4rem" }}>{stat.label}</div>
              <div style={{ fontSize: "0.75rem", color: "#22c55e", marginTop: "0.4rem" }}>{stat.change}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Recent Orders */}
          <div style={{
            background: "#1A1A28",
            border: "1px solid rgba(108,99,255,0.12)",
            borderRadius: "16px",
            padding: "1.5rem",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1rem", color: "#F0F0FF" }}>Recent Orders</h2>
              <Link href="/admin/orders" style={{ fontSize: "0.8rem", color: "#6C63FF", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {recentOrders.length === 0 && (
                <p style={{ color: "#6060A0", fontSize: "0.875rem" }}>No orders yet.</p>
              )}
              {recentOrders.map((order) => (
                <div key={order.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "0.75rem", background: "rgba(108,99,255,0.05)",
                  borderRadius: "10px", border: "1px solid rgba(108,99,255,0.08)"
                }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#F0F0FF" }}>{order.user.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6060A0" }}>
                      {order.orderItems.map(i => i.course.title).join(", ")}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#6C63FF" }}>{formatPrice(order.total)}</div>
                    <span style={{
                      fontSize: "0.7rem", padding: "2px 8px",
                      background: order.status === "PAID" ? "rgba(34,197,94,0.15)" : "rgba(255,215,0,0.15)",
                      color: order.status === "PAID" ? "#22c55e" : "#FFD700",
                      borderRadius: "4px", fontWeight: 600
                    }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Performance */}
          <div style={{
            background: "#1A1A28",
            border: "1px solid rgba(108,99,255,0.12)",
            borderRadius: "16px",
            padding: "1.5rem",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1rem", color: "#F0F0FF" }}>Course Performance</h2>
              <Link href="/admin/courses" style={{ fontSize: "0.8rem", color: "#6C63FF", textDecoration: "none" }}>
                Manage →
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {courseStats.map((course, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "8px",
                    background: "rgba(108,99,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 700, color: "#6C63FF", flexShrink: 0
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#F0F0FF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {course.title}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "3px" }}>
                      <div style={{
                        flex: 1, height: 4,
                        background: "rgba(108,99,255,0.15)", borderRadius: 2, overflow: "hidden"
                      }}>
                        <div style={{
                          height: "100%",
                          width: `${Math.min((course.totalStudents / 1500) * 100, 100)}%`,
                          background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
                          borderRadius: 2
                        }} />
                      </div>
                      <span style={{ fontSize: "0.7rem", color: "#A0A0C0", flexShrink: 0 }}>
                        {course.totalStudents} students
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6C63FF", flexShrink: 0 }}>
                    {formatPrice(course.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: "1.5rem" }}>
          <h2 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1rem", color: "#F0F0FF", marginBottom: "1rem" }}>
            Quick Actions
          </h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { href: "/admin/students", label: "Manage Students", icon: Users, color: "#6C63FF" },
              { href: "/admin/courses", label: "Manage Courses", icon: BookOpen, color: "#43BCCD" },
              { href: "/admin/orders", label: "View Orders", icon: ShoppingCart, color: "#FFD700" },
              { href: "/admin/blog", label: "Manage Blog", icon: FileText, color: "#FF6584" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  padding: "0.75rem 1.25rem",
                  background: `${action.color}15`,
                  border: `1px solid ${action.color}30`,
                  borderRadius: "10px",
                  color: action.color,
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                }}
              >
                <action.icon size={16} />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
