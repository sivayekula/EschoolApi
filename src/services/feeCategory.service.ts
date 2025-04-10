import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class FeeCategoryService {
    constructor(
        @InjectModel('FeeCategory') private readonly feeCategoryModel
    ) {}

    async createFeeCategory(data: any) {
        try {
            const feeCategory = await this.feeCategoryModel.create(data);
            return feeCategory;
        } catch (error) {
            throw error;
        }
    }

    async getFeeCategory(id: string) {
        try {
            return await this.feeCategoryModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async updateFeeCategory(id: string, data: any) {
        try {
            const feeCategory = await this.feeCategoryModel.findByIdAndUpdate(id, data);
            return feeCategory;
        } catch (error) {
            throw error;
        }
    }

    async deleteFeeCategory(id: string) {
        try {
            const feeCategory = await this.feeCategoryModel.findByIdAndUpdate({_id: id}, {status: 'inactive'});
            return feeCategory;
        } catch (error) {
            throw error;
        }
    }

    async findAll(tenant: string) {
        try {
            return await this.feeCategoryModel.find({tenant: {$in: [tenant, 'global']}})
        } catch (error) {
            throw error;
        }
    }
}   