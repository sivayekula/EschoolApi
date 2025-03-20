import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AcademicService } from "./academic.service";


@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction') private readonly transactionModel,
    private readonly academicService: AcademicService
  ) {}

  async createTransaction(transaction) {
    try {
      return await this.transactionModel.create(transaction);
    } catch (error) {
      return error;
    }
  }

  async getTransactions(tenantId: string, studentId?: string) {
    try {
      let query = { tenant: tenantId };
      if (studentId) {
        query['student'] = studentId;
      }
      let transactionList= [];
      let transactions = await this.transactionModel.find(query).populate('receiptLabel').populate({path: 'fees.fee', model: 'Fee',populate: {
        path: "feeGroup", // Populate feeGroupId inside Fee
        model: "FeeGroup"
      }}).exec();
      for (let transaction of transactions) {
        let academic = await this.academicService.getAcademicByStudent(transaction.student._id, transaction.academicYear);
        transactionList.push({transaction , academic});
      }
      return transactionList;
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