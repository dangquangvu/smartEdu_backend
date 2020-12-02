export const BACKEND_AND_ADMIN_ROLES = ['admin'];

export const BACKEND_ROLES = ['admin', 'teacher', 'user'];

export const DbModel = {
  USER: 'User',
  RATE: 'Rate',
  COURSE: 'Course',
  COURSEDETAILS: 'CourseDetails',
  PRACTISE: 'Practise',
  COMMENT: 'Comment',
  PROGRESS_USER_COURSE: 'Progress_user_course',
  USER_COURSE_PRESENT: 'User_course_present',
};

export enum TransactionStatusEnum {
  ERROR = 'error', //co loi xay ra
  SUCCESS = 'success', // thanh cong
  PENDING = 'pending', // transaction dang xu ly do
  FAILED = 'failed', //cac transaction khong thanh cong 
  PROCESSED = 'processed' // cac transaction dang xu ly
}

export enum PaymentMethod {
  MOMO = 'momo'
}

export enum TransactionType {
  TOPUP = 'topup',
  PURCHASE ='purchase'
}