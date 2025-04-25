import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      isCartOpen: false,
      dineOption: "",

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
          const item = state.cartItems.find((cartItem) => cartItem.id === id);

          if (item.quantity > 1) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.id === id
                  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                  : cartItem
              ),
            };
          } else {
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

      setDineOption: (option) => set({ dineOption: option }),
    }),
    {
      name: "cart-storage", // Key for localStorage
      partialize: (state) => ({
        cartItems: state.cartItems,
        dineOption: state.dineOption,
      }),
    }
  )
);

export default useCartStore;
