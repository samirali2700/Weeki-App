import { createSlice } from "@reduxjs/toolkit";


interface appState {
    showTab: boolean
}

const initialState: appState= {
    showTab: true
}


const app = createSlice({
    name: 'App',
    initialState: initialState,
    reducers:{
        toggleTab: (state) => {
            state.showTab = !state.showTab;
        }
    },
    extraReducers: function(builder) {},
})



//if any action: export const { action } = app.action;
export const { toggleTab } = app.actions;
export default app.reducer;
