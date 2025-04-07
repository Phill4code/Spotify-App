/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
   
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
        async create(userDTO: CreateUserDTO): Promise<User> {
        const salt =await bcrypt.genSalt();
        userDTO.password = await bcrypt.hash(userDTO.password, salt);
        const user = await this.userRepository.save(userDTO);
        delete user.password;
        return user;
        }

        async findOne(data:LoginDTO): Promise<User> {
            const user = await this.userRepository.findOneBy({email: data.email});
            if (!user) {
                throw new UnauthorizedException('could not find user');
            }
            return user;
        }
    async findById(id: number): Promise<User>{
    return this.userRepository.findOneBy({ id:id })
    }
    async updateSecretKey(userId, secret:string): Promise<UpdateResult> {
        return this.userRepository.update(
            {id: userId},
            {
                twoFASecret:secret,
                enable2FA:true,
            },
        );
    }
    async disable2FA(userId: number): Promise< UpdateResult> {
        return this.userRepository.update( 
            {id: userId },
            {
                enable2FA: false,
            }
        
        );
    }
}
