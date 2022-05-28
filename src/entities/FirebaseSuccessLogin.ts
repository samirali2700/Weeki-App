

//blueprint of the object that is return upon successfull login with email and password
export class FirebaseSignupSuccess {
    constructor(public idToken: string, public email: string, public refreshToken: string,
        public expiresIn: string, public localId: string) {
    }
}

export interface FirebaseSuccessLogin {
    idToken: string, 
    email: string,
    refreshToken: string,
    expiresIn: string, 
    localId: string
}