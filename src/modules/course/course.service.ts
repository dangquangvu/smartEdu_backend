import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { checkObjectId } from 'src/shared/helper';
import { Course } from 'src/shared/interfaces/db.interface';
import { CourseDto } from './course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

  async indexCourse() {
    let course = await this.courseModel.find();
    if (!course) {
      throw new NotFoundException('Course is not found!');
    }
    return course;
  }
  async indexCourseDetails(id: string) {
    if (!checkObjectId(id)) {
      throw new HttpException('Id is not correct!', HttpStatus.BAD_REQUEST);
    }
    let course = await this.courseModel.findOne({ _id: id });
    if (!course) {
      throw new NotFoundException('Course is not found!');
    }
    return course;
  }
  async createCourse(courseDto: CourseDto) {
    if (!courseDto.title || !courseDto.description || !courseDto.index) {
      throw new NotFoundException('param not enough!');
    }

    const course = new this.courseModel({
      index: courseDto.index,
      title: courseDto.title,
      description: courseDto.description,
    });
    let result;
    try {
      result = await course.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Course already exists');
      }
      throw error;
    }
    return result;
  }
  async updateCourse(courseDto: CourseDto, id: string) {
    if (!checkObjectId(id)) {
      throw new HttpException('Id is not correct!', HttpStatus.BAD_REQUEST);
    }
    let condition = {};
    if (courseDto.index) {
      condition['index'] = courseDto.index;
    }
    if (courseDto.description) {
      condition['description'] = courseDto.description;
    }
    if (courseDto.title) {
      condition['title'] = courseDto.title;
    }
    console.log(condition);
    let course = await this.courseModel.find({ _id: id });
    if (!course) {
      throw new NotFoundException('Course is not found!');
    }
    try {
      await this.courseModel.update(
        { _id: id },
        {
          $set: condition,
        },
      );
    } catch (error) {
      throw new NotFoundException('Course is not update!')
    }
  }
  //draft
  async deleteCourse(id: string) {
    if (!checkObjectId(id)) {
      throw new HttpException('Id is not correct!', HttpStatus.BAD_REQUEST);
    }
    let course = await this.courseModel.findOne({ _id: id });
    if (!course) {
      throw new NotFoundException('Course is not found!');
    }
    return course;
  }
}
