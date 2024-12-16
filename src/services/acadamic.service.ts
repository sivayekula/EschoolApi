import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AcadamicService {
  constructor(
    @InjectModel('Acadamics') private readonly acadamicModel
  ) {}

  async createAcadamic(acadamic): Promise<any> {
    return await this.acadamicModel.create(acadamic);
  }
}