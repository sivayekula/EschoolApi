import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FeeSubCategory } from "./feeSubCategory.schema";
import { Model } from "mongoose";


@Injectable()
export class FeeSubCategoryService {
    constructor(
        @InjectModel(FeeSubCategory.name) private readonly feeSubCategoryModel: Model<FeeSubCategory>,
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
            const feeSubCategories = await this.feeSubCategoryModel.find();
            return feeSubCategories;
        } catch (error) {
            throw error;
        }
    }
}   