import { Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { FeeSubCategoryService } from "src/services/feeSubCategory.service";


@Controller('feeSubCategory')
export class FeeSubCategoryController {
    constructor(private readonly feeSubCategoryService: FeeSubCategoryService) {}

    @Post()
    async createFeeSubCategory(@Req() req, @Res() res) {
        try {
            const body = JSON.parse(JSON.stringify(req.body))
            body['tenant'] = req.user.tenant
            const feeSubCategory = await this.feeSubCategoryService.createFeeSubCategory(body);
            return res.status(HttpStatus.OK).json({ message: 'Fee Sub Category created successfully', data: feeSubCategory });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Get('/:id')
    async getFeeSubCategory(@Req() req, @Res() res) {
        try {
            const feeSubCategory = await this.feeSubCategoryService.getFeeSubCategory(req.params.id);
            return res.status(HttpStatus.OK).json({ message: 'Fee Sub Category fetched successfully', data: feeSubCategory });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Get()
    async getFeeSubCategories(@Req() req, @Res() res) {
        try {
            const feeSubCategories = await this.feeSubCategoryService.findAll(req.user.tenant);
            return res.status(HttpStatus.OK).json({ message: 'Fee Sub Categories fetched successfully', data: feeSubCategories });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Put('/:id')
    async updateFeeSubCategory(@Req() req, @Res() res) {
        try {
            const feeSubCategory = await this.feeSubCategoryService.updateFeeSubCategory(req.params.id, req.body);
            return res.status(HttpStatus.OK).json({ message: 'Fee Sub Category updated successfully', data: feeSubCategory });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Delete('/:id')
    async deleteFeeSubCategory(@Req() req, @Res() res) {
        try {
            const feeSubCategory = await this.feeSubCategoryService.deleteFeeSubCategory(req.params.id);
            return res.status(HttpStatus.OK).json({ message: 'Fee Sub Category deleted successfully', data: feeSubCategory });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
}   