import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class FeeGroupService {
  constructor(
    @InjectModel('FeeGroup') private readonly feeGroupModel
  ) {}

  async getFeeGroups() {
    try {
      return await this.feeGroupModel.find();
    } catch (error) {
      throw error;
    }
  }

  async createFeeGroup(feeGroupObj) {
    try {
      return await this.feeGroupModel.create(feeGroupObj);
    } catch (error) {
      throw error;
    }
  }
}