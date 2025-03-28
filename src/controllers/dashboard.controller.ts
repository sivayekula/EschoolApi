import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { StaffService } from "../services/staff.service";
import { TransactionsService } from "../services/transactions.service";
import { AcademicService } from "src/services/academic.service";


@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly academicService: AcademicService,
    private readonly staffService: StaffService,
    private readonly transactionService: TransactionsService,   
  ) {}

  @Get()
  async getDashboard(@Req() req, @Res() res) {
    try {
      const studentCount = await this.academicService.getStudentsCount(req.user.tenant, req.user.branch, req.user.academicYear);
      const staffCount = await this.staffService.getStaffCount(req.user.tenant, req.user.branch);
      const collectedFee = await this.transactionService.getCollectedFee(req.user.tenant, req.user.branch, req.user.academicYear);
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