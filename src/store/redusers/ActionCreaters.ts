import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFood = createAsyncThunk('food/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await fetch('https://json-server-eight-nu.vercel.app/product').then(
      async res => await res.json(),
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
