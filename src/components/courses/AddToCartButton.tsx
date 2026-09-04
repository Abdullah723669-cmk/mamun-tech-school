"use client"

import { useCart, CartItem } from "@/store/cart"
import { ShoppingCart, Check } from "lucide-react"
import toast from "react-hot-toast"

interface AddToCartButtonProps {
  course: CartItem
}

export function AddToCartButton({ course }: AddToCartButtonProps) {
  const { addItem, hasItem } = useCart()
  const inCart = hasItem(course.id)

  const handleAdd = () => {
    if (inCart) {
      toast.success("Course is already in your cart!")
      return
    }
    addItem(course)
    toast.success(`${course.title} added to cart!`)
  }

  return (
    <button
      onClick={handleAdd}
      className={inCart ? "btn-secondary" : "btn-primary"}
      style={{
        width: "100%",
        justifyContent: "center",
        padding: "0.9rem",
        fontSize: "1rem",
      }}
    >
      {inCart ? (
        <>
          <Check size={18} color="#22c55e" /> In Cart
        </>
      ) : (
        <>
          <ShoppingCart size={18} /> Add to Cart
        </>
      )}
    </button>
  )
}
