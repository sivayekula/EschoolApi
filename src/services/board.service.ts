import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class BoardService {
  constructor(
    @InjectModel('Board') private readonly boardModel
  ) {}

  async create(data) {
    try {
      return await this.boardModel.create(data);
    } catch (error) {
      throw error;
    }
  }

  async getBoards(tenantId: string) {
    try {
      return await this.boardModel.find({tenant: tenantId, status: 'active'});
    } catch (error) {
      throw error;
    }
  }
}