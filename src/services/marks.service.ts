import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class MarksService {
    constructor( 
        @InjectModel('Marks') private readonly marksModel
    ){}

    async createMarks(marks) {
        try {
            return await this.marksModel.create(marks);
        } catch (error) {
            throw error;
        }
    }

    async getMarks(examId: string) {
        try {
            return await this.marksModel.find({exam: examId}).populate('student').populate('class').populate('section').populate('academicYear').populate('exam');
        } catch (error) {
            throw error;
        }
    }
}