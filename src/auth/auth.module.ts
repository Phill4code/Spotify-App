/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt-strategy';
import { ArtistsModule } from 'src/artists/artists.module';
import { apikeystrategy } from './api-key-strategy';

@Module({
    imports:[UsersModule,  JwtModule.register({
        secret: authConstants.secret, 
        signOptions:{
        expiresIn:'1d',
    }
}),
ArtistsModule
],
  providers: [AuthService, JwtStrategy, apikeystrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
