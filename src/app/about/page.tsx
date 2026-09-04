import Link from "next/link"
import { GraduationCap, Target, Users, Award, ShieldCheck, ArrowRight } from "lucide-react"

export const metadata = {
  title: "About Us — Mamun Tech School",
  description: "Learn about Mamun Tech School's mission, values, and expert instructors empowering tech talent in Bangladesh.",
}

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "5rem" }}>
      {/* Hero Header */}
      <section style={{
        background: "var(--gradient-hero)",
        padding: "5rem 0 4rem",
        borderBottom: "1px solid rgba(108, 99, 255, 0.15)",
        textAlign: "center"
      }}>
        <div className="container-custom">
          <div className="badge badge-primary" style={{ marginBottom: "1rem" }}>
            🏫 About Mamun Tech School
          </div>
          <h1 style={{ fontFamily: "Outfit", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#F0F0FF", marginBottom: "1.25rem" }}>
            Empowering the Next Generation of <span className="gradient-text">Tech Leaders</span>
          </h1>
          <p style={{ color: "#A0A0C0", maxWidth: 680, margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.8 }}>
            Mamun Tech School was founded with a single mission: to deliver practical, enterprise-grade tech education in Python, DevOps, AI, Automation, and Data Analytics.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            <div className="glass-card" style={{ padding: "2.5rem" }}>
              <div style={{ width: 50, height: 50, borderRadius: "12px", background: "rgba(108, 99, 255, 0.15)", border: "1px solid rgba(108, 99, 255, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <Target size={26} color="#6C63FF" />
              </div>
              <h2 style={{ fontFamily: "Outfit", fontSize: "1.4rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "0.75rem" }}>
                Our Mission
              </h2>
              <p style={{ color: "#A0A0C0", lineHeight: 1.8, fontSize: "0.95rem" }}>
                To bridge the gap between academic theory and real-world tech industry demands. We equip students with hands-on skills, active portfolio projects, and direct career guidance.
              </p>
            </div>

            <div className="glass-card" style={{ padding: "2.5rem" }}>
              <div style={{ width: 50, height: 50, borderRadius: "12px", background: "rgba(67, 188, 205, 0.15)", border: "1px solid rgba(67, 188, 205, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <Award size={26} color="#43BCCD" />
              </div>
              <h2 style={{ fontFamily: "Outfit", fontSize: "1.4rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "0.75rem" }}>
                Our Vision
              </h2>
              <p style={{ color: "#A0A0C0", lineHeight: 1.8, fontSize: "0.95rem" }}>
                To become Bangladesh's leading practical technology institute, fostering 10,000+ top-tier software engineers, AI specialists, and data professionals by 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Founder */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", alignItems: "center" }}>
            <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{
                width: 120, height: 120, borderRadius: "50%",
                background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "3rem", fontWeight: 800, color: "white", margin: "0 auto 1.5rem"
              }}>
                M
              </div>
              <h3 style={{ fontFamily: "Outfit", fontSize: "1.4rem", fontWeight: 800, color: "#F0F0FF" }}>
                Md. Abdullah Al Mamun 
              </h3>
              <p style={{ color: "#6C63FF", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                Founder & Lead Instructor
              </p>
              <p style={{ color: "#6060A0", fontSize: "0.85rem", lineHeight: 1.6 }}>
                Senior Engineer & Automation Specialist with 8+ years experience training over 2,000 students.
              </p>
            </div>

            <div>
              <div className="badge badge-gold" style={{ marginBottom: "1rem" }}>💡 Founder's Message</div>
              <h2 style={{ fontFamily: "Outfit", fontSize: "2rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "1.25rem" }}>
                "We don't just teach code — we build tech careers."
              </h2>
              <p style={{ color: "#A0A0C0", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                When I started Mamun Tech School, my goal was simple: eliminate boring, theoretical lectures and give students the exact skills top tech companies actually look for in Bangladesh and worldwide.
              </p>
              <p style={{ color: "#A0A0C0", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                Whether you're starting from scratch with Python, scaling cloud infrastructure with DevOps, or automating business workflows with n8n and AI agents — we're here to guide you step-by-step.
              </p>
              <Link href="/courses" className="btn-primary" style={{ padding: "0.8rem 2rem" }}>
                Start Learning Today <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
