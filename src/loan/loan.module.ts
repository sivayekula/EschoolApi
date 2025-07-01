import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Loans, LoanSchema } from "./loan.schema";
import { LoansController } from "./loans.controller";
import { LoanService } from "./loan.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Loans.name, schema: LoanSchema },
    ]),
  ],
  controllers: [LoansController],
  providers: [LoanService],
  exports: [LoanService]
})

export class LoanModule {}