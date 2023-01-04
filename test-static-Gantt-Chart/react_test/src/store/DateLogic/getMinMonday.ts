import { Isub } from "../../models/ISub";

type TgetMinMonday = (chart: Isub) => Date;

const getMinMonday: TgetMinMonday = (chart) => {
  let minimum_date: Date = new Date(Date.now());
  let minimum_monday: Date = new Date(Date.now());

  const minDate: (chart: Isub[]) => void = (chart) => {
    chart.forEach((sub) => {
      const date_period_start = new Date(sub.period_start);

      if (date_period_start < minimum_date) {
        minimum_date = date_period_start;
      }
      if (sub.sub !== undefined) {
        minDate(sub.sub);
      }
    });
  };

  const minMonday: (date: Date) => void = (date) => {
    if (date.getDay() !== 1) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 1);
      minMonday(newDate);
    } else {
      minimum_monday = date;
    }
  };

  if (chart !== undefined) {
    minDate([chart]);
  }
  if (minimum_date.getDate() !== new Date(Date.now()).getDate()) {
    minMonday(minimum_date);
  }

  return minimum_monday;
};

export { getMinMonday };
