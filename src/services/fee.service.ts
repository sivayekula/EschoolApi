import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class FeeService {
  constructor(
    @Inject('FeeModel') private readonly feeModel
  ) {}

  async getFee(classId?: string) {
    const qry = classId ? { class: classId } : {};
    return await this.feeModel.find(qry).populate('class');
  }

  async getFeeById(id: string) {
    return await this.feeModel.findById(id);
  }

  async getFees(feeIds: string[]) {
    return await this.feeModel.find({ _id: { $in: feeIds } });
  }

  async createFee(fees) {
    return await this.feeModel.insertMany(fees);
  }
}