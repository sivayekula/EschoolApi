import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FeeGroup } from "./feeGroup.schema";
import { Model } from "mongoose";


@Injectable()
export class FeeGroupService {
  constructor(
    @InjectModel(FeeGroup.name) private readonly feeGroupModel: Model<FeeGroup>,
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