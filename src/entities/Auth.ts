export class Auth {
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;

    constructor(idToken: string, refreshToken: string, localId: string, expiresIn: string){
        this.idToken = idToken;
        this.localId = localId;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
    }

}