import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInCredentialDto{
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()   
    password:string;
}