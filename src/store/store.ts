import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postAPI } from "../services/PostServices";
import foodReducer from './redusers/FoodSlice';


const rootReducer =combineReducers({
  foodReducer,
  [postAPI.reducerPath]: postAPI.reducer
})

export const store = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(postAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']