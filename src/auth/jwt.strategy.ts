import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){
      super({
        secretOrKey: 'topSecret51',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      });  
    }
    async validate(payload: JwtPayload):Promise<User>{
        const {email} = payload;
        const found = await this.userRepository.findOneBy({email});
        
        if (!found ){
            throw new UnauthorizedException("User unauthorized!");
        }
        return found!;
    }
}