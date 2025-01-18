import { Controller, Get, HttpStatus, Post, Query, Req, Res } from "@nestjs/common";
import { MarksService } from "src/services/marks.service";


@Controller('marks')
export class MarksController {
    constructor(
        private readonly marksService: MarksService
    ){}

    @Get('')
    async getMarks(@Query('examId') examId: string, @Res() res) {
        try {
            const marks = await this.marksService.getMarks(examId);
            return res.status(HttpStatus.OK).json({ message: 'Marks fetched successfully', data: marks });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Post('')
    async createMarks(@Req() req, @Res() res) {
        try {
            const requestBody = JSON.parse(JSON.stringify(req.body))
            requestBody['tenant'] = req.user.tenant
            requestBody['academicYear'] = req.headers['x-academic-year']
            const marks = await this.marksService.createMarks(requestBody);
            return res.status(HttpStatus.CREATED).json({ message: 'Marks created successfully', data: marks });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
}