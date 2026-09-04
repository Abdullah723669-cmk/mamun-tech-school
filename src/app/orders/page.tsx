import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { formatPrice, formatDate } from "@/lib/utils"
import { ShoppingBag, CheckCircle } from "lucide-react"

export default async function OrdersPage() {
  const session = await auth()
  if (!session || !session.user?.id) redirect("/auth/signin")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      orderItems: {
        include: { course: true }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="container-custom">
        <h1 style={{ fontFamily: "Outfit", fontSize: "2rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "0.5rem" }}>
          Order History ({orders.length})
        </h1>
        <p style={{ color: "#A0A0C0", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
          Review your course purchases and payment receipts.
        </p>

        {orders.length === 0 ? (
          <div className="card" style={{ padding: "4rem 2rem", textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
            <ShoppingBag size={48} color="#6060A0" style={{ margin: "0 auto 1rem" }} />
            <h2 style={{ fontFamily: "Outfit", fontSize: "1.3rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.5rem" }}>
              No Orders Found
            </h2>
            <p style={{ color: "#6060A0", fontSize: "0.9rem" }}>
              You haven't purchased any courses yet.
            </p>
          </div>
        ) : (
          <div className="glass-card" style={{ overflow: "hidden", padding: "1.5rem" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Courses</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontFamily: "monospace", color: "#6C63FF", fontSize: "0.85rem" }}>
                      #{order.id.slice(-8)}
                    </td>
                    <td style={{ color: "#A0A0C0", fontSize: "0.85rem" }}>
                      {formatDate(order.createdAt)}
                    </td>
                    <td style={{ color: "#F0F0FF", fontSize: "0.9rem", fontWeight: 600 }}>
                      {order.orderItems.map((item) => item.course.title).join(", ")}
                    </td>
                    <td style={{ color: "#F0F0FF", fontWeight: 800, fontFamily: "Outfit" }}>
                      {formatPrice(order.total)}
                    </td>
                    <td>
                      <span className="badge badge-green" style={{ fontSize: "0.7rem" }}>
                        <CheckCircle size={12} style={{ marginRight: 4 }} /> {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
