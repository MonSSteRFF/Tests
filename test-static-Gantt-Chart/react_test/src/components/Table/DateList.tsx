import React from "react";

import { useAppSelector } from "../../hooks/redux";

import styles from "./Table.module.scss";

const DateList = () => {
  const columns = useAppSelector(({ dateReducer }) => dateReducer.columns);

  return (
    <div className={styles.dateList}>
      {columns.map((week) => (
        <div className={styles.dateList__week} key={week.week}>
          <p className={styles.dateList__week__title}>{week.week}</p>
          <div className={styles.dateList__week__days}>
            {week.days.map((day, dayIndex) => (
              <div
                key={week.week + day}
                className={styles.dateList__week__days__day}
              >
                <p
                  className={styles.dateList__week__days__day__text}
                  style={{
                    color: `${
                      dayIndex >= 5 ? "var(--secondinary)" : undefined
                    }`,
                  }}
                >
                  {day}
                </p>
                <div className={styles.dateList__week__days__day__column} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { DateList };
