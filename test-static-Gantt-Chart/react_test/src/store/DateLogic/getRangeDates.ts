type TgetRangeDates = (
  startDay: Date,
  periodStartDate: Date,
  periodEndDate: Date
) => { first2start: number; start2end: number };

export const getRangeDates: TgetRangeDates = (
  startDay,
  periodStartDate,
  periodEndDate
) => {
  const first2start_diff = Math.abs(
    periodStartDate.getTime() - startDay.getTime()
  );
  const start2end_diff = Math.abs(
    periodEndDate.getTime() - periodStartDate.getTime()
  );

  const first2start_diff_days = Math.ceil(
    first2start_diff / (1000 * 60 * 60 * 24) + 1
  );
  const start2end_diff_days =
    Math.ceil(start2end_diff / (1000 * 60 * 60 * 24)) + 1;

  return { first2start: first2start_diff_days, start2end: start2end_diff_days };
};
