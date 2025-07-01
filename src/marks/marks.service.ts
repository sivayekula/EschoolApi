import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Marks } from "./marks.schema";
import { Model } from "mongoose";

@Injectable()
export class MarksService {
    constructor( 
        @InjectModel(Marks.name) private readonly marksModel: Model<Marks>,
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
            return await this.marksModel.findOne({exam: examId}).populate('academicYear').populate({path: 'exam', populate: [{path: 'section'}, {path: 'class'}, {path: 'board'}]}).populate({path: 'marksDetails.student', select: 'firstName lastName profilePic admissionNumber fatherDetails motherDetails DOB presentAddress rollNumber', model: 'Student'});
        } catch (error) {
            throw error;
        }
    }

    async getMarksByStudent(studentId: string, academicYear: string, branchId: string, tenantId: string) {
        try {
            return await this.marksModel.find({ academicYear: academicYear, branch: branchId, tenant: tenantId, 'marksDetails.student': studentId }, {
                'marksDetails.$': 1  // Only return the matched element from the array
              }).populate('exam');
        } catch (error) {
            throw error;
        }
    }
}