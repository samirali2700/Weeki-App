import { createSlice } from "@reduxjs/toolkit";


interface appState {
    isLoading: boolean
}

const initialState: appState= {
    isLoading: false
}


const app = createSlice({
    name: 'App',
    initialState: initialState,
    reducers:{
        toggleLoading: (state) => {
            state.isLoading = !state.isLoading;
        }
    },
    extraReducers: function(builder) {},
})



//if any action: export const { action } = app.action;
export const { toggleLoading } = app.actions;
export default app.reducer;
