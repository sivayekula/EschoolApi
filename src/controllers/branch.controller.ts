import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { BranchService } from "../services/branch.service";
import * as moment from 'moment';
import { AcademicYearService } from "src/services/academicYear.service";


@Controller('branch')
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
    private readonly academicYearService: AcademicYearService

  ) {}

  @Get()
  async getBranches(@Req() req, @Res() res) {
    try {
      const branches = await this.branchService.findAll(req.user.tenant, req.query.isDefault);
      return res.status(HttpStatus.OK).json({ message: 'Branches fetched successfully', data: branches });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async createBranch(@Req() req, @Res() res) {
    try {
      const body = JSON.parse(JSON.stringify(req.body))
      body['tenant'] = req.user.tenant
      const branch = await this.branchService.createBranch(body);
      let year = moment().format('YYYY');
      await this.academicYearService.createAcademicYear({tenant: req.user.tenant, branch: branch._id, createdBy: req.user._id, year: year+'-'+(Number(year)+1), startDate: moment().format(), endDate: moment().add(12, 'months').format(), status: 'active'});
      return res.status(HttpStatus.OK).json({ message: 'Branch created successfully', data: branch });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getBranch(@Req() req, @Res() res) {
    try {
      const branch = await this.branchService.getBranch(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Branch fetched successfully', data: branch });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put('/:id')
  async updateBranch(@Req() req, @Res() res) {
    try {
      const body = JSON.parse(JSON.stringify(req.body))
      body['tenant'] = req.user.tenant
      const branch = await this.branchService.updateBranch(req.params.id, body);
      return res.status(HttpStatus.OK).json({ message: 'Branch updated successfully', data: branch });
    } catch (error) { 
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete('/:id')
  async deleteBranch(@Res() res, @Param('id') id: string) {
    try {
      await this.branchService.deleteBranch(id);
      return res.status(HttpStatus.OK).json({ message: 'Branch deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}