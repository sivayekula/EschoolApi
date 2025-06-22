import { Controller, Get, HttpStatus, Put, Req, Res } from "@nestjs/common";
import { QuickActionsService } from "./quickActions.service";


@Controller('quickActions')
export class QuickActionsController {
  constructor(
    private readonly quickActionsService: QuickActionsService
  ) {}

  @Get(':userId')
  async getQuickActions(@Req() req, @Res() res) {
    try {
      if(!req.params.userId) return res.status(HttpStatus.BAD_REQUEST).send('User Id is required');
      let quickActions = await this.quickActionsService.getQuickAction(req.params.userId);
      return res.status(HttpStatus.OK).json({ message: 'Quick Actions fetched successfully', data: quickActions });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put(':userId')
  async updateQuickActions(@Req() req, @Res() res) {
    try {
      if(!req.params.userId) return res.status(HttpStatus.BAD_REQUEST).send('User Id is required');
      let quickActions = await this.quickActionsService.createorUpdateQuickAction(req.params.userId, req.body);
      return res.status(HttpStatus.OK).json({ message: 'Quick Actions updated successfully', data: quickActions });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}