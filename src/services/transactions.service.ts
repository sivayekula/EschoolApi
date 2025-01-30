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
      return await this.transactionModel.find({ student: studentId });
    } catch (error) {
      return error;
    }
  }
}