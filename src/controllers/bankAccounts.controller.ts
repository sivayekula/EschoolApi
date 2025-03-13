import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { BankAccountService } from "src/services/bankAccount.service";

@Controller('bankAccounts')
export class BankAccountsController {
  constructor(
    private readonly bankAccountService: BankAccountService
  ) {}

  @Post()
  create(@Req() req, @Res() res) {
    let requestBody = JSON.parse(JSON.stringify(req.body))
    requestBody['tenant'] = req.user.tenant
    try {
      let bankAccounts = this.bankAccountService.create(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Bank accounts created successfully', data: bankAccounts });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  findAll(@Req() req, @Res() res) {
    try {
      let bankAccounts = this.bankAccountService.findAll(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Bank accounts found successfully', data: bankAccounts });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}