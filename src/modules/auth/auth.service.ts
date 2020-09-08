import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './auth.dto';
import { User } from './auth.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: CreateUserDto) {
    const { email, password } = authCredentialsDto;

    const user = new this.userModel({ email: email, password: password });

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    const user = await this.findUserByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException(
        'Password or email not match, please try again!',
      );
    }
    await this.checkPassword(loginUserDto.password, user.password);
    const payload = { email: user.email, password: user.password };
    
    return {
      fullName: user.fullName,
      email: user.email,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<User> {
    console.log(email, pass);
    
    const user = await this.userModel.findOne({ email: email });
    console.log(user)
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }

  private async findUserByEmail(email: any): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Wrong email or password.');
    }
    return user;
  }

  private async checkPassword(attemptPass: string, password: string) {
    const match = await bcrypt.compare(attemptPass, password);
    if (!match) {
      throw new NotFoundException('Wrong email or password.');
    }
    return match;
  }
}
