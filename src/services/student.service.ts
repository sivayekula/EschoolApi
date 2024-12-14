import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IStudent } from "src/interfaces/student.interface";
import { CreateStudentDto } from '../dto/createStudent.dto';
import { IAcadamic } from "src/interfaces/acadamic.interface";


@Injectable()
export class StudentService {

  constructor(
    @InjectModel('Student') private studentModel: Model<IStudent>,
    @InjectModel('AcadamicSchema') private acadamicModel: Model<IAcadamic>
  ){}
  
  async createStudent( createStudentDto ): Promise<IStudent> {
    try {
      let student = await this.studentModel.create(createStudentDto);
      await this.acadamicModel.create({ student: student._id, class: createStudentDto.class, section: createStudentDto.section, acadamicYear: createStudentDto.acadamicYear, status: 'active' });
      return student
    } catch (error) {
      throw error;
    }
  }

  async getStudent(): Promise<IStudent[]> {
    try {
      return await this.studentModel.find();
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(id: string): Promise<IStudent> {
    try {
      return await this.studentModel.findById(id);
    } catch (error) {
      throw error;
    }
  }
}