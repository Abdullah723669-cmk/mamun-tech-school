"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react"
import toast from "react-hot-toast"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.message || "Registration failed")
      } else {
        toast.success("Account created successfully! Please sign in.")
        router.push("/auth/signin")
      }
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "6rem 1.5rem 3rem",
      background: "var(--gradient-hero)",
    }}>
      <div className="glass-card" style={{ width: "100%", maxWidth: "460px", padding: "2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 50, height: 50, borderRadius: "12px",
            background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1rem"
          }}>
            <GraduationCap size={28} color="white" />
          </div>
          <h1 style={{ fontFamily: "Outfit", fontSize: "1.75rem", fontWeight: 800, color: "#F0F0FF" }}>
            Create Account
          </h1>
          <p style={{ color: "#A0A0C0", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Join 4,000+ students at Mamun Tech School
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem", fontWeight: 500 }}>
              Full Name
            </label>
            <div style={{ position: "relative" }}>
              <User size={18} color="#6060A0" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="input"
                style={{ paddingLeft: "2.75rem" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem", fontWeight: 500 }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={18} color="#6060A0" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="input"
                style={{ paddingLeft: "2.75rem" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem", fontWeight: 500 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} color="#6060A0" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
                style={{ paddingLeft: "2.75rem", paddingRight: "2.75rem" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6060A0" }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem", fontWeight: 500 }}>
              Confirm Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} color="#6060A0" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
                style={{ paddingLeft: "2.75rem" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "0.85rem", marginTop: "0.5rem" }}
          >
            {loading ? "Creating Account..." : "Create Account"} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: "1.75rem", textAlign: "center", fontSize: "0.875rem", color: "#6060A0" }}>
          Already have an account?{" "}
          <Link href="/auth/signin" style={{ color: "#6C63FF", fontWeight: 600, textDecoration: "none" }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
