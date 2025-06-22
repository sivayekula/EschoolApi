import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuickActions } from "./quickActions.schema";


@Injectable()
export class QuickActionsService {
  constructor(
    @InjectModel('QuickActions') private readonly quickActionsModel: Model<QuickActions>
  ) {}
  async getQuickActions() {
    return await this.quickActionsModel.find();
  }

  async getQuickAction(userId) {
    return await this.quickActionsModel.findOne({userId: userId});
  }

  async createorUpdateQuickAction(userId, quickAction) {
    quickAction.userId = userId
    return await this.quickActionsModel.findOneAndUpdate({userId: userId}, quickAction, {upsert: true, new: true});
  }
}