"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useCart } from "@/store/cart"
import {
  BookOpen, ShoppingCart, Menu, X, ChevronDown, User,
  LayoutDashboard, LogOut, GraduationCap, Settings, Shield
} from "lucide-react"

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Facilities", href: "/facilities" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const { data: session } = useSession()
  const cart = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const cartCount = cart.itemCount()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const isAdmin = (session?.user as any)?.role === "ADMIN"

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(10, 10, 15, 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(108, 99, 255, 0.15)"
          : "none",
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
      }}
    >
      <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "10px",
            background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <GraduationCap size={22} color="white" />
          </div>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#F0F0FF", lineHeight: 1 }}>
              Mamun Tech
            </div>
            <div style={{ fontSize: "0.65rem", color: "#6C63FF", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
              School
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "0.5rem 0.9rem",
                color: "#A0A0C0",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              // onMouseEnter={(e) => {
              //   e.currentTarget.style.color = "#F0F0FF"
              //   e.currentTarget.style.background = "rgba(108, 99, 255, 0.1)"
              // }}
              // onMouseLeave={(e) => {
              //   e.currentTarget.style.color = "#A0A0C0"
              //   e.currentTarget.style.background = "transparent"
              // }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Cart */}
          <Link
            href="/cart"
            style={{
              position: "relative",
              width: 40, height: 40,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "10px",
              background: "rgba(108, 99, 255, 0.1)",
              border: "1px solid rgba(108, 99, 255, 0.2)",
              color: "#A0A0C0",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: -6, right: -6,
                width: 18, height: 18,
                background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
                borderRadius: "50%",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {session ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.4rem 0.75rem 0.4rem 0.4rem",
                  background: "rgba(108, 99, 255, 0.1)",
                  border: "1px solid rgba(108, 99, 255, 0.2)",
                  borderRadius: "50px",
                  cursor: "pointer",
                  color: "#F0F0FF",
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "linear-gradient(135deg, #6C63FF, #43BCCD)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <User size={14} color="white" />
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  {session.user?.name?.split(" ")[0]}
                </span>
                <ChevronDown size={14} color="#A0A0C0" />
              </button>

              {profileOpen && (
                <div
                  className="menu-open"
                  style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    background: "#1A1A28",
                    border: "1px solid rgba(108, 99, 255, 0.2)",
                    borderRadius: "14px",
                    padding: "0.5rem",
                    minWidth: 200,
                    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                    zIndex: 100,
                  }}
                >
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setProfileOpen(false)} style={{ ...dropdownItemStyle, color: "#FFD700" }}>
                      <Shield size={15} /> Admin Dashboard
                    </Link>
                  )}
                  <Link href="/dashboard" onClick={() => setProfileOpen(false)} style={dropdownItemStyle}>
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>
                  <Link href="/my-courses" onClick={() => setProfileOpen(false)} style={dropdownItemStyle}>
                    <BookOpen size={15} /> My Courses
                  </Link>
                  <Link href="/profile" onClick={() => setProfileOpen(false)} style={dropdownItemStyle}>
                    <Settings size={15} /> Profile
                  </Link>
                  <hr style={{ borderColor: "rgba(108,99,255,0.15)", margin: "0.4rem 0" }} />
                  <button
                    onClick={() => { signOut({ callbackUrl: "/" }); setProfileOpen(false) }}
                    style={{ ...dropdownItemStyle, width: "100%", cursor: "pointer", color: "#FF6584" }}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/auth/signin" className="btn-secondary" style={{ padding: "0.5rem 1.1rem", fontSize: "0.85rem" }}>
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn-primary" style={{ padding: "0.5rem 1.1rem", fontSize: "0.85rem" }}>
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "rgba(108, 99, 255, 0.1)",
              border: "1px solid rgba(108, 99, 255, 0.2)",
              borderRadius: "8px",
              padding: "0.5rem",
              cursor: "pointer",
              color: "#F0F0FF",
            }}
            className="mobile-toggle"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="menu-open"
          style={{
            background: "#0A0A0F",
            borderTop: "1px solid rgba(108, 99, 255, 0.15)",
            padding: "1rem 1.5rem 1.5rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 0",
                color: "#A0A0C0",
                textDecoration: "none",
                borderBottom: "1px solid rgba(108,99,255,0.07)",
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            {!session ? (
              <>
                <Link href="/auth/signin" className="btn-secondary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link href="/auth/signup" className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </>
            ) : (
              <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                <LogOut size={15} /> Sign Out
              </button>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

const dropdownItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  padding: "0.6rem 0.8rem",
  borderRadius: "8px",
  color: "#A0A0C0",
  textDecoration: "none",
  fontSize: "0.875rem",
  fontWeight: 500,
  transition: "all 0.15s ease",
  background: "transparent",
  border: "none",
  width: "100%",
  textAlign: "left" as const,
}
