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

  async findAll(tenantId: string, branchId: string, mode?: string) {
    let query = {tenant: tenantId, branch: branchId, status: 'active', ...(mode && {mode: mode})};
    try {
      return await this.bankAccountModel.find(query);
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

  async updateAccount(id: string, bankAccount) {
    try {
      return await this.bankAccountModel.updateOne({ _id: id }, bankAccount);
    } catch (error) {
      throw error;
    }
  }

}