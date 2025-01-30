import { Controller, Get, HttpStatus, Param, Req, Res } from "@nestjs/common";
import { TransactionsService } from "src/services/transactions.service";

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService
  ) {}

  @Get(':id')
  async getTransactions(@Req() req, @Res() res, @Param('id') id: string) {
    try {
      const transactions = await this.transactionService.getTransactions(id);
      return res.status(HttpStatus.OK).json(transactions);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}