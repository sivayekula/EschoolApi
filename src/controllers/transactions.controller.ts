import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { TransactionsService } from "../services/transactions.service";

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService
  ) {}

  @Get(':id?')
  async getTransactions(@Req() req, @Res() res) {
    try {
      const transactions = await this.transactionService.getTransactions(req.user.tenant, req.params.id);
      return res.status(HttpStatus.OK).json(transactions);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}