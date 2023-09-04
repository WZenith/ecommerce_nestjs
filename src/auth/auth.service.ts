import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { SignInCredentialDto } from './dto/signin_credential.dto';
import { UserRepository } from './user.repository';
import { SignUpCredentialDto } from './dto/auth-signup_credential.dto';

@Injectable()
export class AuthService {
    
    constructor(
    private userRepository:UserRepository){}

    async create(authCredentialDto: SignUpCredentialDto):Promise<User> {
        
        return await this.userRepository.create(authCredentialDto);
    }

    async findAllUser():Promise<User[]>{
        return await this.userRepository.findAllUser();
    }
    
    async findUserById(id:string):Promise<User>{
        return await this.userRepository.findUserById(id);
        
    }

    async signIn(authCredentialDto:SignInCredentialDto): Promise<any> {
        return await this.userRepository.signIn(authCredentialDto);
    }

    async deleteUserById(id:string){
       return await this.userRepository.deleteUserById(id);
    }

}

