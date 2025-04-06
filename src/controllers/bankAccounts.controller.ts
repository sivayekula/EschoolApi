import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { BankAccountService } from "../services/bankAccount.service";

@Controller('bankAccounts')
export class BankAccountsController {
  constructor(
    private readonly bankAccountService: BankAccountService
  ) {}

  @Post()
  async create(@Req() req, @Res() res) {
    let requestBody = JSON.parse(JSON.stringify(req.body))
    requestBody['tenant'] = req.user.tenant
    requestBody['branch'] = req.user.branch
    requestBody['createdBy'] = req.user._id
    try {
      let bankAccounts = await this.bankAccountService.create(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Bank accounts created successfully', data: bankAccounts });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Req() req, @Res() res) {
    try {
      let bankAccounts = await this.bankAccountService.findAll(req.user.tenant, req.user.branch);
      return res.status(HttpStatus.OK).json({ message: 'Bank accounts found successfully', data: bankAccounts });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id')
  async findOne(@Req() req, @Res() res) {
    try {
      let bankAccounts = await this.bankAccountService.findOne(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Bank accounts found successfully', data: bankAccounts });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}