import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BankAccountsSchema } from "./bankAccounts.schema";
import { BankAccountsController } from "./bankAccounts.controller";
import { BankAccountService } from "./bankAccount.service";


@Module({
  imports: [MongooseModule.forFeature([{ name: 'BankAccounts', schema: BankAccountsSchema }])],
  controllers: [BankAccountsController],
  providers: [BankAccountService],
  exports: [BankAccountService, MongooseModule]
})

export class BankAccountModule {}