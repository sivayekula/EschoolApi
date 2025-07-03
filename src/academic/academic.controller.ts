import { Controller, Delete, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { AcademicService } from "../academic/academic.service";
import { StudentFeesService } from "../studentFees/studentFees.service";
import { AcademicYearService } from '../academicYears/academicYear.service';
import { StudentService } from "../student/student.service";


@Controller('academics')
export class AcademicController {
  constructor(
    private readonly academicService: AcademicService,
    private readonly studentFeesService: StudentFeesService,
    private readonly academicYearService: AcademicYearService,
    private readonly studentService: StudentService
  ) {}

   @Get('student/:studentId')
  async getAcademicByStudent(@Req() req, @Res() res) {
    try {
      const academic = await this.academicService.getAcademicByStudent(req.params.studentId, req.user.academicYear);
      let resp = req.user.device === 'webApp' ? academic : { 
        academic: academic._id,
        academicYear: academic.academicYear?.year,
        _id: academic.student._id,
        firstName: academic.student.firstName,
        lastName: academic.student.lastName,
        rollNo: academic.student.rollNumber,
        dob: academic.student.DOB,
        profilePic: academic.student.profilePic,
        admissionNumber: academic.student.admissionNumber,
        mobileNumber: academic.student.mobileNumber,
        class: academic.class,
        section: academic.section,
        fatherDetails: academic.student.fatherDetails,
        aadharPic: academic.student.aadharPic,
      }
      return res.status(HttpStatus.OK).json({ message: 'Academic fetched successfully', data: resp });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':classId?/:sectionId?')
  async getAcademics(@Req() req, @Res() res) {
    try {
      const academics = await this.academicService.getAcademics(req.user.tenant, req.user.branch, req.user.academicYear, req.params.classId, req.params.sectionId, req.query.status);
      return res.status(HttpStatus.OK).json({ message: 'Academics fetched successfully', data: academics });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async promoteStudents(@Req() req, @Res() res) {
    try {
      let remainingFees = {};
      let newFees = {};
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
      let key = Object.keys(remainingFees);
      for (let studentId of key) {
        if (remainingFees[studentId].length > 0) {
          remainingFees[studentId].forEach(fee => {
            fee.paymentStatus='pending';
            fee.totalFee = fee.paybalAmount*1 + fee.discount*1;
            fee.paybalAmount= fee.pendingAmount*1;
            fee.paidAmount = 0;
            fee.discount = 0;
            fee.isCarryForward= true;
            fee.description= fee.description ? fee.description +' and '+ 'Carry Forward fee' : 'Carry Forward fee';
            if (newFees[studentId]) {
              newFees[studentId].push(fee);
            } else {
              newFees[studentId] = [fee];
            }
          })
        }
      }

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
            if (newFees[studentId]) {
              await this.studentFeesService.createFees({ student: studentId, feeList: newFees[studentId], tenant: req.user.tenant, branch:req.user.branch, createdBy: req.user._id, academics: currentAcademic._id, academicYear: academicYear });
            }
            let index = fees.findIndex(fee => fee.student.toString() === studentId.toString());
            if (index !== -1) {
              await this.studentFeesService.updateFees(fees[index]._id as string, { feeList: fees[index].feeList });
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
      // const studentFees = await this.studentFeesService.getFeesByStudentAndAcademic(studentIds, req.user.academicYear);
      // let canDelete = true;
      // studentFees.forEach(async(fee) => {
      //   fee.feeList.forEach(async(feeList) => {
      //     if (feeList.paymentStatus !== 'paid' && canDelete) {
      //       canDelete = false;
      //     }
      //   })
      // })
      // if (!canDelete) {
      //   throw new Error('Cannot delete / transfer student with outstanding fees');
      // }
      await this.studentService.updateStudentBulk(studentIds, status);
      await this.academicService.deleteAcademics(studentIds, status);
      return res.status(HttpStatus.OK).json({ message: status === 'active' ? 'student activated successfully' : 'Academic deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}