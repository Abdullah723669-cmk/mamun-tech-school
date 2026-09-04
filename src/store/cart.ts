import { create } from "zustand"

export interface CartItem {
  id: string
  title: string
  price: number
  image: string
  slug: string
  instructor: string
  duration: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
  hasItem: (id: string) => boolean
}

export const useCart = create<CartStore>()((set, get) => ({
  items: [],
  addItem: (item) => {
    if (!get().hasItem(item.id)) {
      set((state) => ({ items: [...state.items, item] }))
    }
  },
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price, 0),
  itemCount: () => get().items.length,
  hasItem: (id) => get().items.some((i) => i.id === id),
}))
