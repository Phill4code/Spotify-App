/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
//import { request } from 'http';
import { JwtAuthGaurd } from './auth/jwt-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards( JwtAuthGaurd)
  getProfile(
    @Req()
    request,
  ){
    return request.user;
  }
}
