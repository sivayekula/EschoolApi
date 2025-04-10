import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class LoanService {
  constructor(
    @InjectModel('Loans') private readonly loanModel
   ) {}

   async createLoan(loan) {
    try{
      return await this.loanModel.create(loan)
    } catch(error) {
      throw error
    }
  }

  async findLoan({staffId}) {
    try {
      return await this.loanModel.findOne({staff: staffId, status: 'active'})
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
}