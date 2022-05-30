import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../entities/User";
import { Auth } from "../../entities/Auth"
import { useAppSelector } from "../../hooks/reduxHook";

import { signin, signup, resetPassword, sendVerificationEmail } from "../thunks/userThunk";

//it is important to define the shape of the data
//with ts it is done with interface
import { Error } from "../../interfaces/Error";
import { Success } from "../../interfaces/Success";


interface userState{
    user: User,
    auth: Auth,
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
    user: {} as User,
    auth: {} as Auth,
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
            state.user = {} as User
            state.auth = {} as Auth
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
        builder.addCase(signin.fulfilled, (state, action: PayloadAction<Success>) => {
            const payload = action.payload;
            state.auth = new Auth (payload.data.idToken, payload.data.refreshToken, payload.data.localId, payload.data.expiresIn);
            state.user = new User (payload.user.email, payload.user.password, payload.data.profilePicture);
            state.loggedIn = true;
            state.loading = false;
        }),
        builder.addCase(signin.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(signin.rejected, (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.error.message;
        }),


        //  SIGN UP
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<Success>) => {
            const payload = action.payload;
     
            state.auth = new Auth (payload.data.idToken, payload.data.refreshToken, payload.data.localId, payload.data.expiresIn);
            state.user = new User (payload.user.email, payload.user.password);

            // const result = sendVerificationEmail(state.idToken);
          
            state.loggedIn = true;
            state.loading = false;
            
        }),
        builder.addCase(signup.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(signup.rejected, (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.error.message;
            
        }),
        builder.addCase(resetPassword.fulfilled, (state) => {

            state.notification = 'Nulstillings mail Sendt'
        }),
        builder.addCase(resetPassword.rejected, (state) => {
            state.error = 'Kunne ikke send gendannelses mail, prøv igen senere '
        })

        builder.addCase('user/errorReset', (state) => {state.error = undefined; state.notification = undefined})
    }
})


export const {  signout } = user.actions;
export default user.reducer;