import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Board, BoardSchema } from "./board.schema";
import { BoardsController } from "./boards.controller";
import { BoardService } from "./board.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
    ])
  ],
  controllers: [BoardsController],
  providers: [BoardService],
  exports: [BoardService]
})

export class BoardModule {}