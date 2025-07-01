import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { TemplateService } from '../notifications/templates/template.service';
import { StudentService } from "../student/student.service";
import { WhatsAppService } from "../notifications/whatsApp/whatsApp.service";
import { ClassService } from "../class/class.service";
import { BranchService } from "../branch/branch.service";
import { SmsService } from "../notifications/sms/sms.service";


@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly templateService: TemplateService,
    private readonly classService: ClassService,
    private readonly studentService: StudentService,
    private readonly whatsAppService: WhatsAppService,
    private readonly branchService: BranchService,
    private readonly smsService: SmsService
  ) {}

  @Put()
  async updateAttendance(@Req() req, @Res() res) {
    try {
      const attendance = await this.attendanceService.updateAttendances(req.body.id, req.body.userId, req.body.attendanceStatus);
      return res.status(HttpStatus.OK).json({message: 'Attendance updated successfully', data: attendance});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }

  @Get('student/:studentId')
  async getAttendanceByStudentId(@Req() req, @Res() res) {
    try {
      const attendance = await this.attendanceService.getAttendanceByStudentId(req.params.studentId, req.query.month, req.query.year);
      return res.status(HttpStatus.OK).json({message: 'Attendance fetched successfully', data: attendance});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }

  @Get('report')
  async getAttendanceReport(@Req() req, @Res() res) {
    try {
      const attendance = await this.attendanceService.getAttendanceReport(req.user.tenant, req.user.branch, req.user.academicYear, req.query.type);
      return res.status(HttpStatus.OK).json({message: 'Attendance fetched successfully', data: attendance});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }

  @Get()
  async getAttendance(@Req() req, @Res() res) {
    try {
      if (!req.query.userType) throw new Error('User type is required');
      const attendance = await this.attendanceService.getAttendance(req.user.tenant, req.user.branch, req.user.academicYear, req.query.date, req.query.userType, req.query.month, req.query.year, req.query.classId, req.query.sectionId);
      let resp= attendance
      if(req.user.device === 'mobile') {
        resp = attendance.map((element: any) => {
          let attstatus= []
          element.attendance.map((item: any) => {
            return attstatus.push({
              studentId: item.userId._id,
              attendanceStatus: item.attendanceStatus,
              firstName: item.userId.firstName,
              lastName: item.userId.lastName,
              rollNo: item.userId.rollNumber,
              profilePic: item.userId.profilePic,
            })
          })
          return {
            _id: element._id,
            userType: element.userType,
            date: element.date,
            class: element.class,
            section: element.section,
            academicYear: element.academicYear,
            attendance: attstatus
          }
        })
      }
      return res.status(HttpStatus.OK).json({message: 'Attendance fetched successfully', data: resp});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }

  @Post()
  async createAttendance(@Req() req, @Body() body, @Res() res) {
    try {
      let absentStudents = []
      const data = JSON.parse(JSON.stringify(body))
      const attendance = data.attendance.map(element => {
        if (element.attendanceStatus === 'absent') {
          absentStudents.push(element._id)
        }
        return {
          userId: element._id,
          attendanceStatus: element.attendanceStatus,
        }
      })
      const reqData = {
        userType: data.userType,
        date: data.date,
        attendance: attendance,
        class: data.class,
        section: data.section,
        academicYear: req.user.academicYear,
        tenant: req.user.tenant,
        branch: req.user.branch,
        createdBy: req.user._id
      }
      const response = await this.attendanceService.createAttendance(reqData);
      if (data.sendSms && absentStudents.length) {
        let students = await this.studentService.getStudentList(absentStudents);
        let classData = await this.classService.getClass(reqData.class);
        let whatappTemplate = await this.templateService.findTemplate('', 'attendance_eng', 'whatsapp')
        let smsTemplate = await this.templateService.findTemplate('', 'attendance_eng', 'sms')
        let branchData = await this.branchService.getBranch(req.user.branch);
        let template = whatappTemplate?.template;
        if (template) {
          for (let student of students) {
            let message = template
            message = message.replace('{{studentName}}', student.firstName + ' ' + student.lastName);
            message = message.replace('{{InstituteName}}', branchData.name);
            message = message.replace('{{date}}', reqData.date);
            message = message.replace('{{class}}', classData.name);
            await this.whatsAppService.sendSms(branchData.whatsappUserId, branchData.whatsappPassword, student.fatherDetails.mobileNumber, message);
          }
        }
        if(smsTemplate?.template) {
          for (let student of students) {
            let message = smsTemplate.template
            message = message.replace('{{studentName}}', student.firstName + ' ' + student.lastName);
            message = message.replace('{{InstituteName}}', branchData.name);
            message = message.replace('{{date}}', reqData.date);
            message = message.replace('{{class}}', classData.name);
            await this.smsService.sendSms(branchData.whatsappUserId, branchData.whatsappPassword, student.fatherDetails.mobileNumber, message, smsTemplate.templateId);
          }
        }
      }
      return res.status(HttpStatus.CREATED).json({message: 'Attendance created successfully', data: response});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }
}