import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./slices/habitSlice"

const store = configureStore({
    reducer: {
        habit : habitReducer
    }
})


export default store