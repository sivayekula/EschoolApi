import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { AcademicService } from "../services/academic.service";
import { StudentFeesService } from "../services/studentFees.service";
import { TransactionsService } from "../services/transactions.service";
import { BankAccountService } from "src/services/bankAccount.service";


@Controller('studentFees')
export class StudentFeesController {
  constructor(
    private readonly studentFeesService: StudentFeesService,
    private readonly academicService: AcademicService,
    private readonly transactionService: TransactionsService,
    private readonly bankAccountService: BankAccountService
  ) {}

  @Get(':id')
  async getFeesByStudent(@Req() req, @Res() res) {
    try {
      const fees = await this.studentFeesService.getFeesByStudent(req.params.id, req.user.academicYear);
      const academicDetails = await this.academicService.getAcademicByStudent(req.params.id, req.user.academicYear);
      return res.status(HttpStatus.OK).json({ message: 'Fees fetched successfully', data: {fees: fees, academic: academicDetails} });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getAllFees(@Req() req, @Res() res) {
    try {
      const fees = await this.studentFeesService.getAllFees(req.user.tenant, req.user.branch, req.user.academicYear);
      return res.status(HttpStatus.OK).json({ message: 'Fees fetched successfully', data: fees });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async collectFees(@Req() req, @Res() res) {
    try {
      const studentFees = await this.studentFeesService.getFeesByStudent(req.body.studentId, req.user.academicYear);
      const studentNewFees= [];
      const transactions = [];
      let totalAmount = 0;
      let paidAmount = 0;
      for(let fee of req.body.fees) {
        const studentFee = studentFees.feeList.findIndex((item) => item.fee._id.toString() === fee._id.toString());
        if (fee.paymentAmount*1 > 0) {
          transactions.push({
            amount: fee.paymentAmount*1,
            fee: fee._id,
          })
        }
        if (studentFee !== -1) {
          let paidTill= (fee.paymentAmount*1) + studentFees.feeList[studentFee].paidAmount
          totalAmount += studentFees.feeList[studentFee].paybalAmount*1
          paidAmount += paidTill*1
          studentNewFees.push({
            ...fee,
            fee: fee._id,
            dueDate: fee.dueDate,
            paidAmount: paidTill,
            pendingAmount: studentFees.feeList[studentFee].paybalAmount - paidTill,
            paymentStatus: fee.paymentAmount*1>0? paidTill === studentFees.feeList[studentFee].paybalAmount ? 'paid' : 'partially-paid' :  studentFees.feeList[studentFee].paymentStatus
          })
        }
      }
      let bankData = null
      if(req.body.paymentMode === 'online') {
        bankData = await this.bankAccountService.findOne(req.body.bank);
      } else {
        let cashData = await this.bankAccountService.findAll(req.user.tenant, req.user.branch, 'offline');
        if(!cashData.length) {
          cashData = await this.bankAccountService.create({ name: 'Cash', accountNumber: 'cash', branch: req.user.branch, tenant: req.user.tenant, mode: 'offline', createdBy: req.user._id });
        }
        bankData = Array.isArray(cashData) ? cashData[0] : cashData
      }
      let balance = bankData.currentBalance*1 + totalAmount*1
      studentFees.feeList = studentNewFees;
      studentFees.paymentStatus = totalAmount === paidAmount ? 'paid' : 'pending';
      const transactionObj = {
        receiptLabel: req.body.receiptLabel || null,
        academicYear: req.user.academicYear,
        transactionNo: `txn-${Date.now()}`,
        student: studentFees.student,
        tenant: req.user.tenant,
        branch: req.user.branch,
        studentFee: studentFees._id,
        fees: transactions,
        balance: balance,
        transactionId: req.body.transactionId,
        transactionMode: req.body.paymentMode,
        transactionBank: req.body.bank || null,
        date: req.body.transactionDate,
        amount: transactions.reduce((acc, curr) => acc + curr.amount, 0),
        proof: req.body.transactionProof,
        createdBy: req.user._id
      }
      const transaction = await this.transactionService.createTransaction(transactionObj);
      await this.bankAccountService.updateAccount(bankData._id, { currentBalance: balance});
      await this.studentFeesService.updateFees(studentFees._id, studentFees);
      return res.status(HttpStatus.OK).json({ message: 'Fees collected successfully', data: transaction});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}