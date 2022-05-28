export class User{
    email: String;
    password: String;
    profilePicture: string;

    constructor(email: String, password: String){
        this.email = email,
        this.password = password
    }
}