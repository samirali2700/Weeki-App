import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseSignupSuccess, FirebaseSuccessLogin } from "../../entities/FirebaseSuccessLogin";
import { User } from "../../entities/User";
import { AppDispatch } from "../store";

import { signin, signup, resetPassword, sendVerificationEmail } from "../thunks/userThunk";

//it is important to define the shape of the data
//with ts it is done with interface
interface userState{
    loggedInUser: User,
    idToken: string | undefined,

    //loggedIn boolean derived from loggedInUser
    loggedIn: boolean,

    //loading will be a loading state for async functions, cause they may take time depending on network
    loading: boolean,

    //error will be global error, meaning will be for multiple error, and it will be promted to user when there is error
    error: string | undefined,
    notification: string | undefined,
}


//also a intialistate, defines the data value on init
const initialState: userState ={
    loggedInUser: {} as User,
    idToken: undefined,
    loggedIn: false,
    error: undefined,
    loading: false,
    notification: undefined,
}

const user = createSlice({
    name: 'USER',
    initialState: initialState,
    reducers: {
        signout: state => {
            state.loggedInUser = {} as User
            state.loggedIn = false
        }
    },
    extraReducers: function (builder){
        /**
         * there is 3 cases for each reducer
         * fulfilled, rejected and pending
         * pending is not neccessary but since we have a loading spinner 
         * it get enabled when the case is pending
         */

        //  SIGN IN
        builder.addCase(signin.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInUser = action.payload
            state.idToken = action.payload.idToken
            state.loggedIn = true;
        }),
        builder.addCase(signin.pending, (state) => {
            state.loading = true;
            console.log('inside dispatch')
        }),
        builder.addCase(signin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error.message;
        }),


        //  SIGN UP
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInUser = action.payload;
            state.idToken = action.payload.idToken;
            if(state.idToken !== undefined){
               // const result = sendVerificationEmail(state.idToken);
            }
            state.loggedIn = true;
            
        }),
        builder.addCase(signup.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error.message;
        }),
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.notification = 'Tjek din mail for hvordan du nulstiller din adgangskode'
        }),
        builder.addCase(resetPassword.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Kunne ikke send gendannelses mail, prøv igen senere '
        })

        builder.addCase('user/errorReset', (state) => {state.error = undefined; state.notification = undefined})
    }
})

export const {  signout } = user.actions;
export default user.reducer;