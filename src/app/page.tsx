import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"
import {
  ArrowRight, Star, Users, BookOpen, Award, Clock,
  ChevronRight, Play, TrendingUp, Shield, Zap, Code2
} from "lucide-react"

async function getData() {
  const [courses, testimonials] = await Promise.all([
    prisma.course.findMany({ where: { published: true }, orderBy: { featured: "desc" }, take: 6 }),
    prisma.testimonial.findMany({ take: 5 }),
  ])
  return { courses, testimonials }
}

const stats = [
  { label: "Active Students", value: "4,000+", icon: Users, color: "#6C63FF" },
  { label: "Expert Courses", value: "6+", icon: BookOpen, color: "#43BCCD" },
  { label: "Completion Rate", value: "94%", icon: Award, color: "#FFD700" },
  { label: "Career Transitions", value: "1,200+", icon: TrendingUp, color: "#FF6584" },
]

const features = [
  { icon: Code2, title: "Industry-Led Curriculum", desc: "Courses designed by working professionals using the latest tools and technologies.", color: "#6C63FF" },
  { icon: Play, title: "Project-Based Learning", desc: "Build real portfolio projects from day one. Learn by doing, not just watching.", color: "#43BCCD" },
  { icon: Shield, title: "Certificate of Completion", desc: "Earn verified certificates recognized by top tech companies in Bangladesh and globally.", color: "#FFD700" },
  { icon: Zap, title: "Career Support", desc: "Job placement assistance, resume reviews, and direct connections to hiring companies.", color: "#FF6584" },
]

export default async function HomePage() {
  const { courses, testimonials } = await getData()

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* HERO SECTION */}
      <section style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        background: "var(--gradient-hero)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "6rem",
      }}>
        {/* Orbs */}
        <div className="hero-orb orb-purple" style={{ width: 600, height: 600, top: -200, left: -150 }} />
        <div className="hero-orb orb-cyan" style={{ width: 400, height: 400, bottom: -100, right: -100 }} />
        <div className="hero-orb orb-pink" style={{ width: 300, height: 300, top: "30%", right: "10%" }} />

        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `repeating-linear-gradient(0deg, #6C63FF 0, #6C63FF 1px, transparent 1px, transparent 60px),
                            repeating-linear-gradient(90deg, #6C63FF 0, #6C63FF 1px, transparent 1px, transparent 60px)`,
          backgroundSize: "60px 60px",
        }} />

        <div className="container-custom" style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            {/* Left: Text */}
            <div className="animate-fade-in-up">
              <div className="badge badge-primary" style={{ marginBottom: "1.5rem" }}>
                🎓 Bangladesh's #1 Tech School
              </div>

              <h1 style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                color: "#F0F0FF",
              }}>
                Learn Tech.{" "}
                <span className="gradient-text">Build Skills.</span>
                <br />
                Transform Your{" "}
                <span className="gradient-text">Career.</span>
              </h1>

              <p style={{
                color: "#A0A0C0", fontSize: "1.1rem",
                lineHeight: 1.8, marginBottom: "2.5rem",
                maxWidth: 520,
              }}>
                Join <strong style={{ color: "#F0F0FF" }}>4,000+ students</strong> learning Python, DevOps, AI Agents,
                n8n Automation, Data Analysis, and Power BI from industry experts.
                Start your tech journey today.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
                <Link href="/courses" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}>
                  Explore Courses <ArrowRight size={18} />
                </Link>
                <Link href="/about" className="btn-secondary" style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}>
                  <Play size={16} /> Watch Demo
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                {[
                  { value: "4.9★", label: "Average Rating" },
                  { value: "100%", label: "Online Learning" },
                  { value: "Lifetime", label: "Course Access" },
                ].map((b) => (
                  <div key={b.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#F0F0FF", fontFamily: "Outfit" }}>{b.value}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6060A0" }}>{b.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Course cards preview */}
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {courses.slice(0, 4).map((course, i) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    transform: i % 2 === 1 ? "translateY(1.5rem)" : "none",
                  }}
                >
                  <div className="glass-card" style={{ padding: "1.25rem", cursor: "pointer" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "10px",
                      background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "0.75rem"
                    }}>
                      <BookOpen size={20} color="white" />
                    </div>
                    <h4 style={{
                      fontFamily: "Outfit", fontWeight: 700, fontSize: "0.85rem",
                      color: "#F0F0FF", marginBottom: "0.4rem", lineHeight: 1.3
                    }}>
                      {course.title}
                    </h4>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.8rem", color: "#6C63FF", fontWeight: 700 }}>
                        {formatPrice(course.price)}
                      </span>
                      <div style={{ display: "flex", gap: "2px" }}>
                        <Star size={12} fill="#FFD700" color="#FFD700" />
                        <span style={{ fontSize: "0.7rem", color: "#A0A0C0" }}>{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{
        background: "linear-gradient(135deg, #12121A, #1A1A28)",
        borderTop: "1px solid rgba(108,99,255,0.1)",
        borderBottom: "1px solid rgba(108,99,255,0.1)",
      }}>
        <div className="container-custom" style={{ padding: "3rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "14px",
                  background: `rgba(${stat.color === "#6C63FF" ? "108,99,255" : stat.color === "#43BCCD" ? "67,188,205" : stat.color === "#FFD700" ? "255,215,0" : "255,101,132"}, 0.15)`,
                  border: `1px solid ${stat.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1rem"
                }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
                <div style={{
                  fontSize: "2.2rem", fontWeight: 900,
                  fontFamily: "Outfit", color: "#F0F0FF", lineHeight: 1
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#6060A0", marginTop: "0.4rem" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="section">
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="badge badge-primary" style={{ marginBottom: "1rem" }}>📚 Our Courses</div>
            <h2 style={{
              fontFamily: "Outfit", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800, color: "#F0F0FF", marginBottom: "1rem"
            }}>
              Courses Designed for{" "}
              <span className="gradient-text">Real Careers</span>
            </h2>
            <p style={{ color: "#A0A0C0", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Every course is crafted by industry professionals with real-world experience.
              Learn the skills companies are actively hiring for.
            </p>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card" style={{
                  overflow: "hidden", cursor: "pointer",
                  transition: "all 0.3s ease",
                }}>
                  {/* Course Image */}
                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(10,10,15,0.9), transparent)",
                    }} />
                    {course.featured && (
                      <div className="badge badge-gold" style={{
                        position: "absolute", top: 12, right: 12
                      }}>
                        ⭐ Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <span className="badge badge-primary" style={{ fontSize: "0.7rem" }}>{course.category}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Star size={13} fill="#FFD700" color="#FFD700" />
                        <span style={{ fontSize: "0.8rem", color: "#A0A0C0", fontWeight: 600 }}>{course.rating}</span>
                      </div>
                    </div>

                    <h3 style={{
                      fontFamily: "Outfit", fontWeight: 700, fontSize: "1.05rem",
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

                    <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
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
                        <div style={{ fontSize: "0.75rem", color: "#6060A0" }}>One-time payment</div>
                      </div>
                      <div style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        color: "#6C63FF", fontWeight: 600, fontSize: "0.85rem"
                      }}>
                        Enroll Now <ChevronRight size={15} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/courses" className="btn-secondary" style={{ fontSize: "0.95rem" }}>
              View All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section" style={{ background: "linear-gradient(180deg, transparent, rgba(108,99,255,0.04), transparent)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="badge badge-primary" style={{ marginBottom: "1rem" }}>✨ Why Us</div>
            <h2 style={{ fontFamily: "Outfit", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#F0F0FF" }}>
              Why <span className="gradient-text">Mamun Tech School?</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {features.map((f) => (
              <div key={f.title} className="glass-card" style={{ padding: "2rem" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "14px",
                  background: `${f.color}20`,
                  border: `1px solid ${f.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem"
                }}>
                  <f.icon size={26} color={f.color} />
                </div>
                <h3 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1.05rem", color: "#F0F0FF", marginBottom: "0.6rem" }}>
                  {f.title}
                </h3>
                <p style={{ color: "#6060A0", fontSize: "0.875rem", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="badge badge-gold" style={{ marginBottom: "1rem" }}>⭐ Student Stories</div>
            <h2 style={{ fontFamily: "Outfit", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#F0F0FF" }}>
              What Our <span className="gradient-text">Students Say</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {testimonials.map((t) => (
              <div key={t.id} className="glass-card" style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "1rem" }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                  ))}
                </div>
                <p style={{
                  color: "#C0C0E0", fontSize: "0.9rem", lineHeight: 1.8,
                  marginBottom: "1.25rem", fontStyle: "italic"
                }}>
                  "{t.text}"
                </p>
                <div style={{ borderTop: "1px solid rgba(108,99,255,0.1)", paddingTop: "1rem" }}>
                  <div style={{ fontWeight: 700, color: "#F0F0FF", fontSize: "0.9rem" }}>{t.name}</div>
                  <div style={{ color: "#6C63FF", fontSize: "0.8rem", marginTop: "2px" }}>{t.role}</div>
                  <div style={{ color: "#6060A0", fontSize: "0.75rem", marginTop: "2px" }}>
                    📚 {t.course}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section">
        <div className="container-custom">
          <div style={{
            background: "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(67,188,205,0.15))",
            border: "1px solid rgba(108,99,255,0.25)",
            borderRadius: "28px",
            padding: "4rem 3rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div className="hero-orb orb-purple" style={{ width: 300, height: 300, top: -100, left: -100, opacity: 0.2 }} />
            <div className="hero-orb orb-cyan" style={{ width: 200, height: 200, bottom: -80, right: -80, opacity: 0.2 }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="badge badge-gold" style={{ marginBottom: "1.5rem" }}>🚀 Start Today</div>
              <h2 style={{
                fontFamily: "Outfit", fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900, color: "#F0F0FF", marginBottom: "1rem"
              }}>
                Ready to Start Your{" "}
                <span className="gradient-text">Tech Journey?</span>
              </h2>
              <p style={{ color: "#A0A0C0", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
                Join thousands of successful students who transformed their careers with Mamun Tech School.
                Your dream tech job is just one course away.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/courses" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2.5rem" }}>
                  Browse All Courses <ArrowRight size={18} />
                </Link>
                <Link href="/auth/signup" className="btn-gold" style={{ fontSize: "1rem", padding: "0.9rem 2.5rem" }}>
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
