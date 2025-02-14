import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel
  ) {}

  async createUser(user) {
    console.log(user);
    try {
      return await this.userModel.create(user);
    } catch (error) {
      throw error;
    }
  }
}