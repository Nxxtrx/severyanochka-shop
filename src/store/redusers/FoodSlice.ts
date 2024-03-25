import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFood } from "../../models/IFood";
import { fetchFood } from "./ActionCreaters";
import { ICart } from "../../models/ICart";
import { IFavorites } from "../../models/IFavorites";

interface FoodState {
  food: IFood[],
  cart: ICart[],
  favorites: IFavorites[]
  isLoading: boolean,
  error: string
}

const initialState: FoodState = {
  food: [],
  cart: [],
  favorites: [],
  isLoading: false,
  error: '',
}


export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingFood = state.cart.find(item => item.id === action.payload.id);
      if (existingFood) {
        existingFood.count += 1;
        existingFood.total += existingFood.price
      } else {
        state.cart.push({ ...action.payload, count: 1, total: action.payload.price, sale: action.payload.type === 'sale' ? 50 : 0 });
        
      }
    },
    removeToCart(state, action) {
      const existingFood = state.cart.find(item => item.id === action.payload.id);
      if (existingFood) {
        if (existingFood.count > 1) {
          existingFood.count -= 1;
          existingFood.total -= existingFood.price
        } else {
          state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
      }
    },
    toggleToFavorites(state, action) {
      console.log(action.payload)
      const currentProduct = state.food.find(item => item.id === action.payload.id)
      const existingFood = state.favorites.find(item => item.id === action.payload.id)
      console.log(currentProduct?.isLike)
      if(existingFood && currentProduct) {
      } else if(!existingFood && currentProduct){
        state.favorites.push({...action.payload, isLike: true})
      }
    },
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

export const {addToCart, removeToCart, toggleToFavorites} = foodSlice.actions

export default foodSlice.reducer;