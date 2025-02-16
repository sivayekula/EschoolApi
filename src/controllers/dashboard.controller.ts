import { Controller, HttpStatus, Req, Res } from "@nestjs/common";
import { StaffService } from "src/services/staff.service";
import { StudentService } from "src/services/student.service";


@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly studentService: StudentService,
    private readonly staffService: StaffService    
  ) {}

  async getDashboard(@Req() req, @Res() res) {
    try {
      const studentCount = await this.studentService.getStudentCount(req.user.tenant);
      return res.status(HttpStatus.OK).json({ data: studentCount });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}