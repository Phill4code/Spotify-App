/* eslint-disable prettier/prettier*/ 
import { Injectable, UnauthorizedException } from  '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';

@Injectable()
export class apikeystrategy extends PassportStrategy(Strategy) {
    constructor (private authService: AuthService) {
        super();
    }
    async validate(apikey:string) {
        const user = await this.authService.validateUserByApiKey(apikey);

        if(!user) {
            throw new UnauthorizedException
        } else{
        return user;
        }
    }
}