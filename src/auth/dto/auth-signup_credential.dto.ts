import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserStatus } from "../user-status.enum";

export class SignUpCredentialDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(4)
    username:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:"Password too weak!"})
    password:string;

}