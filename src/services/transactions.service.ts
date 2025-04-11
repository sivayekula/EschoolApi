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
      throw error;
    }
  }

  async getTransactions(tenantId: string, branchId: string, studentId?: string) {
    try {
      let query = { tenant: tenantId, branch: branchId };
      if (studentId) {
        query['student'] = studentId;
      } else {
        query['student'] = { $exists: true };
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
      console.log(error);
      throw error;
    }
  }

  async getCollectedFee(tenant: string, branch: string, academicYear: string) {
    try {
      return await this.transactionModel.find({tenant: tenant, branch: branch, academicYear: academicYear});
    } catch (error) {
      throw error;
    }
  }
  
  //internally using if any dependent record not created 
  async deleteTransaction(transactionId: string) {
    try {
      return await this.transactionModel.findByIdAndDelete(transactionId);
    } catch (error) {
      throw error;
    }
  }

  async getTransactionList(tenantId: string, branchId: string) {
    try {
      return await this.transactionModel.find({tenant: tenantId, branch: branchId}).populate({path: 'fees.fee', model: 'Fee'}).populate('category');
    } catch (error) {
      throw error;
    }
  }

}