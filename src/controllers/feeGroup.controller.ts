import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { FeeGroupService } from "../services/feeGroup.service";

@Controller('feeGroup')
export class FeeGroupController {
  constructor(
    private readonly feeGroupService: FeeGroupService
  ) {}

  @Get()
  async getFeeGroups(@Req() req, @Res() res) {
    try {
      const feeGroups = await this.feeGroupService.getFeeGroups();
      return res.status(HttpStatus.OK).json({ message: 'Fee groups fetched successfully', data: feeGroups });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async createFeeGroup(@Req() req, @Res() res) {
    try {
      const feeGroup = await this.feeGroupService.createFeeGroup(req.body);
      return res.status(HttpStatus.CREATED).json({ message: 'Fee group created successfully', data: feeGroup });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}