import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GlobalPermissions } from "./globalPermissions.schema";
import { Model } from "mongoose";


@Injectable()
export class GlobalPermissionsService {
  constructor(
    @InjectModel(GlobalPermissions.name) private readonly globalPermissionsModel: Model<GlobalPermissions>
  ) {}

  async getGlobalPermissions() {
    try {
      return await this.globalPermissionsModel.findOne();
    } catch (error) {
      throw error;
    }
  }
}