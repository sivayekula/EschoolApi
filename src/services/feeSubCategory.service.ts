import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class FeeSubCategoryService {
    constructor(
        @InjectModel('FeeSubCategory') private readonly feeSubCategoryModel
    ) {}

    async createFeeSubCategory(data: any) {
        try {
            const feeSubCategory = await this.feeSubCategoryModel.create(data);
            return feeSubCategory;
        } catch (error) {
            throw error;
        }
    }

    async getFeeSubCategory(id: string) {
        try {
            const feeSubCategory = await this.feeSubCategoryModel.findById(id);
            return feeSubCategory;
        } catch (error) {
            throw error;
        }
    }

    async updateFeeSubCategory(id: string, data: any) {
        try {
            const feeSubCategory = await this.feeSubCategoryModel.findByIdAndUpdate(id, data, {new: true});
            return feeSubCategory;
        } catch (error) {
            throw error;
        }
    }

    async deleteFeeSubCategory(id: string) {
        try {
            const feeSubCategory = await this.feeSubCategoryModel.findByIdAndUpdate({_id: id}, {status: 'inactive'});
            return feeSubCategory;
        } catch (error) {
            throw error;
        }
    }

    async findAll(tenant: string) {
        try {
            const feeSubCategories = await this.feeSubCategoryModel.find({tenant});
            return feeSubCategories;
        } catch (error) {
            throw error;
        }
    }
}   