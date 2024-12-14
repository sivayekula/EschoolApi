import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from "src/dto/createStudent.dto";
import { Public } from "./login.controller";

@Controller('student')
export class StudentController {

  constructor(private readonly studentService: StudentService) {}
  @Public()
  @Post('')
  async create( @Res() res, @Body() createStudentDto: CreateStudentDto) {
    try {
      console.log(createStudentDto);
      return res.status(HttpStatus.OK).json({ message: 'Student created successfully', data: createStudentDto });
      // const newStudent = await this.studentService.createStudent( createStudentDto )
      // return res.status(HttpStatus.CREATED).json({ message: 'Student created successfully', data: newStudent });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('')
  async get(@Res() res) {
    try {
      const students = await this.studentService.getStudent()
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
}