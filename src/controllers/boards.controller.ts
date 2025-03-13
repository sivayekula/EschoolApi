import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { BoardService } from "src/services/board.service";


@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardService: BoardService
  ) {}

  @Post()
  async create(@Req() req, @Res() res) {
    let requestBody = JSON.parse(JSON.stringify(req.body))
    requestBody['tenant'] = req.user.tenant
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
      let boards = await this.boardService.getBoards(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Boards fetched successfully', data: boards });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}