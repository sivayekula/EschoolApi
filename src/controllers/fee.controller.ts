import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { FeeService } from "../services/fee.service";


@Controller('fee')
export class FeeController {

  constructor(
    private readonly feeService: FeeService
  ) {}

  @Post()
  async createFee(@Body() body, @Req() req, @Res() res) {
    try {
      const classes = body.fees.filter((fee) => fee.checked === true)
      let fees = []
      if (classes.length === 0) {
        fees = [{
          academicYear: body.academicYear,
          feeGroup: body.feeGroup,
          name: body.feeTitle,
          isGlobal: true,
          amount: body.feeAmount || 0,
          tenant: req.user.tenant,
          branch: req.user.branch,
          createdBy: req.user._id
        }]
      } else {  
        fees = classes.map((fee) => {
          return {
            class: fee._id,
            academicYear: body.academicYear,
            feeGroup: body.feeGroup,
            name: body.feeTitle,
            amount: fee.amount,
            tenant: req.user.tenant,
            branch: req.user.branch,
            createdBy: req.user._id
          }
        })
      }
      const fee = await this.feeService.createFee(fees);
      return res.status(HttpStatus.CREATED).json({ message: 'Fees created successfully', data: fee });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getFees(@Req() req, @Res() res) {
    try {
      const fees = await this.feeService.getFees(req.user.tenant, req.user.branch);
      res.status(HttpStatus.OK).json({ message: 'Fees fetched successfully', data: fees });
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get(':classId?')
  async getFee(@Req() req, @Res() res) {
    if (req.params?.classId) {
      try {
        const fees = await this.feeService.getFee(req.params?.classId);
        return res.status(HttpStatus.OK).json({ message: 'Fees fetched successfully', data: fees });
      } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Please provide class id' });
    }
  }

  @Get(':id')
  async getFeeById(@Req() req) {
    return await this.feeService.getFeeById(req.params.id);
  }

  
}