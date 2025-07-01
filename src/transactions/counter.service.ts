import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Counter } from "./counter.schema";
import { Model } from "mongoose";

@Injectable()
export class CounterService {
  
  constructor(@InjectModel('Counter') private readonly counterModel: Model<Counter>) {}

  async getCounter() {
    try {
      return await this.counterModel.findOneAndUpdate({ id: 'receipt' }, { $inc: { seq: 1 } }, { upsert: true, new: true });
    } catch (error) {
      throw error;
    }
  }
}