import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel,
    @InjectModel('Student') private readonly studentModel,
    @InjectModel('Staff') private readonly staffModel
  ) {}

  async validateUser(loginId: string, userType: string) {
    if (userType === 'student') {
      return await this.studentModel.findOne({admissionNumber: loginId }).lean().populate('role');
    } else if (userType === 'staff') {
      return await this.staffModel.findOne({$or: [{ email : loginId }, { mobileNumber: loginId }] }).lean().populate('role');
    } else {
      return await this.userModel.findOne({ $or: [{ email: loginId }, { mobileNumber: loginId }] }).lean().populate('role');
    }
  }

  
} 