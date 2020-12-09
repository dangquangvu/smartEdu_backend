import { User } from 'src/shared/interfaces/db.interface';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MentorService {
  constructor(
    @InjectModel('User')
    private usersModel: Model<User>,
  ) {}
  async indexMentor(): Promise<any> {
    const users = await this.usersModel.find({
      roles: 'mentor',
    });
    return users;
  }

  mentorDetails = async (id: string) => {
    if (!id) {
      throw new BadRequestException('Id is not found!');
    }
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User is not found!');
    }
    return user;
  };
}
