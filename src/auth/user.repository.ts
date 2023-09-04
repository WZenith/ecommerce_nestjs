import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignInCredentialDto } from './dto/signin_credential.dto';
import { SignUpCredentialDto } from './dto/auth-signup_credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from './user-status.enum';
import { UpdateStatusDto } from './dto/update-status.dto';


@Injectable()
export class UserRepository {
    entityManager: any;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,) { }

    async create(authCredentialDto: SignUpCredentialDto): Promise<User> {
        const {email,username,password}= authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        authCredentialDto.password = hashedPassword;

        const found_email = await this.userRepository.findOneBy({email});
        const found_username = await this.userRepository.findOneBy({username});
       
        if(found_email){
            throw new ConflictException("Email already existed! Use another one!")
        }
        if(found_username){
            throw new ConflictException("Username already existed! Make another one!")
        }

        const user = new User;

        user.username = username;
        user.email = email;
        user.password = hashedPassword;
        user.status = UserStatus.ACTIVE;       
        
        return await this.userRepository.save(user);
    }

    async findAllUser() {
        return await this.userRepository.find();
    }

    async findUserById(id: string) {
        const found = await this.userRepository.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`The user is not found with the id:${id}`);
        }
        else {
            return found;
        }
    }

    async signIn(authCredentialDto: SignInCredentialDto): Promise<{access_token:string}> {
        const {email, password} = authCredentialDto;
        const found = await this.userRepository.findOneBy({ email });
        
        if(found && (await bcrypt.compare(password,found.password))){
            const payload = { sub: found.id, email: found.email };
            
            const access_token:string = await this.jwtService.signAsync(payload);
            return {access_token};
        }
        else{
            throw new UnauthorizedException("Wrong Credentials!")
        }
        
    }

    async deleteUserById(id: string) {
        const found = await this.userRepository.findOneBy({ id });
        if (!found) {
            throw new NotFoundException(`User not found with id:${id}`);
        }
        else {
            await this.userRepository.delete(id);
            return "Successfully Deleted!"
        }
    }
 
}
