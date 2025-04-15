import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CounterService {
  
  constructor(@InjectModel('Counter') private readonly counterModel) {}

  async getCounter() {
    try {
      return await this.counterModel.findOneAndUpdate({ id: 'receipt' }, { $inc: { seq: 1 } }, { upsert: true, new: true });
    } catch (error) {
      throw error;
    }
  }
}