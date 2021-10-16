import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WhereUniqueUserDto, WhereUserDto } from './dto/where-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.db.user.create({ data: createUserDto });
  }

  async find(whereUserDto: WhereUserDto): Promise<User[]> {
    return await this.db.user.findMany({ where: whereUserDto });
  }

  async findAll(): Promise<User[]> {
    return await this.db.user.findMany();
  }

  async findOne(whereUniqueUserDto: WhereUniqueUserDto): Promise<User | null> {
    return await this.db.user.findUnique({ where: whereUniqueUserDto });
  }

  async update(
    whereUniqueUserDto: WhereUniqueUserDto,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.db.user.update({
      where: whereUniqueUserDto,
      data: updateUserDto,
    });
  }

  async remove(whereUniqueUserDto: WhereUniqueUserDto): Promise<User> {
    return await this.db.user.delete({ where: whereUniqueUserDto });
  }
}
