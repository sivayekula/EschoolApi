import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { AttendanceService } from "../services/attendance.service";
import { SmsTemplateService } from '../services/smsTemplate.service';
import { StudentService } from "../services/student.service";
import { WhatsAppService } from "../services/whatsApp.service";
import { ClassService } from "../services/class.service";
import { create } from "domain";


@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly smsTemplateService: SmsTemplateService,
    private readonly classService: ClassService,
    private readonly studentService: StudentService,
    private readonly whatsAppService: WhatsAppService
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

  @Get()
  async getAttendance(@Req() req, @Res() res) {
    try {
      if (!req.query.userType) throw new Error('User type is required');
      const attendance = await this.attendanceService.getAttendance(req.user.tenant, req.user.branch, req.user.academicYear, req.query.date, req.query.userType, req.query.month, req.query.year, req.query.class, req.query.section);
      return res.status(HttpStatus.OK).json({message: 'Attendance fetched successfully', data: attendance});
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
        let smsTemplate = await this.smsTemplateService.findTemplate('', 'attendance_eng')
        // let smsbalance = await this.whatsAppService.checkBalance('', '');
        // console.log(smsbalance, 'smsbalance');
        let message = smsTemplate?.template;
        if (message) {
          for (let i = 0; i < students.length; i++) {
            message = message.replace('{{studentName}}', students[i].firstName + ' ' + students[i].lastName);
            message = message.replace('{{InstituteName}}', students[i].branch.name);
            message = message.replace('{{date}}', reqData.date);
            message = message.replace('{{class}}', classData.name);
            await this.whatsAppService.sendSms('', '', students[i].fatherDetails.mobileNumber, message);
          }
        }
      }
      return res.status(HttpStatus.CREATED).json({message: 'Attendance created successfully', data: response});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }
}