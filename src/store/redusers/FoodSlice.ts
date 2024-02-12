import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFood } from "../../models/IFood";
import { fetchFood } from "./ActionCreaters";
import { ICart } from "../../models/ICart";

interface FoodState {
  food: IFood[],
  cart: ICart[]
  isLoading: boolean,
  error: string
}

const initialState: FoodState = {
  food: [],
  cart: [],
  isLoading: false,
  error: '',
}


export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    addToCart(state, action) {
      // Проверяем, есть ли товар уже в корзине
      const existingFood = state.cart.find(item => item.id === action.payload.id);
      if (existingFood) {
        existingFood.count += 1;
      } else {
        state.cart.push({ ...action.payload, count: 1 });
      }
    },
    removeToCart(state, action) {
      const existingFood = state.cart.find(item => item.id === action.payload.id);
      if (existingFood) {
        if (existingFood.count > 1) {
          existingFood.count -= 1;
        } else {
          // Если count равен 1, удаляем товар из корзины
          state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFood.fulfilled, (state, action: PayloadAction<IFood[]>) => {
        state.isLoading = false;
        state.error = '';
        state.food = action.payload
      })
      .addCase(fetchFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFood.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.error.message ?? 'Произошла ошибка';
      })
  },
});

export const {addToCart, removeToCart} = foodSlice.actions

export default foodSlice.reducer;