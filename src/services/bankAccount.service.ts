import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class BankAccountService {
  constructor(
  @InjectModel('BankAccounts') private readonly bankAccountModel) {}

  async create(bankAccount) {
    try {
      return await this.bankAccountModel.create(bankAccount);
    } catch (error) {
      throw error;
    }
  }

  async findAll(tenantId: string, branchId: string) {
    try {
      return await this.bankAccountModel.find({tenant: tenantId, branch: branchId, status: 'active'});
    } catch (error) {
      throw error;
    }
  }


  async findOne(id: string) {
    try {
      return await this.bankAccountModel.findOne({ _id: id});
    } catch (error) {
      throw error;
    }
  }

}