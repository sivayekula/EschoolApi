import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { TransactionSchema } from "./transactions.schema";
import { CounterService } from "./counter.service";
import { CounterSchema } from "./counter.schema";
import { AcademicModule } from "../academic/academic.module";
import { BankAccountModule } from "../bankAccounts/bankAccount.module";
import { LoanSchema } from "../loan/loan.schema";
import { LoansController } from "../loan/loans.controller";
import { LoanService } from "../loan/loan.service";
import { LoanModule } from "src/loan/loan.module";
import { FeeCategoryModule } from "src/feeCategory/feeCategory.module";


@Module({
  imports: [
    FeeCategoryModule,
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
      { name: 'Counter', schema: CounterSchema },
      { name: 'Loans', schema: LoanSchema }
    ]),
    AcademicModule,
    BankAccountModule,
    LoanModule,

  ],
  controllers: [TransactionsController, LoansController ],
  providers: [CounterService, LoanService, TransactionsService],
  exports: [TransactionsService]
})

export class TransactionsModule {}