import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from 'src/dto/createStudent.dto';
import { Public } from './login.controller';
import { RoleService } from 'src/services/role.service';
import { AcademicService } from 'src/services/academic.service';
import { FeeService } from 'src/services/fee.service';
import { StudentFeesService } from 'src/services/studentFees.service';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly roleService: RoleService,
    private readonly academicService: AcademicService,
    private readonly feeService: FeeService,
    private readonly studentFeesService: StudentFeesService,
  ) {}

  @Public()
  @Post('')
  async create(
    @Req() req,
    @Res() res,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    try {
      const getRoleData = await this.roleService.getRole('student');
      const requestBoy = JSON.parse(JSON.stringify(createStudentDto));
      requestBoy['password'] =
        createStudentDto.firstName.replace(/\s+/g, '').slice(0, 4) +
        new Date(createStudentDto.DOB).getFullYear();
      requestBoy['role'] = getRoleData._id;
      requestBoy['tenant'] = req.user.tenant;
      requestBoy['createdBy'] = req.user._id;
      const newStudent = await this.studentService.createStudent(requestBoy);
      await this.academicService.createAcademic({
        student: newStudent._id,
        class: requestBoy.academics.class,
        section: requestBoy.academics.section,
        academicYear: requestBoy.academics.academicYear,
        tenant: req.user.tenant,
      });
      const studentFees = [];
      requestBoy.fees.forEach((fee) => {
        if (fee.isChecked === true) {
          studentFees.push({
            student: newStudent._id,
            fees: fee.id,
            tenant: req.user.tenant,
            feeType: fee.feeType,
            dueDate: fee.dueDate,
            discount: fee.discount,
            paybalAmount: fee.installmentAmount,
            amount: fee.totalFee,
          });
        }
      });
      await this.studentFeesService.createFees(studentFees);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Student created successfully', data: newStudent });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Post('bulk')
  async createBulk(
    @Req() req,
    @Res() res,
    @Body() createStudentDto: CreateStudentDto[],
  ) {
    try {
      const getRoleData = await this.roleService.getRole('student');
      const requestBody = JSON.parse(JSON.stringify(createStudentDto));
      for (let student of requestBody) {
        student['password'] =
        student.firstName.replace(/\s+/g, '').slice(0, 4) +
        new Date(student.DOB).getFullYear();
        student['role'] = getRoleData._id;
        student['tenant'] = req.user.tenant;
        student['createdBy'] = req.user._id;
      const newStudent = await this.studentService.createStudent(student);
      await this.academicService.createAcademic({
        student: newStudent._id,
        class: student.academics.class,
        section: student.academics.section,
        academicYear: student.academics.academicYear,
        tenant: req.user.tenant,
      });
      const feeData = await this.feeService.getFee(req.user.tenant, student.academics.class, 'tution');
      const studentFees = [];
      feeData.forEach((fee) => {
          studentFees.push({
            student: newStudent._id,
            fees: feeData._id,
            tenant: req.user.tenant,
            feeType: 'oneTime',
            dueDate: feeData.dueDate || new Date(),
            discount: feeData.discount || 0,
            paybalAmount: feeData.amount,
            amount: feeData.amount,
          });
      });
      await this.studentFeesService.createFees(studentFees);
    }
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Student created successfully'});
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Put(':id')
  async update(@Req() req, @Res() res, @Param('id') id: string, @Body() body) {
    try {
      const { fees, academics, ...result } = body;
      delete result.password;
      delete result._id;
      delete result.createdBy;
      delete result.tenant;
      delete result.__v;
      delete result.role;
      delete result.status;
      delete result.updatedAt;
      delete result.createdAt;
      const student = await this.studentService.updateStudent(id, result);
      await this.academicService.updateAcademic(id, {
        class: academics.class,
        section: academics.section,
        academicYear: academics.academicYear,
      });
      let studentFees = await this.studentFeesService.getFeesByStudent(id);
      await this.studentFeesService.deleteFees(
        studentFees.map((fee) => fee._id),
      );
      const newFees = [];
      fees.forEach((fee) => {
        if (fee.isChecked === true) {
          newFees.push({
            student: id,
            fees: fee.id,
            tenant: req.user.tenant,
            feeType: fee.feeType,
            dueDate: fee.dueDate,
            discount: fee.discount,
            paybalAmount: fee.installmentAmount,
            amount: fee.totalFee,
          });
        }
      });
      await this.studentFeesService.createFees(newFees);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Student updated successfully', data: student });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get('')
  async getStudents(@Res() res, @Req() req) {
    try {
      const students = await this.studentService.getStudent(req.user.tenant);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Students fetched successfully', data: students });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get('attendance')
  async getAttendance(@Req() req, @Res() res) {
    try {
      const attendance = await this.studentService.getAttendance(
        req.user.tenant,
      );
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Attendance fetched successfully', data: attendance });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  async getById(@Res() res, @Param('id') id: string) {
    try {
      const student = await this.studentService.getStudentById(id);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Student fetched successfully', data: student });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get('details/:id')
  async getStudent(@Req() req, @Res() res) {
    try {
      const [student, academic, fees] = await Promise.all([
        this.studentService.getStudentDetails(req.params.id),
        this.academicService.getAcademicByStudent(req.params.id),
        this.studentFeesService.getFeesByStudent(req.params.id),
      ]);
      const data = JSON.parse(JSON.stringify(student));
      data['academics'] = academic;
      data['fees'] = fees;
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Student fetched successfully', data: data });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  async delete(@Res() res, @Param('id') id: string) {
    try {
      await this.studentService.deleteStudent(id);
      return res.status(HttpStatus.OK).json({ message: 'Student deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}
