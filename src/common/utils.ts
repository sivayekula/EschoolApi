import moment from "moment";

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