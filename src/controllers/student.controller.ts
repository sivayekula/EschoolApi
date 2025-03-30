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
import { CreateStudentDto } from '../dto/createStudent.dto';
import { RoleService } from '../services/role.service';
import { AcademicService } from '../services/academic.service';
import { FeeService } from '../services/fee.service';
import { StudentFeesService } from '../services/studentFees.service';

function getFees(fees) {
  const newFees = [];
  for (let fee of fees) {
    if (fee.isChecked === true) {
      newFees.push({
        fee: fee.id,
        duration: fee.feeType,
        dueDate: fee.dueDate,
        paidAmount: 0,
        discount: fee.discount,
        paybalAmount: fee.installmentAmount,
        paymentStatus: 'pending'
      });
    }
  }
  return newFees;
}

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly roleService: RoleService,
    private readonly academicService: AcademicService,
    private readonly feeService: FeeService,
    private readonly studentFeesService: StudentFeesService,
  ) {}

  @Post()
  async create(
    @Req() req,
    @Res() res,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    try {
      const getRoleData = await this.roleService.getRole('student');
      const requestBoy = JSON.parse(JSON.stringify(createStudentDto));
      const studentCount = await this.academicService.getStudentsByClassAndSection(req.user.tenant, requestBoy.academics.class, requestBoy.academics.section);
      requestBoy['password'] =
        createStudentDto.firstName.replace(/\s+/g, '').slice(0, 4).toLowerCase() +
        new Date(createStudentDto.DOB).getFullYear();
      requestBoy['role'] = getRoleData._id;
      requestBoy['tenant'] = req.user.tenant;
      requestBoy['createdBy'] = req.user._id;
      requestBoy['rollNumber'] = studentCount + 1;
      requestBoy['branch'] = req.user.branch || null;
      requestBoy['busRoute'] = requestBoy.busRoute ? requestBoy.busRoute : null;
      const newStudent = await this.studentService.createStudent(requestBoy);
      const academic = await this.academicService.createAcademic({
        student: newStudent._id,
        class: requestBoy.academics.class,
        section: requestBoy.academics.section,
        academicYear: req.user.academicYear,
        board: requestBoy.academics.board,
        branch: req.user.branch,
        tenant: req.user.tenant,
        createdBy: req.user._id
      });
      const fees = getFees(requestBoy.fees);
      if (fees.length > 0) {
        const studentFees = {
          student: newStudent._id,
          academics: academic._id,
          academicYear: req.user.academicYear,
          branch: req.user.branch,
          tenant: req.user.tenant,
          feeList: fees,
          createdBy: req.user._id
        }
        await this.studentFeesService.createFees(studentFees);
      }
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
      const fees = getFees(feeData);
      if (fees.length === 0) {
        const studentFees = {
          student: newStudent._id,
          tenant: req.user.tenant,
          feeList: fees
        }
        await this.studentFeesService.createFees(studentFees);
      }
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
      const academic = await this.academicService.updateAcademic(id, {
        class: academics.class,
        section: academics.section,
        board: academics.board,
        academicYear: academics.academicYear,
      });
      let studentFee = await this.studentFeesService.getFeesByStudent(id);
      const allSelectedFees = getFees(fees);
      if (studentFee) {
        let updatedFees = allSelectedFees.map((item) => {
          let index = studentFee.feeList.findIndex((fee) => item.fee.toString() === fee.fee._id.toString())
          if (index !== -1) {
            return studentFee.feeList[index]
          } else {
            return item
          }
        })
        await this.studentFeesService.updateFees(studentFee._id, {
          feeList: updatedFees
        });
      } else {
        await this.studentFeesService.createFees({
          student: id,
          tenant: req.user.tenant,
          academicYear: academics.academicYear,
          branch: req.user.branch,
          academics: academic._id,
          feeList: allSelectedFees,
          createdBy: req.user._id
        });
      }
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Student updated successfully', data: student });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get()
  async getStudents(@Res() res, @Req() req) {
    try {
      const students = await this.studentService.getStudent(req.user.tenant, req.headers.branch);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Students fetched successfully', data: students });
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
      await this.academicService.deleteAcademic(id);
      return res.status(HttpStatus.OK).json({ message: 'Student deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}
