import { Controller, Get, HttpStatus, Post, Query, Req, Res } from "@nestjs/common";
import mongoose, { mongo } from "mongoose";
import { ExamService } from "src/services/exam.service";
import { MarksService } from "src/services/marks.service";


const getPassPercentage = (students) => {
    let totalStudents = students.length;
    let passStudents = 0;
    for (let i = 0; i < students.length; i++) {
        let isPassed= true;
        for (let j = 0; j < students[i].marks.length; j++) {
            if (students[i].marks[j].marks < students[i].marks[j].passMark) {
                isPassed = false;
                break;
            }
        }
        isPassed && passStudents++;
    }
    return Math.round((passStudents / totalStudents) * 100);
}

@Controller('marks')
export class MarksController {
    constructor(
        private readonly marksService: MarksService,
        private readonly examService: ExamService
    ){}

    @Get()
    async getMarks(@Query('examId') examId: string, @Res() res) {
        try {
            const marks = await this.marksService.getMarks(examId);
            return res.status(HttpStatus.OK).json({ message: 'Marks fetched successfully', data: marks });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Post()
    async createMarks(@Req() req, @Res() res) {
        try {
            const requestBody = JSON.parse(JSON.stringify(req.body))
            const data = {
                exam: requestBody.examId,
                tenant: req.user.tenant,
                academicYear: req.headers['x-academic-year'] || req.user.academicYear,
                createdBy: req.user._id,
                passPercentage: getPassPercentage(requestBody.studentsMarks),
                marksDetails: requestBody.studentsMarks.map((studentMark) => ({
                    student: studentMark.studentId,
                    marks: studentMark.marks.map((mark) => ({
                        subject: mark.subject,
                        marks: mark.marks
                    }))
                })),
            }
            const marks = await this.marksService.createMarks(data);
            await this.examService.updateExam(requestBody.examId, {examStatus: 'completed'});
            return res.status(HttpStatus.CREATED).json({ message: 'Marks Saved successfully', data: marks});
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
}