import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Award, Clock, ArrowRight, PlayCircle, CheckCircle, User } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  if (!session || !session.user?.id) {
    redirect("/auth/signin")
  }

  const userId = session.user.id

  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { enrolledAt: "desc" },
  })

  const completedCount = enrollments.filter((e) => e.progress === 100).length
  const activeCount = enrollments.length - completedCount

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="container-custom">
        {/* Welcome Header */}
        <div className="glass-card" style={{ padding: "2rem", marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.85rem", color: "#6C63FF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.25rem" }}>
              Student Portal
            </div>
            <h1 style={{ fontFamily: "Outfit", fontSize: "1.8rem", fontWeight: 800, color: "#F0F0FF" }}>
              Welcome back, {session.user?.name}! 👋
            </h1>
            <p style={{ color: "#A0A0C0", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              Continue learning and upgrading your tech skills.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link href="/my-courses" className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}>
              My Courses <BookOpen size={16} />
            </Link>
            <Link href="/profile" className="btn-secondary" style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}>
              Edit Profile <User size={16} />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2.5rem" }}>
          <div className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{ width: 50, height: 50, borderRadius: "12px", background: "rgba(108, 99, 255, 0.15)", border: "1px solid rgba(108, 99, 255, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={24} color="#6C63FF" />
            </div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, fontFamily: "Outfit", color: "#F0F0FF" }}>{enrollments.length}</div>
              <div style={{ fontSize: "0.85rem", color: "#6060A0" }}>Enrolled Courses</div>
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{ width: 50, height: 50, borderRadius: "12px", background: "rgba(67, 188, 205, 0.15)", border: "1px solid rgba(67, 188, 205, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Clock size={24} color="#43BCCD" />
            </div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, fontFamily: "Outfit", color: "#F0F0FF" }}>{activeCount}</div>
              <div style={{ fontSize: "0.85rem", color: "#6060A0" }}>Active Learning</div>
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{ width: 50, height: 50, borderRadius: "12px", background: "rgba(255, 215, 0, 0.15)", border: "1px solid rgba(255, 215, 0, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Award size={24} color="#FFD700" />
            </div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, fontFamily: "Outfit", color: "#F0F0FF" }}>{completedCount}</div>
              <div style={{ fontSize: "0.85rem", color: "#6060A0" }}>Completed Courses</div>
            </div>
          </div>
        </div>

        {/* My Enrolled Courses Section */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "Outfit", fontSize: "1.4rem", fontWeight: 800, color: "#F0F0FF" }}>
              My Learning
            </h2>
            <Link href="/courses" style={{ color: "#6C63FF", fontSize: "0.875rem", textDecoration: "none", fontWeight: 600 }}>
              Browse More Courses →
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
              <BookOpen size={40} color="#6060A0" style={{ margin: "0 auto 1rem" }} />
              <h3 style={{ fontFamily: "Outfit", fontSize: "1.2rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.5rem" }}>
                No Enrolled Courses Yet
              </h3>
              <p style={{ color: "#6060A0", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                You haven't enrolled in any courses yet. Start your journey today!
              </p>
              <Link href="/courses" className="btn-primary" style={{ padding: "0.75rem 1.75rem" }}>
                Explore Course Catalog
              </Link>
            </div>
          ) : (
            <div className="courses-grid">
              {enrollments.map(({ course, progress }) => (
                <div key={course.id} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative", height: 160 }}>
                    <Image src={course.image} alt={course.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span className="badge badge-primary" style={{ fontSize: "0.65rem", width: "fit-content", marginBottom: "0.5rem" }}>
                      {course.category}
                    </span>
                    <h3 style={{ fontFamily: "Outfit", fontSize: "1.05rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.75rem" }}>
                      {course.title}
                    </h3>

                    {/* Progress Bar */}
                    <div style={{ marginTop: "auto", marginBottom: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                      </div>
                    </div>

                    <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.65rem", fontSize: "0.85rem" }}>
                      <PlayCircle size={16} /> Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
