"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import { CreditCard, Lock, ShieldCheck, CheckCircle2 } from "lucide-react"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseIds: items.map((i) => i.id),
          total: total(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message || "Payment failed")
      } else {
        toast.success("Payment successful! Enrolled in courses.")
        clearCart()
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      toast.error("Something went wrong with processing payment")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem" }}>
        <div style={{ textAlign: "center" }}>
          <h2>No items in cart to checkout</h2>
          <button onClick={() => router.push("/courses")} className="btn-primary" style={{ marginTop: "1rem" }}>
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="container-custom" style={{ maxWidth: 960 }}>
        <h1 style={{ fontFamily: "Outfit", fontSize: "2rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "2rem" }}>
          Secure Checkout
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "2rem", alignItems: "flex-start" }}>
          {/* Payment Form */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <CreditCard size={22} color="#6C63FF" />
              <h2 style={{ fontFamily: "Outfit", fontSize: "1.25rem", fontWeight: 700, color: "#F0F0FF" }}>
                Payment Details (Stripe Test Mode)
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Mamun Rashid"
                  className="input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                  Card Number (Use 4242... for test)
                </label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  className="input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="12/28"
                    className="input"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                    CVC / CVV
                  </label>
                  <input
                    type="text"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "0.9rem", marginTop: "1rem", fontSize: "1rem" }}
              >
                {loading ? "Processing..." : `Pay ${formatPrice(total())}`} <Lock size={16} />
              </button>
            </form>
          </div>

          {/* Items Summary */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "Outfit", fontSize: "1.1rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "1rem" }}>
              Courses ({items.length})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                  <span style={{ color: "#A0A0C0", flex: 1, paddingRight: "0.5rem" }} className="line-clamp-2">{item.title}</span>
                  <span style={{ color: "#F0F0FF", fontWeight: 600 }}>{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(108, 99, 255, 0.15)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: 800, color: "#F0F0FF" }}>
              <span>Total Due</span>
              <span style={{ color: "#6C63FF" }}>{formatPrice(total())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
