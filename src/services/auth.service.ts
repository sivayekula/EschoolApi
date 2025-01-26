import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Student } from 'src/schemas/student.schema';
import * as bcrypt from 'bcrypt';

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
      let user = await this.userModel.findOne({ $or: [{ email: loginId }, { mobileNumber: loginId }] }).populate('role');
      if(!user) throw new UnauthorizedException('Invalid credentials'); 
      if(user.status !== 'active') throw new Error('We are unable to process with your details. Please contact to admin')
      let isPasswordValid= await bcrypt.compare(pass, user.password)
      if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
      const { password, ...result } = user.toJSON();
      return result;
    }
  }

  
} 