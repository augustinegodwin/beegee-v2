import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Define the Cart Item structure
  interface CartItem {
    product: Product;
    quantity: number;
    subtotal: number;
  }

type ProductState = {
  // --- YOUR ORIGINAL STATE ---
  products: Product[];
  selectedProduct: Product | null;
  searchQuery: boolean;
  isLoading: boolean;

  // --- NEW CART STATE ---
  cartItems: CartItem[];

  // --- YOUR ORIGINAL SETTERS ---
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSearchQuery: (query: boolean) => void;
  setLoading: (loading: boolean) => void;
  clearProducts: () => void;
  clearSearch: () => void;

  // --- NEW CART ACTIONS ---
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      // --- INITIAL STATE ---
      products: [],
      selectedProduct: null,
      searchQuery: false,
      isLoading: false,
      cartItems: [],

      // --- YOUR ORIGINAL LOGIC ---
      setProducts: (products) => set({ products }),

      // MODIFIED: When selectedProduct is set to null, clear the cart too
      setSelectedProduct: (product) => {
        set({ selectedProduct: product });
        if (product === null) {
          set({ cartItems: [] });
        }
      },

      setSearchQuery: (query) => set({ searchQuery: query }),
      setLoading: (loading) => set({ isLoading: loading }),
      clearProducts: () => set({ products: [] }),
      clearSearch: () => set({ searchQuery: false }),

      addToCart: (product, quantity) => {
  // We ignore the currentCart completely because we want a total replacement
  set({
    cartItems: [
      { 
        product, 
        quantity, 
        subtotal: product.price * quantity 
      }
    ]
  });
},

      removeFromCart: (productId) => {
        set({
          cartItems: get().cartItems.filter((item) => item.product._id !== productId)
        });
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'product-storage', // Key for LocalStorage
      storage: createJSONStorage(() => localStorage),
      // Optional: Only persist the cart if you don't want to save the whole store
      partialize: (state) => ({ cartItems: state.cartItems }), 
    }
  )
);