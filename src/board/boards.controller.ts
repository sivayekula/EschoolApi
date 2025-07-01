import { Controller, Delete, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { BoardService } from "./board.service";


@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardService: BoardService
  ) {}

  @Post()
  async create(@Req() req, @Res() res) {
    let requestBody = JSON.parse(JSON.stringify(req.body))
    requestBody['tenant'] = req.user.tenant
    requestBody['branch'] = req.user.branch
    requestBody['createdBy'] = req.user._id
    if(!requestBody.name) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Name is required' })
    try {
      let boards = await this.boardService.create(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Boards fetched successfully', data: boards });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getBoards(@Req() req, @Res() res) {
    try {
      let boards = await this.boardService.getBoards(req.user.tenant, req.user.branch);
      return res.status(HttpStatus.OK).json({ message: 'Boards fetched successfully', data: boards });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  async delete(@Res() res, @Param('id') id: string) {
    try {
      await this.boardService.delete(id);
      return res.status(HttpStatus.OK).json({ message: 'Board deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}