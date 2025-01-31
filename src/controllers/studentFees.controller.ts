import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { AcademicService } from "src/services/academic.service";
import { StudentFeesService } from "src/services/studentFees.service";
import { TransactionsService } from "src/services/transactions.service";


@Controller('studentFees')
export class StudentFeesController {
  constructor(
    private readonly studentFeesService: StudentFeesService,
    private readonly academicService: AcademicService,
    private readonly transactionService: TransactionsService
  ) {}

  @Get(':id')
  async getFeesByStudent(@Req() req, @Res() res) {
    try {
      const fees = await this.studentFeesService.getFeesByStudent(req.params.id);
      const academicDetails = await this.academicService.getAcademicByStudent(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Fees fetched successfully', data: {fees: fees, academic: academicDetails} });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('')
  async getAllFees(@Req() req, @Res() res) {
    try {
      const fees = await this.studentFeesService.getAllFees(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Fees fetched successfully', data: fees });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('')
  async collectFees(@Req() req, @Res() res) {
    try {
      const studentFees = await this.studentFeesService.getFeesByStudent(req.body.studentId);
      const studentNewFees= [];
      const transactions = [];
      for(let fee of req.body.fees) {
        const studentFee = studentFees.feeList.findIndex((item) => item.fee.toString() === fee._id.toString());
        if (fee.paymentAmount*1 > 0) {
          transactions.push({
            amount: fee.paymentAmount,
            fee: fee._id,
          })
        }
        if (studentFee !== -1) {
          let paidTill= fee.paymentAmount*1 > 0 ? fee.paidAmount + studentFees.feeList[studentFee].paidAmount : fee.paidAmount
          studentNewFees.push({
            ...fee,
            dueDate: fee.dueDate,
            paidAmount: paidTill,
            pendingAmount: studentFees.feeList[studentFee].paybalAmount - paidTill,
            paymentStatus: paidTill === studentFees.feeList[studentFee].paybalAmount ? 'paid' : 'pending'
          })
        } else {
          studentNewFees.push({
            fee: fee._id,
            duration: fee.duration,
            dueDate: fee.dueDate,
            paidAmount: fee.paymentAmount,
            pendingAmount: fee.totalAmount,
            totalAmount: fee.totalAmount,
            paymentStatus: 'pending'
          });
        }
      }
      studentFees.feeList = studentNewFees;
      const transactionObj = {
        student: studentFees.student,
        tenant: req.user.tenant,
        studentFee: studentFees._id,
        feeIds: transactions,
        transactionId: req.body.transactionId,
        transactionType: req.body.paymentMode,
        transactionBank: req.body.bank,
        date: req.body.transactionDate,
        amount: transactions.reduce((acc, curr) => acc + curr.amount, 0),
        proof: req.body.transactionProof
      }
      const transaction = await this.transactionService.createTransaction(transactionObj);
      await this.studentFeesService.updateFees(studentFees._id, studentFees);
      return res.status(HttpStatus.OK).json({ message: 'Fees collected successfully', data: transaction});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}