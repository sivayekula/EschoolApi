import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class GlobalPermissionsService {
  constructor(
    @InjectModel('GlobalPermissions') private readonly globalPermissionsModel
  ) {}

  async getGlobalPermissions() {
    try {
      return await this.globalPermissionsModel.findOne();
    } catch (error) {
      throw error;
    }
  }
}