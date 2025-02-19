import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { StaffService } from "src/services/staff.service";
import { StudentService } from "src/services/student.service";
import { TransactionsService } from "src/services/transactions.service";


@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly studentService: StudentService,
    private readonly staffService: StaffService,
    private readonly transactionService: TransactionsService,   
  ) {}

  @Get()
  async getDashboard(@Req() req, @Res() res) {
    try {
      const studentCount = await this.studentService.getStudentCount(req.user.tenant);
      const staffCount = await this.staffService.getStaffCount(req.user.tenant);
      const collectedFee = await this.transactionService.getCollectedFee(req.user.tenant);
      let totalCollectedFee = 0;
      let totalExpense = 0;
      collectedFee.forEach((fee) => {
        if (fee.transactionMode === 'debit') {
          totalExpense += fee.amount;
        }
        if (fee.transactionMode === 'credit') {
          totalCollectedFee += fee.amount;
        }
      });
      return res.status(HttpStatus.OK).json({ data: {studentCount, staffCount, totalCollectedFee, totalExpense} });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}