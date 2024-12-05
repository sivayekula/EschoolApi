import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IClass } from "src/interfaces/class.interface";
import { ISubject } from "src/interfaces/subject.interface";


@Injectable()
export class GlobalService {

  constructor(
    @InjectModel('Class') private readonly classModel: Model<IClass>,
    @InjectModel('Subject') private readonly subjectModel: Model<ISubject>
  ) {}

  async fetchClasses(tenant:string): Promise<IClass[]> {
    return await this.classModel.find();
  }

  async saveSubject(subject:ISubject): Promise<ISubject> {
    return await this.subjectModel.create(subject);
  }

  async fetchSubjects(tenant:string): Promise<ISubject[]> {
    return await this.subjectModel.find({ tenant : tenant });
  }

}