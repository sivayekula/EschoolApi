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

  async getFees(tenantId?: string, feeIds?: string[]) {
    let qry = tenantId ? { tenant: tenantId, status: { $ne: 'deleted' } } : { _id: { $in: feeIds } }
    return await this.feeModel.find(qry);
  }

  async createFee(fees) {
    return await this.feeModel.insertMany(fees);
  }

  async getFeesByStudent(studentId: string) {
    try {
      return await this.feeModel.find({ student: studentId, status: 'active' });
    } catch (error) {
      throw error;
    }
  }
}