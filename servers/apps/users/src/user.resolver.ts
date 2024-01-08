import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterResponse } from './types/user.types';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';

@Resolver('user')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}
  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }

    const user = await this.userService.Register(registerDto);
    return { user };
  }
}
