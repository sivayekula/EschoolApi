import moment from "moment";
import * as mongoose from "mongoose";

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

export function getListOfFees(oldFees, newFees) {
  const feeMap = new Map();

  // Step 1: Add all newFees
  newFees.forEach(fee => {
    feeMap.set(fee.fee.toString(), fee);
  });

  // Step 2: Override with oldFees if same ID exists or add new ones
  oldFees.forEach(fee => {
    feeMap.set(fee.fee.toString(), fee); // this overrides the newFee with the same ID
  });

  // Return as array
  return Array.from(feeMap.values());

}