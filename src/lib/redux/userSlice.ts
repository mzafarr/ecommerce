
import { createSlice, nanoid } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  product: {
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
}

const initialState = {
  userName: "",
  cartItems: [] as CartItem[],
  // i want products to be like this:
  // {
  //   "laptop":{
  //      [<this will have array of type Product>]
  //   }
  //   "phone":{
  //      [<this will have array of type Product>]
  //   }
  //   "accessories":{
  //      [<this will have array of type Product>]
  //   }
  // }
  products: {} as Record<string, Product[]>,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload.userName;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload.cartItems;
    },
    addToCart: (state, action) => {
      const { product } = action.payload;
      const cartItem = state.cartItems.find(
        (item) => item.productId === product.id
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.cartItems.push({
          id: Math.random().toString(),
          productId: product.id,
          userId: "1",
          quantity: 1,
          product,
        });
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (cartItem) {
        cartItem.quantity -= 1;
      }
    },
    setProducts: (state, action) => {
      const { category, products } = action.payload;
      if (!state.products[category]) {
        state.products[category] = [];
      }
      state.products[category].push(...products);
    },
  },
});

export const { setUserName, setCartItems, addToCart, removeFromCart } = userSlice.actions;

export default userSlice.reducer;
