import { Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { FeeCategoryService } from "./feeCategory.service";


@Controller('feeCategory')
export class FeeCategoryController {
    constructor(
        private readonly feeCategoryService: FeeCategoryService
    ) {}

    @Post()
    async createFeeCategory(@Req() req, @Res() res) {
        try {
            const body = JSON.parse(JSON.stringify(req.body))
            body['createdBy'] = req.user._id
            const feeCategory = await this.feeCategoryService.createFeeCategory(body);
            return res.status(HttpStatus.OK).json({ message: 'Fee Category created successfully', data: feeCategory });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Get('/:id')
    async getFeeCategory(@Req() req, @Res() res) {
        try {
            const feeCategory = await this.feeCategoryService.getFeeCategory(req.params.id);
            return res.status(HttpStatus.OK).json({ message: 'Fee Category fetched successfully', data: feeCategory });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Get()
    async getFeeCategories(@Req() req, @Res() res) {
        try {
            const feeCategories = await this.feeCategoryService.findAll(req.user.tenant);
            return res.status(HttpStatus.OK).json({ message: 'Fee Categories fetched successfully', data: feeCategories });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Put('/:id')
    async updateFeeCategory(@Req() req, @Res() res) {
        try {
            const feeCategory = await this.feeCategoryService.updateFeeCategory(req.params.id, req.body);
            return res.status(HttpStatus.OK).json({ message: 'Fee Category updated successfully', data: feeCategory });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Delete('/:id')
    async deleteFeeCategory(@Req() req, @Res() res) {
        try {
            const feeCategory = await this.feeCategoryService.deleteFeeCategory(req.params.id);
            return res.status(HttpStatus.OK).json({ message: 'Fee Category deleted successfully', data: feeCategory });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
}