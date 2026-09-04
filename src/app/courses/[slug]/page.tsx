import { notFound } from "next/navigation"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"
import { AddToCartButton } from "@/components/courses/AddToCartButton"
import { Star, Clock, Users, BookOpen, CheckCircle, Award, Shield, User } from "lucide-react"

interface CourseDetailProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CourseDetailProps) {
  const { slug } = await params
  const course = await prisma.course.findUnique({ where: { slug } })
  if (!course) return { title: "Course Not Found" }
  return {
    title: `${course.title} — Mamun Tech School`,
    description: course.shortDesc,
  }
}

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const { slug } = await params
  const course = await prisma.course.findUnique({
    where: { slug }
  })

  if (!course) {
    notFound()
  }

  const curriculum = typeof course.curriculum === "string" ? JSON.parse(course.curriculum) : course.curriculum
  const highlights = typeof course.highlights === "string" ? JSON.parse(course.highlights) : course.highlights
  const requirements = typeof course.requirements === "string" ? JSON.parse(course.requirements) : course.requirements

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "5rem" }}>
      {/* Course Banner Header */}
      <section style={{
        background: "var(--gradient-hero)",
        padding: "4rem 0 3rem",
        borderBottom: "1px solid rgba(108, 99, 255, 0.15)",
        position: "relative"
      }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", alignItems: "flex-start" }}>
            <div>
              <div className="badge badge-primary" style={{ marginBottom: "1rem" }}>
                {course.category}
              </div>
              <h1 style={{ fontFamily: "Outfit", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#F0F0FF", marginBottom: "1rem" }}>
                {course.title}
              </h1>
              <p style={{ color: "#A0A0C0", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {course.shortDesc}
              </p>

              {/* Meta Stats */}
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Star size={16} fill="#FFD700" color="#FFD700" />
                  <span style={{ fontSize: "0.9rem", color: "#F0F0FF", fontWeight: 700 }}>{course.rating}</span>
                  <span style={{ fontSize: "0.85rem", color: "#6060A0" }}>(Ratings)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Users size={16} color="#43BCCD" />
                  <span style={{ fontSize: "0.9rem", color: "#A0A0C0" }}>{course.totalStudents.toLocaleString()} Students</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={16} color="#6C63FF" />
                  <span style={{ fontSize: "0.9rem", color: "#A0A0C0" }}>{course.duration}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Award size={16} color="#FFD700" />
                  <span style={{ fontSize: "0.9rem", color: "#A0A0C0" }}>Certificate Included</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(108, 99, 255, 0.15)" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <User size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#6060A0" }}>Instructor</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#F0F0FF" }}>{course.instructor}</div>
                </div>
              </div>
            </div>

            {/* Desktop Pricing Card */}
            <div className="glass-card" style={{ padding: "1.75rem", position: "sticky", top: 100 }}>
              <div style={{ position: "relative", height: 180, borderRadius: "12px", overflow: "hidden", marginBottom: "1.25rem" }}>
                <Image src={course.image} alt={course.title} fill style={{ objectFit: "cover" }} />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#6C63FF", fontFamily: "Outfit" }}>
                  {formatPrice(course.price)}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6060A0" }}>Full course access & certificate</div>
              </div>

              <AddToCartButton course={{
                id: course.id,
                title: course.title,
                price: course.price,
                image: course.image,
                slug: course.slug,
                instructor: course.instructor,
                duration: course.duration,
              }} />

              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#F0F0FF" }}>This course includes:</div>
                {Array.isArray(highlights) && highlights.map((h: string, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8rem", color: "#A0A0C0" }}>
                    <CheckCircle size={14} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="section">
        <div className="container-custom">
          <div style={{ maxWidth: 800 }}>
            {/* Description */}
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontFamily: "Outfit", fontSize: "1.5rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "1rem" }}>
                About This Course
              </h2>
              <div style={{ color: "#A0A0C0", lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-line" }}>
                {course.description}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontFamily: "Outfit", fontSize: "1.5rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "1.25rem" }}>
                Course Curriculum
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {Array.isArray(curriculum) && curriculum.map((mod: any, i: number) => (
                  <div key={i} className="card" style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontFamily: "Outfit", fontSize: "1.05rem", fontWeight: 700, color: "#6C63FF", marginBottom: "0.75rem" }}>
                      {mod.module}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {Array.isArray(mod.lessons) && mod.lessons.map((lesson: string, idx: number) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.875rem", color: "#A0A0C0" }}>
                          <BookOpen size={14} color="#6060A0" />
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Bio */}
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontFamily: "Outfit", fontSize: "1.5rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "1.25rem" }}>
                Meet Your Instructor
              </h2>
              <div className="glass-card" style={{ padding: "1.75rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <User size={30} color="white" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.2rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.25rem" }}>
                    {course.instructor}
                  </h3>
                  <p style={{ color: "#6060A0", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {course.instructorBio}
                  </p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h2 style={{ fontFamily: "Outfit", fontSize: "1.5rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "1rem" }}>
                Requirements
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {Array.isArray(requirements) && requirements.map((req: string, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "#A0A0C0" }}>
                    <Shield size={16} color="#6C63FF" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
