import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFood } from '../../models/IFood';
import { fetchFood } from './ActionCreaters';
import { ICart } from '../../models/ICart';
import { IFavorites } from '../../models/IFavorites';

interface FoodState {
  food: IFood[];
  cart: ICart[];
  favorites: IFavorites[];
  search: IFood[];
  isLoading: boolean;
  error: string;
}

const initialState: FoodState = {
  food: [],
  cart: [],
  favorites: [],
  search: [],
  isLoading: false,
  error: '',
};

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IFood>) {
      const existingFood = state.cart.find(item => item.id === action.payload.id);
      if (existingFood != null) {
        existingFood.count += 1;
        existingFood.total += existingFood.price;
      } else {
        state.cart.push({
          ...action.payload,
          count: 1,
          total: action.payload.price,
          sale: action.payload.type === 'sale' ? 50 : 0,
        });
      }
    },
    removeToCart(state, action) {
      const existingFood = state.cart.find(item => item.id === action.payload.id);
      if (existingFood != null) {
        if (existingFood.count > 1) {
          existingFood.count -= 1;
          existingFood.total -= existingFood.price;
        } else {
          state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
      }
    },
    toggleToFavorites(state, action: PayloadAction<IFood>) {
      const currentProduct = state.food.find(item => item.id === action.payload.id);
      const existingFood = state.favorites.find(item => item.id === action.payload.id);
      if (existingFood != null && currentProduct != null) {
        state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
      } else if (existingFood == null && currentProduct != null) {
        state.favorites.push({ ...action.payload, isLike: true });
      }
    },
    handleSearch(state, action: PayloadAction<string>) {
      console.log(state.food.filter(item => item.name.includes(action.payload)));
      state.search = state.food.filter(item =>
        item.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFood.fulfilled, (state, action: PayloadAction<IFood[]>) => {
        state.isLoading = false;
        state.error = '';
        state.food = action.payload;
      })
      .addCase(fetchFood.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Произошла ошибка';
      });
  },
});

export const { addToCart, removeToCart, toggleToFavorites, handleSearch } = foodSlice.actions;

export default foodSlice.reducer;
