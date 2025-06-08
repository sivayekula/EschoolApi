import moment from "moment";
import * as mongoose from "mongoose";

type Fee = {
  fee: string;
  duration?: string;
  dueDate?: string;
  paidAmount?: number;
  discount?: number | string;
  paybalAmount?: number;
  paymentStatus?: string;
  pendingAmount?: number;
};

export function getWorkingDays(startDate, endDate, holidays = [], weekends = [0, 6]) {
  let workingDays = 0;
  let currentDate = moment(startDate);
  const end = moment(endDate);

  // Convert holidays to a Set for faster lookup
  const holidaySet = new Set(holidays.map(d => moment(d).format('YYYY-MM-DD')));

  while (currentDate.isSameOrBefore(end)) {
    const isWeekend = weekends.includes(currentDate.day());
    const isHoliday = holidaySet.has(currentDate.format('YYYY-MM-DD'));

    if (!isWeekend && !isHoliday) {
      workingDays++;
    }

    currentDate.add(1, 'day');
  }

  return workingDays;
}

export function getListOfFees(oldFees: Fee[], newFees: Fee[]) {
  const oldFeeMap = new Map<string, Fee>(
    oldFees.map(fee => [fee.fee?.toString(), fee])
  );

  const result = newFees.map(newFee => {
    const feeId = newFee.fee?.toString();
    const oldFee = oldFeeMap.get(feeId);

    const mergedFee = {
      ...(oldFee || {}),
      ...(newFee || {}),
    };

    return mergedFee;
  });

  return result;
}