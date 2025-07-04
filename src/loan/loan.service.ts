import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Loans } from "./loan.schema";
import { Model } from "mongoose";


@Injectable()
export class LoanService {
  constructor(
    @InjectModel(Loans.name) private readonly loanModel: Model<Loans>,
   ) {}

   async createLoan(loan) {
    try{
      return await this.loanModel.create(loan)
    } catch(error) {
      throw error
    }
  }

  async findLoan(staffId: string) {
    try {
      return await this.loanModel.find({staff: staffId, status: 'active'})
    } catch (error) {
      throw error
    }
  }

  async findLoanById(id: string) {
    try {
      return await this.loanModel.findById(id)
    } catch (error) {
      throw error
    }
  }

  async updateLoan(id: string, loan) {
    try {
      return await this.loanModel.findByIdAndUpdate(id, loan)
    } catch (error) {
      throw error
    }
  }

  async getLoans(tenantId: string, branchId: string) {
    try {
      return await this.loanModel.find({tenant: tenantId, branch: branchId}).populate({path: 'staff',populate: {path: 'designation', model: 'Designation'}}).populate({path: 'repayTransactions', populate: {path: 'transactionBank', model: 'BankAccounts'}})
    } catch (error) {
      throw error
    }
  }
}