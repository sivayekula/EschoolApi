import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IStudent } from "src/interfaces/student.interface";
import { AcademicService } from "./academic.service";
import { FeeService } from "./fee.service";


@Injectable()
export class StudentService {

  constructor(
    @InjectModel('Student') private studentModel: Model<IStudent>,
    private academicService: AcademicService,
    private feeService: FeeService
  ){}
  
  async createStudent( createStudentDto ): Promise<IStudent> {
    try {
      let student = await this.studentModel.create(createStudentDto);
      return student
    } catch (error) {
      throw error;
    }
  }

  async getStudent(tenantId): Promise<IStudent[]> {
    try {
      return await this.studentModel.find({ tenant: tenantId, status: 'active' });
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

  async getStudentDetails(id: string): Promise<any> {
    try {
      const [student, academic, fee] = await Promise.all([this.studentModel.findById(id), this.academicService.getAcademicByStudent(id), this.feeService.getFeesByStudent(id)]);
      return { student, academic, fee };
    } catch (error) {
      throw error;
    }
  }
}