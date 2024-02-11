import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFood } from "../../models/IFood";
import { fetchFood } from "./ActionCreaters";

interface FoodState {
  food: IFood[],
  isLoading: boolean,
  error: string
}

const initialState: FoodState = {
  food: [],
  isLoading: false,
  error: '',
}


export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
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

export default foodSlice.reducer;