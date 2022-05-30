import { User } from "../entities/User";

interface Auth {
    idToken: string, 
    refreshToken: string,
    expiresIn: string, 
    localId: string,
    registered: boolean,
    profilePicture?: string,
}

export interface Success {
   data: Auth,
   user: User,
}