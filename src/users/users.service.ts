/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UsersService {
   
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
        async create(userDTO: CreateUserDTO): Promise<User> {
        const user = new User();
        user.firstName = userDTO.firstName;
        user.lastName  = userDTO.lastName;
        user.email = userDTO.email;
        user.apikey = uuid4();

        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(userDTO.password, salt);

        const savedUser =  await this.userRepository.save(user);
        delete savedUser.password;
        return savedUser;

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
                twoFASecret: null,
            }
        
        );
    }
    async findByApiKey(apikey:string): Promise <User> {
        return this.userRepository.findOneBy({apikey})
    };
}
