import { Inject, Injectable } from "@nestjs/common";
import { Fee } from "./fee.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class FeeService {
  constructor(
    @InjectModel(Fee.name) private readonly feeModel: Model<Fee>,
  ) {}

  async getFee(tenantId: string, branchId?: string, classId?: string, feeName?: string) {
    try {
      const qry = classId && feeName ? { class: classId, name: feeName, tenant: tenantId, branch: branchId } : classId ? {$or:[{ class: classId}, {isGlobal: true}], tenant: tenantId, branch: branchId} : {tenant: tenantId, branch: branchId};
      return await this.feeModel.find(qry).populate('class');
    } catch (error) {
      throw error;
    }
  }

  async getFeeById(id: string) {
    return await this.feeModel.findById(id);
  }

  async getFees(tenantId?: string, branchId?: string, feeIds?: string[], academicYear?: string) {
    let qry = tenantId ? { tenant: tenantId, branch: branchId, academicYear: academicYear, status: { $ne: 'deleted' } } : { _id: { $in: feeIds } }
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