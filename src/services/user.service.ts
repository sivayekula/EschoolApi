import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel
  ) {}

  async createUser(user) {
    try {
      return await this.userModel.create(user);
    } catch (error) {
      throw error;
    }
  }

  async changePassword(id: string, password: string) {
    try{
      return await this.userModel.findOneAndUpdate({ _id: id }, {$set: { password }});
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw error;
    }
  }
}