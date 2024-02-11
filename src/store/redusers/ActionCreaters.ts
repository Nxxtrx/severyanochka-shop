import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFood = createAsyncThunk(
  'food/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3000/product').then(res => res.json())
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)