import { Body, Controller,Delete,Get,Param,Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInCredentialDto } from './dto/signin_credential.dto';
import { SignUpCredentialDto } from './dto/auth-signup_credential.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    async signUp(@Body() authCredentialDto: SignUpCredentialDto):Promise<String> {
    await this.authService.create(authCredentialDto);
    return "Successfully Created!";
    }

    @Get('/user')
    async findallUser(){
        return await this.authService.findAllUser();
    }

    @Get('/user/:id')
    async findUserById(@Param('id') id:string){
        return await this.authService.findUserById(id);
    }

    @Get('/signin')
    async signIn(@Body() authCredentialDto:SignInCredentialDto):Promise<{access_token:string}>{
        return await this.authService.signIn(authCredentialDto);
    }

    @Delete(':id')
    async deleteUserById(@Param('id') id:string){
        return await this.authService.deleteUserById(id);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    async test(@Req() req){
        console.log(req);
    }
}
