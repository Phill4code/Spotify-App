/* eslint-disable prettier/prettier */
import { Controller, Body, Post, Get, UseGuards,Request } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGaurd } from './jwt-guard';
import { Enable2FAType } from './types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {  ValidateTokenDTO } from './dto/validate-token.dto';
//import { Console } from 'console';



@Controller('auth')
export class AuthController {
  
    constructor (
        private userservice:UsersService,
        private authService: AuthService
    
    ) {}

    @Post('signup')
    signup(
        @Body()
        userDTO: CreateUserDTO,
    ): Promise<User> {
        return this.userservice.create(userDTO)
    }

    @Post('login')
    login(
        @Body()
        loginDTO: LoginDTO,
    ){
        return this.authService.login(loginDTO);
    };

    @Get('enable-2fa')
    @UseGuards(JwtAuthGaurd)
    enable2FA(
        @Request()
        req,
    ): Promise<Enable2FAType> {
        console.log(req.user);
        return this.authService.enable2FA(req.user.userId);
    };

    @Post('validate-2fa') 
    @UseGuards(JwtAuthGaurd)
    validate2FA(
        @Request()
        req,
        @Body()
        ValidateTokenDTO:ValidateTokenDTO,
    ): Promise<{ verified: boolean }> {
        return this.authService.Validate2FAToken(
            req.user.userId,
            ValidateTokenDTO.token
        );
    }
}
