import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class FeeService {
  constructor(
    @Inject('FeeModel') private readonly feeModel
  ) {}

  async getFee(classId?: string) {
    try {
      const qry = classId ? {$or:[{ class: classId}, {isGlobal: true}]} : {};
      return await this.feeModel.find(qry).populate('class');
    } catch (error) {
      throw error;
    }
  }

  async getFeeById(id: string) {
    return await this.feeModel.findById(id);
  }

  async getFees(tenantId?: string, feeIds?: string[]) {
    let qry = tenantId ? { tenant: tenantId, status: { $ne: 'deleted' } } : { _id: { $in: feeIds } }
    return await this.feeModel.find(qry).populate('class').populate('academicYear').populate('feeGroup');
  }

  async createFee(fees) {
    try {
      return await this.feeModel.insertMany(fees);
    } catch (error) {
      throw error;
    }
  }
}