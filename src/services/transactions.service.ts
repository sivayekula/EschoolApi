import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AcademicService } from "./academic.service";
import * as moment from "moment";
import { CounterService } from "./counter.service";
import { Types } from "mongoose";
import { BankAccountService } from "./bankAccount.service";


@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction') private readonly transactionModel,
    private readonly academicService: AcademicService,
    private readonly counterService: CounterService,
    private readonly bankService: BankAccountService
  ) { }

  async createTransaction(transaction) {
    try {
      let counter = await this.counterService.getCounter();
      transaction['receiptNumber'] = counter.seq
      return await this.transactionModel.create(transaction);
    } catch (error) {
      throw error;
    }
  }

  async getTransactions(tenantId: string, branchId: string, academicYear?: string, studentId?: string) {
    try {
      let query = { tenant: tenantId, branch: branchId, academicYear: academicYear };
      if (studentId) {
        query['student'] = studentId;
      } else {
        query['student'] = { $exists: true };
      }
      let transactionList = [];
      let transactions = await this.transactionModel.find(query).populate('receiptLabel').populate({
        path: 'fees.fee', model: 'Fee', populate: {
          path: "feeGroup", // Populate feeGroupId inside Fee
          model: "FeeGroup"
        }
      }).exec();
      for (let transaction of transactions) {
        let academic = await this.academicService.getAcademicByStudent(transaction.student._id, transaction.academicYear);
        transactionList.push({ transaction, academic });
      }
      return transactionList;
    } catch (error) {
      throw error;
    }
  }

  async getCollectedFee(tenant: string, branch: string, academicYear: string) {
    try {
      return await this.transactionModel.find({ tenant: tenant, branch: branch, academicYear: academicYear });
    } catch (error) {
      throw error;
    }
  }

  //internally using if any dependent record not created 
  async deleteTransaction(transactionId: string) {
    try {
      return await this.transactionModel.findByIdAndDelete(transactionId);
    } catch (error) {
      throw error;
    }
  }

  async getTransactionList(
    tenantId: string,
    branchId: string,
    academicYear: string,
    date?: string,
    transactionMode?: string
  ) {
    try {
      let query = { tenant: tenantId, branch: branchId, academicYear: academicYear, ...(date && { date: { $gte: moment.utc(date).startOf('day').toDate(), $lte: moment.utc(date).endOf('day').toDate() } }), ...(transactionMode && { transactionMode: transactionMode }) };
      return await this.transactionModel.find(query).populate({ path: 'fees.fee', model: 'Fee' }).populate('category').populate('transactionBank').populate('loanId').populate('subCategory');
    } catch (error) {
      throw error;
    }
  }

  async getDailyTransactions(
    tenantId: string,
    branchId: string,
    academicYear: string,
    date?: string,
    transactionMode?: string
  ) {
    const startOfDay = moment(date).startOf('day').toDate();
    const endOfDay = moment(date).endOf('day').toDate();

    const allBanks = await this.bankService.findAll(tenantId, branchId);
    const indx = allBanks.findIndex(bank => bank.accountNumber === 'cash');
    const CASH_BANK_ID = indx !== -1 ? allBanks[indx]._id : 'cash';
    try {
      // 1️⃣ Opening Balances up to selected day
      const openingBalances = await this.transactionModel.aggregate([
        {
          $addFields: {
            normalizedBankId: {
              $cond: [
                { $eq: ['$transactionMode', 'offline'] },
                CASH_BANK_ID !== 'cash' ? new Types.ObjectId(CASH_BANK_ID) : CASH_BANK_ID,
                { $toObjectId: '$transactionBank' },
              ],
            },
          },
        },
        {
          $match: {
            tenant: new Types.ObjectId(tenantId),
            academicYear: new Types.ObjectId(academicYear),
            branch: new Types.ObjectId(branchId),
            date: { $lt: startOfDay },
          },
        },
        { $unwind: '$fees' },
        {
          $group: {
            _id: '$normalizedBankId',
            credit: {
              $sum: {
                $cond: [{ $eq: ['$transactionType', 'credit'] }, '$fees.amount', 0],
              },
            },
            debit: {
              $sum: {
                $cond: [{ $eq: ['$transactionType', 'debit'] }, '$fees.amount', 0],
              },
            },
          },
        },
        {
          $project: {
            openingBalance: { $subtract: ['$credit', '$debit'] },
          },
        },
      ]);
      // console.log('openingBalances', openingBalances);
      const openingMap = new Map();
      for (const entry of openingBalances) {
        openingMap.set(entry._id.toString(), entry.openingBalance);
      }

      const bankIds = allBanks.map(bank => bank._id.toString());
      if (!bankIds.includes(CASH_BANK_ID.toString())) bankIds.push(CASH_BANK_ID);

      // 2️⃣ Transactions on selected day + fee details
      const transactions = await this.transactionModel.aggregate([
        {
          $addFields: {
            normalizedBankId: {
              $cond: [
                { $eq: ['$transactionMode', 'offline'] },
                CASH_BANK_ID !== 'cash' ? new Types.ObjectId(CASH_BANK_ID) : CASH_BANK_ID,
                { $toObjectId: '$transactionBank' },
              ],
            },
          },
        },
        {
          $match: {
            tenant: new Types.ObjectId(tenantId),
            academicYear: new Types.ObjectId(academicYear),
            branch: new Types.ObjectId(branchId),
            date: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        { $unwind: { path: '$fees', preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            'fees.feeObjectId': { $toObjectId: '$fees.fee' },
          },
        },
        {
          $lookup: {
            from: 'fees',
            localField: 'fees.feeObjectId',
            foreignField: '_id',
            as: 'feeDetails',
          },
        },
        {
          $unwind: {
            path: '$feeDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'bankaccounts',
            localField: 'transactionBank',
            foreignField: '_id',
            as: 'bank',
          },
        },
        {
          $unwind: {
            path: '$bank',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
  $project: {
    date: 1,
    transactionType: 1,
    amount: {
      $cond: {
        if: { $ifNull: ['$fees.amount', false] },
        then: '$fees.amount',
        else: '$amount'
      }
    },
    category: {
      $cond: {
        if: { $eq: ['$fees', null] },
        then: 'Other Expense',
        else: 'Student Fees'
      }
    },
    particulars: {
      $cond: {
        if: { $eq: ['$fees', null] },
        then: '$reason',
        else: 'Fee'
      }
    },
    bank: '$bank',
     credit: {
      $cond: [
        { $eq: ['$transactionType', 'credit'] },
        {
          $cond: {
            if: { $ifNull: ['$fees.amount', false] },
            then: '$fees.amount',
            else: '$amount'
          }
        },
        0
      ]
    },
    debit: {
      $cond: [
        { $eq: ['$transactionType', 'debit'] },
        {
          $cond: {
            if: { $ifNull: ['$fees.amount', false] },
            then: '$fees.amount',
            else: '$amount'
          }
        },
        0
      ]
    },
    type: 1,
    reason: 1,
    transactionMode: 1,
    balanceAfter: '$balance',
    normalizedBankId: 1, // 👈 ADD THIS LINE
    feeDetails: 1         // 👈 OPTIONAL: if you use it in ledger construction
  }
}


      ]);
      // console.log('transactions', transactions );
      // 3️⃣ Organize per bank ledger
      const ledgerByBank = new Map();

      for (const txn of transactions) {
        const bankId = txn.normalizedBankId?.toString();
        if (!ledgerByBank.has(bankId)) {
          ledgerByBank.set(bankId, {
            bankName: txn.bank?.name || 'Cash',
            bankId,
            openingBalance: openingMap.get(bankId) || 0,
            transactions: [],
            totalCredit: 0,
            totalDebit: 0,
          });
        }

        const ledger = ledgerByBank.get(bankId);
        const credit = txn.credit || 0;
        const debit = txn.debit || 0;

        const lastBalance =
          Number(ledger.transactions.length > 0
            ? ledger.transactions[ledger.transactions.length - 1].balanceAfter
            : ledger.openingBalance);

        const newBalance = lastBalance + credit - debit;

        ledger.transactions.push({
          date: txn.date,
          category: txn.feeDetails?.category || txn.type || 'Student Fees',
          particulars: txn.feeDetails?.name || txn.reason || 'Fee',
          bank: ledger.bankName,
          debit,
          credit,
          balanceAfter: newBalance,
          feeDetails: txn.feeDetails,
          transactionMode: txn.transactionMode,
          trnsactionType: txn.transactionType
        });

        ledger.totalCredit += credit;
        ledger.totalDebit += debit;
      }

      // 4️⃣ Final result for each bank
      const final = [];
      for (const bankId of bankIds) {
        const ledger = ledgerByBank.get(bankId) || {
          bankName: allBanks.find(b => b._id.toString() === bankId)?.name || 'Cash',
          bankId,
          openingBalance: openingMap.get(bankId) || 0,
          transactions: [],
          totalCredit: 0,
          totalDebit: 0,
        };

        ledger.closingBalance =
          ledger.transactions.length > 0
            ? ledger.transactions[ledger.transactions.length - 1].balanceAfter
            : ledger.openingBalance;

        final.push(ledger);
      }
      return final;
    } catch (error) {
      throw error;
    }
  }
}