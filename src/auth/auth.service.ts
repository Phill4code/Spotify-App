/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
//mport { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
//import { Artist } from 'src/artists/artists.entity';
import { Enable2FAType, PayloadType } from './types';
import * as speakeasy from 'speakeasy'
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
    constructor (private userService: UsersService,
                private jwtService: JwtService,
                private artistsService: ArtistsService
    )  {}

    async login(loginDTO:LoginDTO): Promise<{ accessToken: string} > {
 {
    const user = await this.userService.findOne(loginDTO);
    const passwordMatched =  await bcrypt.compare(
        loginDTO.password,
        user.password,
    );

    if (passwordMatched) {
        delete user.password;

        const payload: PayloadType = {email: user.email, userId: user.id};
        const artist = await this.artistsService.findArtist(user.id);

        if (artist) {
            payload.artistId = artist.id;
        }

        return {
            accessToken: this.jwtService.sign(payload),
    };
    }   else {
        throw new UnauthorizedException('Password does not match');
    }
   
 }

    }
    async enable2FA (userId: number) : Promise<Enable2FAType> {
        const user = await this.userService.findById(userId);
        if (user.enable2FA) {
            return {secret: user.twoFASecret};
        }
        const secret = speakeasy.generateSecret();
        console.log(secret);
        user.twoFASecret = secret.base32;
        await this.userService.updateSecretKey(user.id, user.twoFASecret);
        return {  secret: user.twoFASecret }
    }

    //validate the 2fa token with the code below
    async Validate2FAToken(
        userId: number,
        Token: string
    ): Promise<{ verified: boolean }> {
        try{
            const user = await this.userService.findById(userId);
            //get the 2fasecret



            
            //verify key wih token by calling the speakeasy verify method
            const verified = speakeasy.totp.verify({
                secret:user.twoFASecret,
                token: Token,
                encoding:'base32',
            });

            //if validated then sends the json webtoken
            if (verified) {
                return {verified: true};
            } else {
                return {verified: false};
                
            } 
        } catch (err) {
            throw new UnauthorizedException('error verifying token')
        }
    }
    async disable2FA(userId: number): Promise< UpdateResult> {
        return this.userService.disable2FA(userId)
    }
}

