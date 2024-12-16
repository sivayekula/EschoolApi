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

}