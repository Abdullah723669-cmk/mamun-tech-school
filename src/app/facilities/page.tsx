import Link from "next/link"
import { Cpu, Server, MessageSquare, Briefcase, Award, Monitor, ShieldCheck, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Facilities & Infrastructure — Mamun Tech School",
  description: "Explore our modern learning environment, live cloud sandbox labs, 24/7 student discord community, and career support.",
}

const facilities = [
  {
    icon: Monitor,
    title: "Interactive HD Video Learning",
    desc: "Crystal clear 4K video lectures with code callouts, downloadable source files, and exercise workbooks.",
    color: "#6C63FF"
  },
  {
    icon: Server,
    title: "Cloud Sandbox & Server Access",
    desc: "Hands-on AWS and Linux virtual machine environments pre-configured for DevOps and server deployment labs.",
    color: "#43BCCD"
  },
  {
    icon: Cpu,
    title: "AI & Automation Lab Access",
    desc: "Access to self-hosted n8n workflow instances, vector databases, and LLM APIs for AI agent building.",
    color: "#FFD700"
  },
  {
    icon: MessageSquare,
    title: "24/7 Discord Tech Community",
    desc: "Get fast support from instructors and collaborate with peers in dedicated, active Discord channels.",
    color: "#FF6584"
  },
  {
    icon: Briefcase,
    title: "Career Placement Assistance",
    desc: "Resume reviews, mock technical interviews, and direct referrals to software companies in Bangladesh.",
    color: "#22c55e"
  },
  {
    icon: Award,
    title: "Verified QR Certificate",
    desc: "Shareable digital certificates with unique QR codes to easily demonstrate your skills on LinkedIn.",
    color: "#6C63FF"
  }
]

export default function FacilitiesPage() {
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
            🏢 World-Class Infrastructure
          </div>
          <h1 style={{ fontFamily: "Outfit", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#F0F0FF", marginBottom: "1.25rem" }}>
            Designed for <span className="gradient-text">Maximum Learning Success</span>
          </h1>
          <p style={{ color: "#A0A0C0", maxWidth: 680, margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.8 }}>
            We provide everything you need — from cloud server environments to 24/7 mentor support — to ensure you master modern technology.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {facilities.map((fac) => (
              <div key={fac.title} className="glass-card" style={{ padding: "2.25rem" }}>
                <div style={{
                  width: 54, height: 54, borderRadius: "14px",
                  background: `${fac.color}20`,
                  border: `1px solid ${fac.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem"
                }}>
                  <fac.icon size={26} color={fac.color} />
                </div>
                <h3 style={{ fontFamily: "Outfit", fontSize: "1.2rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.5rem" }}>
                  {fac.title}
                </h3>
                <p style={{ color: "#A0A0C0", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <Link href="/courses" className="btn-primary" style={{ padding: "0.9rem 2.5rem", fontSize: "1rem" }}>
              Explore Courses & Join Today <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
