import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../entities/User";
import axios from "axios";


//firebase REST API key
const key = 'AIzaSyBCnXBC9iOMKphzZZtEncYvUWohTDB1C5E'

//interfaces
import { Error } from "../../interfaces/Error";
import { Success } from "../../interfaces/Success";

//extra async reducer function, takes a user in and returns either error or FirebaseSuccess object
//thunkApi, is used to rejectWithValue
export const signin: any = createAsyncThunk('user/signin', async (user: User, thunkApi) => {

    //url for the Rest Api sign in with email and pass
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+key;
    //post method, takes email, passsword, and returSecureToken(always true) in body payload
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
    }
        const response = await fetch(url, options);
        const data = await response.json();
       

        if (response.status === 400){
            return thunkApi.rejectWithValue( data as Error)
        }   
        else{
            return ({data, user} as Success);
        }
})

export const signup: any = createAsyncThunk('user/signup', async (user: User, thunkApi) => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+key;
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
    }

    const response = await fetch(url, options);
    const data = await response.json();
   

    if (response.status === 400){
        return thunkApi.rejectWithValue( data as Error)
    }   
    else{
        await axios.put('https://myapp-567d6-default-rtdb.europe-west1.firebasedatabase.app/members/'+data?.localId+'.json', {email: user.email});

        return ({data, user} as Success);
    }
})

export const resetPassword: any = createAsyncThunk('user/resetPassword', async (email: string, thunkApi) => {

    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='+key;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application'
        },
        body: JSON.stringify({requestType: 'PASSWORD_RESET',  email: email})
    
    })
    const data = await response.json();
    
    if(response.status === 400){
        return thunkApi.rejectWithValue(data as Error);
    }
    else{
        return (data);
    }
})

/**
 * This sends a verfication link to the email of the newly created user
 * the created user has a field email_verified, this can be used to ensure the account belongs
 * to a real person, and to prevent the overflow of inactive users
 * extra functions
 */
 export async function sendVerificationEmail(idToken: string){
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='+key;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: idToken
        })
    })
    const data = await response.json();
    

    if(response.status === 400){
        return (data) as Error;
    }
    else{
        return (data);
    }

}