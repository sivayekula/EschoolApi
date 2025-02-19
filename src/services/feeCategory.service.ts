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
            const feeCategory = await this.feeCategoryModel.findById(id);
            return feeCategory;
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
            let qry = {$or:[{tenant: tenant}, {tenant: 'global'}], status: 'active'};
            const feeCategories = await this.feeCategoryModel.find(qry);
            return feeCategories;
        } catch (error) {
            throw error;
        }
    }
}   