"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import { Trash2, ArrowRight, ShoppingCart, ShieldCheck } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart()

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem 3rem" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{
            width: 70, height: 70, borderRadius: "50%",
            background: "rgba(108, 99, 255, 0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.5rem"
          }}>
            <ShoppingCart size={32} color="#6C63FF" />
          </div>
          <h1 style={{ fontFamily: "Outfit", fontSize: "1.75rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "0.5rem" }}>
            Your Cart is Empty
          </h1>
          <p style={{ color: "#A0A0C0", fontSize: "0.95rem", marginBottom: "2rem" }}>
            Looks like you haven't added any courses yet. Explore our courses to get started!
          </p>
          <Link href="/courses" className="btn-primary" style={{ padding: "0.8rem 2rem" }}>
            Browse Courses <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="container-custom">
        <h1 style={{ fontFamily: "Outfit", fontSize: "2rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "2rem" }}>
          Shopping Cart ({items.length})
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "flex-start" }}>
          {/* Cart Items List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {items.map((item) => (
              <div key={item.id} className="card" style={{ padding: "1.25rem", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                <div style={{ position: "relative", width: 100, height: 65, borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.25rem" }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: "0.8rem", color: "#6060A0" }}>
                    Instructor: {item.instructor} • Duration: {item.duration}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#6C63FF", fontFamily: "Outfit", marginBottom: "0.4rem" }}>
                    {formatPrice(item.price)}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: "none", border: "none", color: "#FF6584", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", marginLeft: "auto" }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
              <button
                onClick={clearCart}
                style={{ background: "none", border: "none", color: "#A0A0C0", cursor: "pointer", fontSize: "0.85rem" }}
              >
                Clear Cart
              </button>
              <Link href="/courses" style={{ color: "#6C63FF", fontSize: "0.85rem", textDecoration: "none", fontWeight: 600 }}>
                ← Add More Courses
              </Link>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "Outfit", fontSize: "1.2rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "1.25rem" }}>
              Order Summary
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#A0A0C0" }}>
                <span>Subtotal</span>
                <span>{formatPrice(total())}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#22c55e" }}>
                <span>Discount</span>
                <span>৳0</span>
              </div>
              <div style={{ borderTop: "1px solid rgba(108, 99, 255, 0.15)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", fontSize: "1.1rem", fontWeight: 800, color: "#F0F0FF" }}>
                <span>Total</span>
                <span style={{ color: "#6C63FF" }}>{formatPrice(total())}</span>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem" }}>
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center", marginTop: "1.25rem", color: "#6060A0", fontSize: "0.75rem" }}>
              <ShieldCheck size={16} color="#22c55e" /> 256-Bit SSL Encrypted Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
