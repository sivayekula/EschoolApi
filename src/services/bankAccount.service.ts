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

  async findAll(tenantId: string) {
    try {
      return await this.bankAccountModel.find({tenant: tenantId});
    } catch (error) {
      throw error;
    }
  }


}