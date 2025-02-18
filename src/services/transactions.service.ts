import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction') private readonly transactionModel,
  ) {}

  async createTransaction(transaction) {
    try {
      return await this.transactionModel.create(transaction);
    } catch (error) {
      return error;
    }
  }

  async getTransactions(studentId: string) {
    try {
      return await this.transactionModel.find({ student: studentId }).populate({path: 'fees.fee', model: 'Fee'});
    } catch (error) {
      return error;
    }
  }

  async getCollectedFee(tenant: string) {
    try {
      return await this.transactionModel.find({tenant});
    } catch (error) {
      return error;
    }
  }

}