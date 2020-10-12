import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDetails } from 'src/shared/interfaces/db.interface';

@Injectable()
export class CourseDetailsService {
  constructor(
    @InjectModel('CourseDetails')
    private courseDetailsModel: Model<CourseDetails>,
  ) {}

  async indexCourseDetails(id_parent: string) {
    let courseDetails = await this.courseDetailsModel.find({ _id: id_parent });
    if (!courseDetails) {
      throw new NotFoundException('Course details not found!');
    }
    return courseDetails;
  }
  async createCourseDetails(id_parent: string) {
    let courseDetails = await this.courseDetailsModel.find({ _id: id_parent });
    if (!courseDetails) {
      throw new NotFoundException('Course details not found!');
    }
    return courseDetails;
  }
}
