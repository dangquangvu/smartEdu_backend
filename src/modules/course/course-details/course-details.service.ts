import {
  HttpException,
  Injectable,
  NotFoundException,
  HttpCode,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDetails } from 'src/shared/interfaces/db.interface';
import { InputCourseDetailsDto } from './course-details.dto';
import * as mongoose from 'mongoose';
import { checkObjectId } from 'src/shared/helper';
@Injectable()
export class CourseDetailsService {
  constructor(
    @InjectModel('CourseDetails')
    private courseDetailsModel: Model<CourseDetails>,
    @InjectModel('Course') private courseModel: Model<Course>,
  ) {}

  async indexCourseDetails(id_parent: string) {
    if (!checkObjectId(id_parent)) {
      throw new HttpException('Id is not correct!', HttpStatus.BAD_REQUEST);
    }
    let courseDetails = await this.courseDetailsModel.find({ _id: id_parent });
    if (!courseDetails) {
      throw new NotFoundException('Course details not found!');
    }
    return courseDetails;
  }
  async createCourseDetails(
    inputCourseDetailsDto: InputCourseDetailsDto,
    id_parent: string,
  ) {
    if (!checkObjectId(id_parent)) {
      throw new HttpException('Id is not correct!', HttpStatus.BAD_REQUEST);
    }
    let course = await this.courseModel.find({ _id: id_parent });
    if (!course) {
      throw new NotFoundException('Course is not found!');
    }
    let condition = {};
    if (
      !inputCourseDetailsDto.index_session ||
      !inputCourseDetailsDto.subtitle
    ) {
      throw new HttpException(
        'Argument is not enough!',
        HttpStatus.BAD_REQUEST,
      );
    }
    condition['id_parent'] = id_parent;
    condition['index_session'] = inputCourseDetailsDto.index_session;
    condition['subtitle'] = inputCourseDetailsDto.subtitle;
    if (inputCourseDetailsDto.description) {
      condition['description'] = inputCourseDetailsDto.description;
    }
    if (inputCourseDetailsDto.url_video) {
      condition['url_video'] = inputCourseDetailsDto.url_video;
    }
    const courseDetail = new this.courseDetailsModel(condition);
    let result;
    try {
      result = await courseDetail.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Course already exists');
      }
      throw error;
    }
    return result;
  }
  async updateCourseDetails(
    inputCourseDetailsDto: InputCourseDetailsDto,
    id_parent: string,
  ) {
    if (!checkObjectId(id_parent)) {
      throw new HttpException('Id is not correct!', HttpStatus.BAD_REQUEST);
    }
    let course = await this.courseModel.find({ _id: id_parent });
    if (!course) {
      throw new NotFoundException('Course is not found!');
    }
    let condition = {};
    if (
      !inputCourseDetailsDto.index_session ||
      !inputCourseDetailsDto.subtitle
    ) {
      throw new HttpException(
        'Argument is not enough!',
        HttpStatus.BAD_REQUEST,
      );
    }
    condition['id_parent'] = id_parent;
    condition['index_session'] = inputCourseDetailsDto.index_session;
    condition['subtitle'] = inputCourseDetailsDto.subtitle;
    if (inputCourseDetailsDto.description) {
      condition['description'] = inputCourseDetailsDto.description;
    }
    if (inputCourseDetailsDto.url_video) {
      condition['url_video'] = inputCourseDetailsDto.url_video;
    }
    const courseDetail = new this.courseDetailsModel(condition);
    let result;
    try {
      result = await courseDetail.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Course already exists');
      }
      throw error;
    }
    return result;
  }
  async deleteCourseDetails(id: string) {
    // let id_course = mongoose.Types.ObjectId(id);
    if (!checkObjectId(id)) {
      throw new HttpException('Id is not correct!', HttpStatus.BAD_REQUEST);
    }
    let course = await this.courseDetailsModel.find({ _id: id });
    console.log(course);
    if (!course) {
      throw new NotFoundException('Course is not found!');
    }
    if (course.length == 0) {
      throw new NotFoundException('Course is not existed!');
    }
    try {
      await this.courseDetailsModel.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new error();
    }
    return new HttpException('This course has deleted!', HttpStatus.OK);
  }
}
