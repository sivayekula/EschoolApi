import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { AcademicService } from "src/services/academic.service";


@Controller('academics')
export class AcademicController {
  constructor(
    private readonly academicService: AcademicService
  ) {}

  @Get(':classId?/:sectionId?')
  async getAcademics(@Req() req, @Res() res) {
    try {
      const academics = await this.academicService.getAcademics(req.user.tenant, req.params.classId, req.params.sectionId);
      return res.status(HttpStatus.OK).json({ message: 'Academics fetched successfully', data: academics });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

}