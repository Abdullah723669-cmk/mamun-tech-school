import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"
import { Star, Clock, Users, ChevronRight, Search } from "lucide-react"

export const metadata = {
  title: "Explore Courses — Mamun Tech School",
  description: "Browse our industry-aligned tech courses in Python, DevOps, AI Agents, n8n Automation, R Data Analysis, and Power BI.",
}

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  const categories = ["All", "Programming", "DevOps & Cloud", "Artificial Intelligence", "AI Automation", "Data Science", "Business Intelligence"]

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "5rem" }}>
      {/* Header */}
      <section style={{
        background: "var(--gradient-hero)",
        padding: "4rem 0 3rem",
        borderBottom: "1px solid rgba(108, 99, 255, 0.15)",
        textAlign: "center"
      }}>
        <div className="container-custom">
          <div className="badge badge-primary" style={{ marginBottom: "1rem" }}>
            🎓 Course Catalog
          </div>
          <h1 style={{ fontFamily: "Outfit", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#F0F0FF", marginBottom: "1rem" }}>
            Transform Your Career with <span className="gradient-text">Expert Courses</span>
          </h1>
          <p style={{ color: "#A0A0C0", maxWidth: 600, margin: "0 auto 2rem", fontSize: "1rem" }}>
            Explore hands-on programs taught by industry professionals. Gain practical, job-ready tech skills.
          </p>

          {/* Search bar */}
          <div style={{ maxWidth: 500, margin: "0 auto", position: "relative" }}>
            <Search size={18} color="#6060A0" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search courses (e.g. Python, DevOps, AI)..."
              className="input"
              style={{ paddingLeft: "2.75rem", borderRadius: "50px", background: "rgba(26, 26, 40, 0.9)" }}
            />
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="section">
        <div className="container-custom">
          {/* Categories */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem", justifyContent: "center" }}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "50px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: i === 0 ? "none" : "1px solid rgba(108, 99, 255, 0.2)",
                  background: i === 0 ? "var(--gradient-brand)" : "rgba(26, 26, 40, 0.6)",
                  color: i === 0 ? "white" : "#A0A0C0",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="courses-grid">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card" style={{ overflow: "hidden", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(10,10,15,0.9), transparent)",
                    }} />
                    {course.featured && (
                      <div className="badge badge-gold" style={{ position: "absolute", top: 12, right: 12 }}>
                        ⭐ Featured
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <span className="badge badge-primary" style={{ fontSize: "0.7rem" }}>{course.category}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Star size={13} fill="#FFD700" color="#FFD700" />
                        <span style={{ fontSize: "0.8rem", color: "#A0A0C0", fontWeight: 600 }}>{course.rating}</span>
                      </div>
                    </div>

                    <h3 style={{
                      fontFamily: "Outfit", fontWeight: 700, fontSize: "1.1rem",
                      color: "#F0F0FF", marginBottom: "0.6rem", lineHeight: 1.3
                    }}>
                      {course.title}
                    </h3>

                    <p style={{
                      color: "#6060A0", fontSize: "0.85rem", lineHeight: 1.6,
                      marginBottom: "1.25rem"
                    }} className="line-clamp-2">
                      {course.shortDesc}
                    </p>

                    <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", marginTop: "auto" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Clock size={13} color="#6C63FF" />
                        <span style={{ fontSize: "0.8rem", color: "#A0A0C0" }}>{course.duration}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Users size={13} color="#43BCCD" />
                        <span style={{ fontSize: "0.8rem", color: "#A0A0C0" }}>{course.totalStudents.toLocaleString()} students</span>
                      </div>
                    </div>

                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "1rem",
                      borderTop: "1px solid rgba(108,99,255,0.1)"
                    }}>
                      <div>
                        <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#6C63FF", fontFamily: "Outfit" }}>
                          {formatPrice(course.price)}
                        </div>
                      </div>
                      <div style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        color: "#6C63FF", fontWeight: 600, fontSize: "0.85rem"
                      }}>
                        View Course <ChevronRight size={15} />
                      </div>
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
