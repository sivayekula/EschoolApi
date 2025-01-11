import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from "src/dto/createStudent.dto";
import { Public } from "./login.controller";
import { RoleService } from "src/services/role.service";
import { AcademicService } from "src/services/academic.service";
import { FeeService } from "src/services/fee.service";
import { StudentFeesService } from "src/services/studentFees.service";

@Controller('student')
export class StudentController {

  constructor(
    private readonly studentService: StudentService,
    private readonly roleService: RoleService,
    private readonly academicService: AcademicService,
    private readonly feeService: FeeService,
    private readonly studentFeesService: StudentFeesService
  ) {}

  @Public()
  @Post('')
  async create(@Req() req, @Res() res, @Body() createStudentDto: CreateStudentDto) {
    try {
      const getRoleData = await this.roleService.getRole('student');
      const requestBoy = JSON.parse(JSON.stringify(createStudentDto))
      console.log('requestBoy', requestBoy)
      requestBoy['password'] = createStudentDto.firstName.replace(/\s+/g, '').slice(0, 4) + new Date(createStudentDto.DOB).getFullYear();
      requestBoy['role'] = getRoleData._id;
      requestBoy['tenant']= req.user.user.tenant;
      requestBoy['createdBy'] = req.user.user._id;
      const newStudent = await this.studentService.createStudent( requestBoy )
      await this.academicService.createAcademic({ student: newStudent._id, class: requestBoy.academicDetails.class, section: requestBoy.academicDetails.section, academicYear: requestBoy.academicDetails.academicYear, tenant: req.user.user.tenant });
      const fees = requestBoy.feesData.map(fee => {
        return fee.id
      })
      console.log('fees', fees)
      let feeData = await this.feeService.getFees('', fees);
      console.log('feeData', feeData)
      const studentFees = requestBoy.feesData.map(fee => {
        let indx = feeData.findIndex(f => f._id.toString() === fee.id)
        return {
          student: newStudent._id,
          fees: fee.id,
          tenant: req.user.user.tenant,
          feeType: fee.duration,
          dueDate: fee.dueDate,
          discount: fee.discount,
          paybalAmount: fee.installmentAmount,
          amount : fee.totalFee
        }
      })
      await this.studentFeesService.createFees(studentFees)
      return res.status(HttpStatus.CREATED).json({ message: 'Student created successfully', data: newStudent });
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('')
  async getStudents(@Res() res, @Req() req) {
    try {
      const students = await this.studentService.getStudent(req.user.user.tenant)
      return res.status(HttpStatus.OK).json({ message: 'Students fetched successfully', data: students });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getById(@Res() res, @Param('id') id: string) {
    try {
      const student = await this.studentService.getStudentById(id)
      return res.status(HttpStatus.OK).json({ message: 'Student fetched successfully', data: student });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('/details/:id')
  async getStudent(@Req() req, @Res() res) {
    try {
      const [student, academic, fees] = await Promise.all([this.studentService.getStudentDetails(req.params.id), this.academicService.getAcademicByStudent(req.params.id), this.studentFeesService.getFeesByStudent(req.params.id)]);
      const data = JSON.parse(JSON.stringify(student))
      data['academics'] = academic
      data['fees'] = fees
      return res.status(HttpStatus.OK).json({ message: 'Student fetched successfully', data: data });
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}