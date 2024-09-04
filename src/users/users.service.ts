import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
  ){}

  async create(User: CreateUserDto){
    const userfound= await this.userRepository.findOne({
      where:{
        username:User.username
      }
    });

    if(userfound){
      return new HttpException("User is duplicated",HttpStatus.CONFLICT)
    }

    const newUser=this.userRepository.create(User)
    return await this.userRepository.save(newUser);
  }

  findAll() : Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number){
    const userfound= await this.userRepository.findOne({
      where:{
        id
      }
    });

    if(!userfound){
      return new HttpException("user not found",HttpStatus.NOT_FOUND)
    }    
    return userfound
  }

  async update(id: number, User: UpdateUserDto) {
    const userfound= await this.userRepository.findOne({
      where:{
        id
      }
    });
    if (!userfound){
      return new HttpException("user username duplicate",HttpStatus.CONFLICT)
    }

    const userUpdate=Object.assign(userfound,User)
    return this.userRepository.save(userUpdate);
  }

  async remove(id: number) {
    const result=await this.userRepository.delete({id})

    if (result.affected===0){
      return new HttpException("User not found",HttpStatus.NOT_FOUND)
    }

    return result;
  }
}
