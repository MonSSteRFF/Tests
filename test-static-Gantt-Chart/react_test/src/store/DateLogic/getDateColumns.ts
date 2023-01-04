import { IColumnsDate } from "../../models/IColumnsDate";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type TgetDateColumns = (
  startMonday: Date,
  amountWeeks: number
) => IColumnsDate[];

const getDateColumns: TgetDateColumns = (startMonday, amountWeeks) => {
  let DateColumns: IColumnsDate[] = [];

  for (let i = 0; i < amountWeeks; i++) {
    let firstDay = new Date(startMonday);
    firstDay.setDate(firstDay.getDate() + i * 7);
    const firstDayStr = `${firstDay.getDate()} ${
      monthNames[firstDay.getMonth()]
    }`;

    let secondDay = new Date(firstDay);
    secondDay.setDate(secondDay.getDate() + 6);
    const secondDayStr = `${secondDay.getDate()} ${
      monthNames[secondDay.getMonth()]
    }`;

    const week = `${firstDayStr} - ${secondDayStr}`;

    let days = [];
    for (let j = 0; j < 7; j++) {
      const newDate = new Date(firstDay);
      newDate.setDate(newDate.getDate() + j);
      days.push(String(newDate.getDate()));
    }

    DateColumns.push({ week: week, days: days });
  }

  return DateColumns;
};

export { getDateColumns };
