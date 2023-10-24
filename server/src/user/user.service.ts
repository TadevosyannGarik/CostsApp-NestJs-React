import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from "argon2"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        ) {}
    
        // Метод для создания нового пользователя
    async create(createUserDto: CreateUserDto) {
        // Проверяем, существует ли пользователь с указанным email
        const existUser = await this.userRepository.findOne({
            where: {
            email: createUserDto.email,
        },
    })
    
    // Если пользователь с таким email уже существует, генерируем ошибку BadRequestException
    if(existUser) throw new BadRequestException("This email already exists !")
    
    // Хешируем пароль с использованием argon2 и сохраняем нового пользователя
    const user = await this.userRepository.save({
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password)
    })
    
    // Генерируем JWT-токен для пользователя и возвращаем его вместе с пользователем
    const token = this.jwtService.sign({ email: createUserDto.email })
        return {user, token}
    }
    
    // Метод для поиска пользователя по email
    async findOne(email: string) {
        return await this.userRepository.findOne({ 
            where: {
                email,
            },
        })
    }
}

//  Сервис для работы с пользователями.