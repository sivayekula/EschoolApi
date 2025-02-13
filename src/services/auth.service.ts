import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Student } from 'src/schemas/student.schema';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Student') private readonly studentModel: Model<Student>
  ) {}

  async validateUser(loginId: string, pass: string, userType: string): Promise<any> {
    if (userType === 'student') {
      let user = await this.studentModel.findOne({$or: [{ email : loginId }, { mobileNumber: loginId }] }).exec();
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } else if (userType === 'staff') {
      
    } else {
      return await this.userModel.findOne({ $or: [{ email: loginId }, { mobileNumber: loginId }] }).lean().populate('role');
    }
  }

  
} 