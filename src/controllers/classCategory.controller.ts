import { Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { ClassCategoryService } from "../services/classCategory.service";


@Controller('classCategory')
export class ClassCategoryController {
  constructor(
    private readonly classCategoryService: ClassCategoryService
  ) {}

  @Get()
  async getClassCategories(@Req() req, @Res() res) {
    try {
      const classCategories = await this.classCategoryService.getClassCategories();
      return res.status(HttpStatus.OK).json({ message: 'Class Categories fetched successfully', data: classCategories });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getClassCategory(@Res() res, @Req() req) {
    try {
      const classCategory = await this.classCategoryService.getClassCategory(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Class Category fetched successfully', data: classCategory });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async createClassCategory(@Res() res, @Req() req) {
    try {
      let requestBody = JSON.parse(JSON.stringify(req.body))
      requestBody['tenant'] = req.user.tenant
      const classCategory = await this.classCategoryService.createClassCategory(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Class Category created successfully', data: classCategory });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put('/:id')
  async updateClassCategory(@Res() res, @Req() req) {
    try {
      const body = JSON.parse(JSON.stringify(req.body))
      body['tenant'] = req.user.tenant
      const classCategory = await this.classCategoryService.updateClassCategory(req.params.id, body);
      return res.status(HttpStatus.OK).json({ message: 'Class Category updated successfully', data: classCategory });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete('/:id')
  async deleteClassCategory(@Res() res, @Req() req) {
    try {
      await this.classCategoryService.deleteClassCategory(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Class Category deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}