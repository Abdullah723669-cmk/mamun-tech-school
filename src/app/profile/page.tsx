"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { User, Mail, Phone, MapPin, Shield, Save } from "lucide-react"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [bio, setBio] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "")
      setEmail(session.user.email || "")
    }
  }, [session])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, bio, address }),
      })

      if (!res.ok) {
        toast.error("Failed to update profile")
      } else {
        toast.success("Profile updated successfully")
        update({ name })
      }
    } catch (err) {
      toast.error("Error updating profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="container-custom" style={{ maxWidth: 720 }}>
        <h1 style={{ fontFamily: "Outfit", fontSize: "2rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "2rem" }}>
          User Profile
        </h1>

        <div className="glass-card" style={{ padding: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem", borderBottom: "1px solid rgba(108, 99, 255, 0.15)", paddingBottom: "1.5rem" }}>
            <div style={{
              width: 70, height: 70, borderRadius: "50%",
              background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.8rem", fontWeight: 800, color: "white"
            }}>
              {name.charAt(0) || "U"}
            </div>
            <div>
              <h2 style={{ fontFamily: "Outfit", fontSize: "1.3rem", fontWeight: 700, color: "#F0F0FF" }}>
                {name || "User Name"}
              </h2>
              <div style={{ color: "#6060A0", fontSize: "0.85rem", marginTop: "2px" }}>
                {email}
              </div>
              <span className="badge badge-primary" style={{ fontSize: "0.65rem", marginTop: "0.4rem" }}>
                {(session?.user as any)?.role || "STUDENT"}
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                Email Address (Read-only)
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="input"
                style={{ opacity: 0.6, cursor: "not-allowed" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1700-000000"
                className="input"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                Bio / About You
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a bit about your tech background and goals..."
                className="input"
                style={{ resize: "vertical" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Dhaka, Bangladesh"
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: "fit-content", padding: "0.8rem 2rem", marginTop: "1rem" }}
            >
              <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
