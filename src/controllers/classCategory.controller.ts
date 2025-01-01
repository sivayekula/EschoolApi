import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { ClassCategoryService } from "src/services/classCategory.service";


@Controller('classCategory')
export class ClassCategoryController {
  constructor(
    private readonly classCategoryService: ClassCategoryService
  ) {}

  @Get('')
  async getClassCategories(@Res() res) {
    try {
      const classCategories = await this.classCategoryService.getClassCategories();
      return res.status(HttpStatus.OK).json({ message: 'Class Categories fetched successfully', data: classCategories });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id')
  async getClassCategory(@Res() res, @Req() req) {
    try {
      const classCategory = await this.classCategoryService.getClassCategory(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Class Category fetched successfully', data: classCategory });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('')
  async createClassCategory(@Res() res, @Req() req) {
    try {
      const classCategory = await this.classCategoryService.createClassCategory(req.body);
      return res.status(HttpStatus.OK).json({ message: 'Class Category created successfully', data: classCategory });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}