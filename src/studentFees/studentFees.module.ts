import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentFees, StudentFeesSchema } from "./studentFees.schema";
import { StudentFeesService } from "./studentFees.service";
import { StudentFeesController } from "./studentFees.controller";
import { StudentModule } from "../student/student.module";
import { NotificationModule } from "../notifications/notification.module";
import { AcademicModule } from "../academic/academic.module";
import { TransactionsModule } from "../transactions/transactions.module";
import { BankAccountModule } from "src/bankAccounts/bankAccount.module";
import { BranchModule } from "src/branch/branch.module";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentFees.name, schema: StudentFeesSchema },
    ]),
    forwardRef(() => StudentModule),
    NotificationModule,
    forwardRef(() => AcademicModule),
    forwardRef(() =>TransactionsModule),
    BankAccountModule,
    forwardRef(() =>BranchModule)
  ],
  controllers: [StudentFeesController],
  providers: [StudentFeesService],
  exports: [StudentFeesService]
})

export class StudentFeesModule {}