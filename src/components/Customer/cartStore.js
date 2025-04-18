import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  isCartOpen: false,

  addToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
     
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),

  toggleCart: () =>
    set((state) => ({
      isCartOpen: !state.isCartOpen,
    })),

  closeCart: () => set({ isCartOpen: false }),
}));

export default useCartStore;
