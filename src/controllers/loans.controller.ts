import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { LoanService } from "src/services/loan.service";


@Controller('loans')
export class LoansController {
  constructor(
    private readonly loanService: LoanService
  ){}

  @Get()
  async getLoans(@Req() req, @Res() res) {
    try{
      const loans = await this.loanService.getLoans(req.user.tenant, req.user.branch);
      return res.status(HttpStatus.OK).json({ message: 'Loans fetched successfully', data: loans});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message});
    }
  }

  @Get(':id')
  async getLoan(@Req() req, @Res() res) {
    try{
      const loan = await this.loanService.findLoan(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Loan fetched successfully', data: loan});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message});
    }
  }

}