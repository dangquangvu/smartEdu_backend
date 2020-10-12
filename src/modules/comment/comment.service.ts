import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/shared/interfaces/db.interface';
import { CommenOutputDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Comment') private userModel: Model<Comment>) {}

  async indexComment(id: string): Promise<any> {
    if(!id){
      throw new NotFoundException('Id has not found!');
    }
    
    
  }
  async postComment(id: string): Promise<any> {
    return true;
  }
}
