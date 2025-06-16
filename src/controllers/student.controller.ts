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
import { getListOfFees, mergeFeesIfNotExist } from '../common/utils';

function getFees(fees) {
  const newFees = [];
  for (let fee of fees) {
    
    if (fee.isChecked === true) {
      console.log(fee)
      newFees.push({
        fee: fee.isCarryForward ? fee.fee?._id : fee.id,
        duration: fee.feeType,
        dueDate: fee.dueDate,
        paidAmount: fee.paidAmount || 0,
        discount: fee.discount*1 || 0,
        paybalAmount: fee.installmentAmount*1,
        totalFee: fee.totalFee*1,
        pendingAmount: fee.isCarryForward ? fee.installmentAmount*1 : fee.totalFee*1 - (fee.discount*1 + (fee.paidAmount*1 || 0)),
        paymentStatus: fee.installmentAmount*1 === fee.paidAmount*1 ? 'paid' : fee.paymentStatus || 'pending',
        description: fee.description,
        isCarryForward: fee.isCarryForward || false
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
      const studentCount = await this.academicService.getStudentsByClassAndSection(req.user.tenant, req.user.branch, requestBoy.academics.class, requestBoy.academics.section);
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
    @Res() res
  ) {
    try {
      const getRoleData = await this.roleService.getRole('student');
      const studentCount = await this.academicService.getStudentsByClassAndSection(req.user.tenant, req.user.branch, req.body.bulkUploadList[0].class, req.body.bulkUploadList[0].section);
      let newRollNumber = studentCount;
      let errors = [];
      const aadharList = [];
      req.body.bulkUploadList.forEach((student) => {
        if (student.aadharNumber) {
          aadharList.push(student.aadharNumber.toString());
        }
      })
      let students = [];
      if (aadharList.length > 0) {
        students = await this.studentService.getStudentsByAadhar(req.user.tenant, req.user.branch, aadharList);
      }
      for (let student of req.body.bulkUploadList) {
        try {
          let indx = students.findIndex((s) => s.aadharNumber === student.aadharNumber.toString());
          if (indx !== -1) {
            if(req.body.duplicateHandlingOption == 'overwrite') {
              await this.studentService.updateStudent(students[indx]._id, student);
            } else {
              continue;
            }
          } else {
            student['rollNumber'] = ++newRollNumber;
            student['password'] =
            student.firstName.replace(/\s+/g, '').slice(0, 4) +
            new Date(student.DOB).getFullYear();
            student['role'] = getRoleData._id;
            student['tenant'] = req.user.tenant;
            student['branch'] = req.user.branch;
            student['createdBy'] = req.user._id;
            const newStudent = await this.studentService.createStudent(student);
            await this.academicService.createAcademic({
              student: newStudent._id,
              class: student.class,
              section: student.section,
              academicYear: student.academicYear,
              board: student.board,
              tenant: req.user.tenant,
              branch: req.user.branch,
              createdBy: req.user._id
            });
          }
        } catch (err) {
          errors.push(student.firstName+'-'+err.message);
          continue;
        }
      }
      return res
        .status(HttpStatus.CREATED)
        .json({ message: errors.length > 0 ? `Those students are having issue: ${errors.join(', ')}` : 'Student created successfully'});
    } catch (error) {
      console.log(error)
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
      result['busRoute'] = body.busRoute ? body.busRoute : null;
      const student = await this.studentService.updateStudent(id, result);
      const academic = await this.academicService.updateAcademic(id, {
        class: academics.class,
        section: academics.section,
        board: academics.board,
        academicYear: academics.academicYear,
      });
      let studentFee = await this.studentFeesService.getFeeByStudent(id, req.user.academicYear);
      const allSelectedFees = getFees(fees);
      let updatedFees = getListOfFees(studentFee?.feeList || [], allSelectedFees);
      if (studentFee) {
        await this.studentFeesService.updateFees(studentFee._id, {
          feeList: updatedFees
        });
      } else {
        await this.studentFeesService.createFees({
          student: id,
          tenant: req.user.tenant,
          academicYear: academics.academicYear,
          branch: req.user.branch,
          academics: Array.isArray(academic) ? academic[0]._id : academic._id,
          feeList: updatedFees,
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

  @Post('addFees')
  async addFees(@Req() req, @Res() res, @Body() body) {
    try {
      const allSelectedFees = getFees(body.fees);
      for (let student of body.studentIds) {
        const studentFee = await this.studentFeesService.getFeeByStudent(student, req.user.academicYear);
        let updatedFees = mergeFeesIfNotExist(studentFee?.feeList || [], allSelectedFees);
        if (studentFee) {
          studentFee.feeList
          await this.studentFeesService.updateFees(studentFee._id, {
            feeList: updatedFees
          });
        } else {
          let academic = await this.academicService.getAcademicByStudent(student, req.user.academicYear);
          await this.studentFeesService.createFees({
            student: student,
            tenant: req.user.tenant,
            academicYear: req.user.academicYear,
            branch: req.user.branch,
            academics: academic._id,
            feeList: updatedFees,
            createdBy: req.user._id
          });
        }
      }
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Fees added successfully' });
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
        this.academicService.getAcademicByStudent(req.params.id, req.user.academicYear),
        this.studentFeesService.getFeesByStudent(req.params.id, req.user.academicYear),
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
