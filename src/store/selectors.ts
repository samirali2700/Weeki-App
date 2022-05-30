import { RootState } from "./store";


export const getUser = (state: RootState) => state.user;
export const isLoggedIn = (state: RootState) => state.user.loggedIn;

