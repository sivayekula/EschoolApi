import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { TransactionsService } from "../services/transactions.service";
import { FeeCategoryService } from "../services/feeCategory.service";
import { LoanService } from "../services/loan.service";

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly feeCategoryService: FeeCategoryService,
    private readonly loanService: LoanService
  ) {}

  @Get('/list')
  async getTransactionList(@Req() req, @Res() res) {
    try {
      const transactions = await this.transactionService.getTransactionList(req.user.tenant, req.user.branch);
      return res.status(HttpStatus.OK).json({ message: 'Transactions fetched successfully', data: transactions });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id?')
  async getTransactions(@Req() req, @Res() res) {
    try {
      const transactions = await this.transactionService.getTransactions(req.user.tenant, req.user.branch, req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Transactions fetched successfully', data: transactions});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message});
    }
  }

  @Post()
  async createTransaction(@Req() req, @Res() res) {
    let transaction: any;
    let isdeleteTransaction = false
    try {
      const requestBody = JSON.parse(JSON.stringify(req.body))
      requestBody['tenant'] = req.user.tenant
      requestBody['branch'] = req.user.branch
      requestBody['createdBy'] = req.user._id
      requestBody['academicYear'] = req.user.academicYear
      requestBody['transactionNo'] = `txn-${Date.now()}`
      requestBody['transactionBank'] = requestBody.account || null
      requestBody['staff'] = requestBody.staff || null
      let loanData = null;
      if(requestBody.loanId) {
        loanData = await this.loanService.findLoanById(requestBody.loanId);
      }
      transaction = await this.transactionService.createTransaction(requestBody);
      let feecategory = await this.feeCategoryService.getFeeCategory(requestBody.category);
      if(requestBody.transactionType === 'credit' && feecategory.value === 'repayment') {
        if(requestBody.staff) {
          if(loanData) {
            if(loanData.paidAmount*1 + requestBody.amount*1 > loanData.loanAmount*1) {
              isdeleteTransaction = true
              throw new Error('Amount is greater than loan amount')
            }
            await this.loanService.updateLoan(loanData._id, {
              paidAmount: loanData.paidAmount*1 + requestBody.amount*1,
              repayTransactions: [...loanData.repayTransactions, transaction._id],
              status: loanData.paidAmount*1 + requestBody.amount*1 === loanData.loanAmount*1 ? 'paid' : 'active'
            })
          } else {
            isdeleteTransaction = true
            throw new Error('Loan not found')
          }
        } else {
          isdeleteTransaction = true
          throw new Error('Staff is required')
        }
      }
      if(requestBody.transactionType === 'debit' && feecategory.value === 'loan') {
        if(requestBody.staff) {
          await this.loanService.createLoan({
            title: requestBody.title,
            staff: requestBody.staff,
            loanAmount: requestBody.amount*1,
            issuedDate: requestBody.date,
            transactionMode: requestBody.transactionMode,
            transaction: transaction._id,
            tenant: req.user.tenant,
            branch: req.user.branch,
            createdBy: req.user._id,
            academicYear: req.user.academicYear
          })
        } else {
          isdeleteTransaction = true
          throw new Error('Staff is required')
        }
      }
      return res.status(HttpStatus.OK).json({status: 'success', message: 'Transaction created successfully', data: transaction});
    } catch (error) {
      if(isdeleteTransaction && transaction) {
        await this.transactionService.deleteTransaction(transaction._id)
      }
      return res.status(HttpStatus.BAD_REQUEST).json({status: 'error', message: error.message});
    }
  }
}