import Link from "next/link"
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"

const courses = [
  { label: "Python Programming", href: "/courses/python" },
  { label: "DevOps Engineering", href: "/courses/devops" },
  { label: "AI Agent Creation", href: "/courses/ai-agents" },
  { label: "AI Automation with n8n", href: "/courses/n8n-automation" },
  { label: "Data Analysis with R", href: "/courses/data-analysis-r" },
  { label: "Power BI", href: "/courses/power-bi" },
]

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Facilities", href: "/facilities" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Student Dashboard", href: "/dashboard" },
  { label: "Admin Panel", href: "/admin" },
]

export function Footer() {
  return (
    <footer style={{ background: "#080810", borderTop: "1px solid rgba(108, 99, 255, 0.15)", marginTop: "auto" }}>
      {/* Main footer */}
      <div className="container-custom" style={{ padding: "4rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem" }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", marginBottom: "1rem" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "12px",
                background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <GraduationCap size={24} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#F0F0FF" }}>Mamun Tech School</div>
                <div style={{ fontSize: "0.65rem", color: "#6C63FF", fontWeight: 600, letterSpacing: "1px" }}>LEARN · BUILD · GROW</div>
              </div>
            </Link>
            <p style={{ color: "#6060A0", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Bangladesh's premier tech school empowering students with cutting-edge skills in Python, DevOps, AI, automation, and data science.
            </p>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Instagram, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} style={{
                  width: 36, height: 36, borderRadius: "8px",
                  background: "rgba(108, 99, 255, 0.1)",
                  border: "1px solid rgba(108, 99, 255, 0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#6060A0", textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                  // onMouseEnter={e => { e.currentTarget.style.color = "#6C63FF"; e.currentTarget.style.borderColor = "#6C63FF" }}
                  // onMouseLeave={e => { e.currentTarget.style.color = "#6060A0"; e.currentTarget.style.borderColor = "rgba(108,99,255,0.2)" }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#F0F0FF", marginBottom: "1.2rem", fontSize: "1rem" }}>
              Our Courses
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {courses.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} style={{
                    color: "#6060A0", textDecoration: "none", fontSize: "0.875rem",
                    transition: "color 0.2s ease",
                    display: "inline-block"
                  }}
                    // onMouseEnter={e => e.currentTarget.style.color = "#6C63FF"}
                    // onMouseLeave={e => e.currentTarget.style.color = "#6060A0"}
                  >
                    → {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#F0F0FF", marginBottom: "1.2rem", fontSize: "1rem" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{
                    color: "#6060A0", textDecoration: "none", fontSize: "0.875rem",
                    transition: "color 0.2s ease",
                  }}
                    // onMouseEnter={e => e.currentTarget.style.color = "#6C63FF"}
                    // onMouseLeave={e => e.currentTarget.style.color = "#6060A0"}
                  >
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#F0F0FF", marginBottom: "1.2rem", fontSize: "1rem" }}>
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <MapPin size={16} color="#6C63FF" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: "#6060A0", fontSize: "0.875rem", lineHeight: 1.5 }}>
                  Succeed Nazrul Castlle, Shoshan Road , Joydebpur, Gazipur 1700, Bangladesh
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Mail size={16} color="#6C63FF" />
                <a href="mailto:info@mamuntechschool.com" style={{ color: "#6060A0", fontSize: "0.875rem", textDecoration: "none" }}>
                  info@mamuntechschool.com
                </a>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Phone size={16} color="#6C63FF" />
                <a href="tel:+8801821406541" style={{ color: "#6060A0", fontSize: "0.875rem", textDecoration: "none" }}>
                  +880 1821-406541
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: "1.5rem" }}>
              <p style={{ color: "#A0A0C0", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.6rem" }}>NEWSLETTER</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    flex: 1, padding: "0.6rem 0.9rem",
                    background: "rgba(108, 99, 255, 0.08)",
                    border: "1px solid rgba(108, 99, 255, 0.2)",
                    borderRadius: "8px", color: "#F0F0FF",
                    fontSize: "0.8rem", outline: "none"
                  }}
                />
                <button style={{
                  padding: "0.6rem 0.9rem",
                  background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
                  border: "none", borderRadius: "8px",
                  color: "white", fontWeight: 600, fontSize: "0.8rem",
                  cursor: "pointer"
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(108, 99, 255, 0.1)",
        padding: "1.25rem 1.5rem",
      }}>
        <div className="container-custom" style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "0.5rem"
        }}>
          <p style={{ color: "#4040A0", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Mamun Tech School. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((t) => (
              <a key={t} href="#" style={{ color: "#4040A0", fontSize: "0.8rem", textDecoration: "none" }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
