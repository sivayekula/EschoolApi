import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import mongoose from "mongoose";
import { FeeService } from "src/services/fee.service";


@Controller('fee')
export class FeeController {

  constructor(
    private readonly feeService: FeeService
  ) {}

  @Post()
  async createFee(@Body() body, @Req() req) {
    const classes = body.fees.filter((fee) => fee.checked === true)
    const fees = classes.map((fee) => {
      return {
        class: new mongoose.Types.ObjectId(fee._id),
        academicYear: body.academicYear,
        feeGroup: body.feeGroup,
        name: body.feeTitle,
        feeApplicable: body.feeApplicable,
        feeInstallment: body.feeDuration,
        dueDates: body.dueDates.map((date) => new Date(date.dueDate)),
        amount: fee.amount,
        disCount: body.discount*1,
        tenant: new mongoose.Types.ObjectId(req.user.user.tenant)
      }
    })
    return await this.feeService.createFee(fees);
  }

  @Get(':classId?')
  async getFee(@Req() req) {
    return await this.feeService.getFee(req.params?.classId);
  }

  @Get(':id')
  async getFeeById(@Req() req) {
    return await this.feeService.getFeeById(req.params.id);
  }
}