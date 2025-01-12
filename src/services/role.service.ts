import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role') private readonly roleModel
  ) {}

  async getRole(roleName: string): Promise<any> {
    return await this.roleModel.findOne({name: roleName});
  }

  async getRoles() {
    try {
      return await this.roleModel.find();
    } catch (error) {
      throw error;
    }
  }

  async createRole(roleObj) {
    try {
      return await this.roleModel.create(roleObj);
    } catch (error) {
      throw error;
    }
  } 

}