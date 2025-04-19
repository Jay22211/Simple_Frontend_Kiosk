import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  isCartOpen: false,

  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (i) =>
          i.id === item.id &&
          i.size === item.size &&
          i.temperature === item.temperature
      );
  
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id &&
            i.size === item.size &&
            i.temperature === item.temperature
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
  
      return {
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
      };
    });
  },

  removeFromCart: (id) =>
    set((state) => {
      // Find the item in the cart
      const item = state.cartItems.find((cartItem) => cartItem.id === id);

      if (item.quantity > 1) {
        // If the item quantity is more than 1, just decrease the quantity
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        };
      } else {
        // If the item quantity is 1, remove it completely
        return {
          cartItems: state.cartItems.filter((cartItem) => cartItem.id !== id),
        };
      }
    }),

  clearCart: () => set({ cartItems: [] }),

  toggleCart: () =>
    set((state) => ({
      isCartOpen: !state.isCartOpen,
    })),

  closeCart: () => set({ isCartOpen: false }),
}));

export default useCartStore;
