import { Document } from 'mongoose';

// for web dash board
export interface Comment extends Document {
  id_course: string;
  id_user: string;
  email: string;
  phone: string;
  fullname: string;
  content: string;
  parent: true;
  reply: [Comment];
  like: number;
  isedit: boolean;
  announce: boolean;
  created_at?: string;
  updated_at?: string;
}
// rate snapshot user
export interface Rate extends Document {
  id_user: string;
  fullname: string;
  email: string;
  score: number;
  achievement: [string];
  created_at?: string;
  updated_at?: string;
}
//not enough
// course folder save signature of course learn ex: title, description, review
export interface PresentCourse extends Document {
  index: number;
  id_course: string;
  joined: [string];
  author: string;
  fullname: string;
  email: string;
  image: string;
  title: string;
  description: string;
  review: [review];
  album: [album];
  created_at?: string;
  updated_at?: string;
}
// help search
export enum album {}
// review course learn
export interface review extends Document {
  reviewer: string;
  image: string;
  fullname: string;
  email: string;
  content: string;
  rate: rateStar;
  created_at?: string;
  updated_at?: string;
}

export enum rateStar {
  VERY_BAD = 1,
  BAD = 2,
  NORMAL = 3,
  GOOD = 4,
  VERY_GOOD = 5,
}

// coures learn
export interface Course extends Document {
  id_course: string;
  index_session: number;
  subtitle: string;
  url_video: string;
  practise: [Practise];
  created_at?: string;
  updated_at?: string;
}

export interface Practise {
  id_course: string;
  index: string;
  title: string;
  question: string;
  answer: string;
  check_answer: [check_answer];
  checked_true: boolean;
  score: number;
  created_at?: string;
  updated_at?: string;
}

export enum check_answer {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}
// progress user course complete present
export interface ProgressUserCourse extends Document {
  id_course: string;
  id_user: string;
  fullname: string;
  image: string;
  email: string;
  achived: [string];
  progress: [progress];
}

// secment task practise in session
export interface progress {
  id_course: string;
  index_course: string;
  title: string;
  id_user: string;
}
// save old couser complete, and non-complete
export interface UserCourse extends Document {
  id_user: string;
  total_score: number;
}
// chart art course
export interface ChartCourseDid extends Document {
  id_user: string;
  score: string;
}
// feedback
export interface feedback extends Document {}
