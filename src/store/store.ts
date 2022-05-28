import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import App from "./slices/appSlice";
import User from "./slices/userSlice";

const store = configureStore({
    reducer: {
        app: App,
        user: User,
    },
    middleware: [thunk]
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;