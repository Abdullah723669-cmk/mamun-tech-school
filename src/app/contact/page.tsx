"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import toast from "react-hot-toast"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })

      if (res.ok) {
        toast.success("Message sent! We'll reply within 24 hours.")
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
      } else {
        toast.error("Failed to send message")
      }
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

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
            📞 Get in Touch
          </div>
          <h1 style={{ fontFamily: "Outfit", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#F0F0FF", marginBottom: "1.25rem" }}>
            We'd Love to <span className="gradient-text">Hear From You</span>
          </h1>
          <p style={{ color: "#A0A0C0", maxWidth: 600, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.8 }}>
            Have questions about course admissions, curriculum, or custom corporate training? Drop us a message.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "3rem", alignItems: "flex-start" }}>
            {/* Contact Details Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className="glass-card" style={{ padding: "1.75rem", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                <div style={{ width: 50, height: 50, borderRadius: "12px", background: "rgba(108, 99, 255, 0.15)", border: "1px solid rgba(108, 99, 255, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={24} color="#6C63FF" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.1rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.25rem" }}>
                    Campus Location
                  </h3>
                  <p style={{ color: "#A0A0C0", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    House 12, Road 5, Banani, Dhaka 1213, Bangladesh
                  </p>
                </div>
              </div>

              <div className="glass-card" style={{ padding: "1.75rem", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                <div style={{ width: 50, height: 50, borderRadius: "12px", background: "rgba(67, 188, 205, 0.15)", border: "1px solid rgba(67, 188, 205, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Mail size={24} color="#43BCCD" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.1rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.25rem" }}>
                    Email Support
                  </h3>
                  <p style={{ color: "#A0A0C0", fontSize: "0.9rem" }}>
                    info@mamuntechschool.com
                  </p>
                </div>
              </div>

              <div className="glass-card" style={{ padding: "1.75rem", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                <div style={{ width: 50, height: 50, borderRadius: "12px", background: "rgba(255, 215, 0, 0.15)", border: "1px solid rgba(255, 215, 0, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Phone size={24} color="#FFD700" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.1rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.25rem" }}>
                    Phone Helpline
                  </h3>
                  <p style={{ color: "#A0A0C0", fontSize: "0.9rem" }}>
                    +880 1700-000000 (Sat-Thu 10am-8pm)
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="glass-card" style={{ padding: "2.5rem" }}>
              <h2 style={{ fontFamily: "Outfit", fontSize: "1.5rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "1.5rem" }}>
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mamun Rashid"
                    className="input"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="input"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Course Inquiry / Admission"
                    className="input"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="input"
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "0.85rem", marginTop: "0.5rem" }}
                >
                  {loading ? "Sending..." : "Send Message"} <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
