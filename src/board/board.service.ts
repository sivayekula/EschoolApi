import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Board } from "./board.schema";
import { Model } from "mongoose";


@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
  ) {}

  async create(data) {
    try {
      return await this.boardModel.create(data);
    } catch (error) {
      throw error;
    }
  }

  async getBoards(tenantId: string, branchId: string) {
    try {
      return await this.boardModel.find({tenant: tenantId, branch: branchId, status: 'active'});
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.boardModel.findByIdAndUpdate(id, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}