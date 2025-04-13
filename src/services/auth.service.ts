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
      return await this.studentModel.findOne({admissionNumber: loginId }).lean().populate('role').populate('branch');
    } else if (userType === 'staff') {
      return await this.staffModel.findOne({$or: [{ email : loginId }, { mobileNumber: loginId }] }).lean().populate('role').populate('branch');
    } else {
      return await this.userModel.findOne({ $or: [{ email: loginId }, { mobileNumber: loginId }] }).lean().populate('role');
    }
  }

  async getUserById(id: string, userType: string) {
    if (userType === 'student') {
      return await this.studentModel.findOne({ _id: id });
    } else if (userType === 'staff') {
      return await this.staffModel.findOne({ _id: id });
    } else {
      return await this.userModel.findOne({ _id: id });
    }
  }

  async changePassword(id: string, password: string, userType: string) {
    if (userType === 'student') {
      return await this.studentModel.updateOne({ _id: id }, { $set: { password } });
    } else if (userType === 'staff') {
      return await this.staffModel.updateOne({ _id: id }, { $set: { password } });
    } else {
      return await this.userModel.updateOne({ _id: id }, { $set: { password } });
    }
  }

  
} 