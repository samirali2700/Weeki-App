import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import App from "./slices/appSlice";

const store = configureStore({
    reducer: {
        app: App
    },
    middleware: [thunk]
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;