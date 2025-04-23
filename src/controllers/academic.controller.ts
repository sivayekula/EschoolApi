import { Controller, Delete, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { AcademicService } from "../services/academic.service";
import { StudentFeesService } from "../services/studentFees.service";
import { AcademicYearService } from '../services/academicYear.service';
import { StudentService } from "../services/student.service";


@Controller('academics')
export class AcademicController {
  constructor(
    private readonly academicService: AcademicService,
    private readonly studentFeesService: StudentFeesService,
    private readonly academicYearService: AcademicYearService,
    private readonly studentService: StudentService
  ) {}

  @Get(':classId?/:sectionId?')
  async getAcademics(@Req() req, @Res() res) {
    try {
      const academics = await this.academicService.getAcademics(req.user.tenant, req.user.branch, req.user.academicYear, req.params.classId, req.params.sectionId);
      return res.status(HttpStatus.OK).json({ message: 'Academics fetched successfully', data: academics });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async promoteStudents(@Req() req, @Res() res) {
    try {
      let remainingFees = {};
      const { studentIds, classId, sectionId, academicYear } = req.body;
      const academicdata = await this.academicYearService.getAcademicYear(req.user.tenant, req.user.branch, academicYear);
      if (!academicdata || academicdata.status !== 'upcoming') {
        throw new Error('Invalid or inactive academic year');
      }
      const studentFees = await this.studentFeesService.getFeesByStudentAndAcademic(studentIds, req.user.academicYear);
      let fees = [...studentFees];
      fees.forEach(fee => {
        fee.feeList.forEach(feeList => {
          if (feeList.paymentStatus !== 'paid') {
            feeList.paymentStatus = 'carry-forward';
            if (remainingFees[fee.student.toString()]) {
             remainingFees[fee.student.toString()].push(feeList);
            } else {
             remainingFees[fee.student.toString()] = [feeList];
            }
          }
        })
      })

      let studentAcademics =  await this.academicService.getAcademicsByStudents(studentIds, req.user.academicYear);
      let isPromotedSameClass = true;
      let isSameClassForAll = true;
      let studentClass = studentAcademics[0].class.toString();
      studentAcademics.forEach(academic => {
        if (academic.class.toString() === classId) {
          isPromotedSameClass = false;
        }
        if (academic.class.toString() !== studentClass) {
          isSameClassForAll = false;
        }
      })
      if (!isPromotedSameClass) {
        throw new Error("Don't promote students in same class");
      }
      if (!isSameClassForAll) {
        throw new Error("All students should be in same class");
      }
      for (let studentId of studentIds) {
        let academic = await this.academicService.getAcademicByStudent(studentId, academicYear);
        if (!academic) {
          let prevAcademic = await this.academicService.updateAcademic(studentId, { status: 'promoted' });
          if(prevAcademic) {
            let currentAcademic = await this.academicService.createAcademic({ student: studentId, board: prevAcademic.board, class: classId, section: sectionId, academicYear: academicYear, status: 'active', tenant: req.user.tenant, branch:req.user.branch, createdBy: req.user._id});
            if (remainingFees[studentId]) {
              await this.studentFeesService.createFees({ student: studentId, feeList: remainingFees[studentId], tenant: req.user.tenant, branch:req.user.branch, createdBy: req.user._id, academics: currentAcademic._id, academicYear: academicYear });
            }
            let index = fees.findIndex(fee => fee.student.toString() === studentId.toString());
            if (index !== -1) {
              await this.studentFeesService.updateFees(fees[index]._id, { feeList: fees[index].feeList });
            }
          }
        }
      }
      return res.status(HttpStatus.OK).json({ message: 'Students promoted successfully'});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete()
  async delete(@Req() req, @Res() res) {
    try {
      const { studentIds, status } = req.body;
      const studentFees = await this.studentFeesService.getFeesByStudentAndAcademic(studentIds, req.user.academicYear);
      let canDelete = true;
      studentFees.forEach(async(fee) => {
        fee.feeList.forEach(async(feeList) => {
          if (feeList.paymentStatus !== 'paid' && canDelete) {
            canDelete = false;
          }
        })
      })
      if (!canDelete) {
        throw new Error('Cannot delete / transfer student with outstanding fees');
      }
      await this.studentService.updateStudentBulk(studentIds, status);
      await this.academicService.deleteAcademics(studentIds, status);
      return res.status(HttpStatus.OK).json({ message: 'Academic deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}