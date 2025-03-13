import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import path from "path";

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
            return await this.marksModel.findOne({exam: examId}).populate('academicYear').populate({path: 'exam', populate: [{path: 'section'}, {path: 'class'}, {path: 'board'}]}).populate({path: 'marksDetails.student', select: 'firstName lastName profilePic admissionNumber fatherDetails motherDetails DOB presentAddress', model: 'Student'});
        } catch (error) {
            throw error;
        }
    }
}