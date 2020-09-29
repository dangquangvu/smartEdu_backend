import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/auth.interface';

@Injectable()
export class DashboardService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getDashBoard() {
    await this.getRatingUser();
    await this.getComment();
    return true;
  }

  async getRatingUser() {
      return true;
  }

  async getComment() {
      return true;
  }

}
