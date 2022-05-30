export class User{
    email: String;
    password: String;
    profilePicture: string;

    constructor(email: String, password: String, profilePicture?: string){
        this.email = email,
        this.password = password,
        this.profilePicture = profilePicture;
    }
}