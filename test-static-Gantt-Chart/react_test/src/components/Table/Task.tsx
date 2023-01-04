import React, { FC } from "react";
import { Isub } from "../../models/ISub";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { subOpenClose } from "../../store/reducers/TableSlice";

import styles from "./Table.module.scss";

import arrowDropTaskImage from "../../assets/icons/arrowDropTask.svg";

import imageOfLvl1 from "../../assets/icons/lvl_1.svg";
import imageOfLvl2 from "../../assets/icons/lvl_2.svg";
import imageOfLvl3 from "../../assets/icons/lvl_3.svg";
import imageOfLvl4 from "../../assets/icons/lvl_4.svg";
import imageOfLvl5 from "../../assets/icons/lvl_5.svg";
import { getRangeDates } from "../../store/DateLogic/getRangeDates";

const Task: FC<{ sub: Isub[]; lvl?: number }> = ({ sub, lvl = 1 }) => {
  const dispatch = useAppDispatch();

  const { startDayTime } = useAppSelector(({ dateReducer }) => dateReducer);
  const startDay = new Date(startDayTime);

  return (
    <>
      {sub.map((item) => {
        const periodStartDate = new Date(item.period_start);
        const periodEndDate = new Date(item.period_end);

        const { first2start, start2end } = getRangeDates(
          startDay,
          periodStartDate,
          periodEndDate
        );

        return (
          <div className={styles.task} key={item.id}>
            <div
              className={`${styles.task__wrapper}`}
              style={{
                paddingLeft: `${lvl * 20}px`,
                cursor: `${item.sub !== undefined ? "pointer" : "text"}`,
              }}
              onClick={() => {
                if (item.sub !== undefined) {
                  dispatch(
                    subOpenClose({ openClose: !item.opened, id: item.id })
                  );
                }
              }}
            >
              {item.sub !== undefined ? (
                <img
                  src={arrowDropTaskImage}
                  alt=""
                  className={styles.task__wrapper__image}
                  style={{
                    transform: `${
                      item.opened ? "rotate(0deg)" : "rotate(-180deg)"
                    }`,
                  }}
                />
              ) : (
                <div style={{ width: "20px" }} />
              )}

              <img
                src={
                  lvl === 1
                    ? imageOfLvl1
                    : lvl === 2
                    ? imageOfLvl2
                    : lvl === 3
                    ? imageOfLvl3
                    : lvl === 4
                    ? imageOfLvl4
                    : imageOfLvl5
                }
                alt=""
                className={styles.task__wrapper__image}
              />

              {item.sub && (
                <p className={styles.task__wrapper__numbers}>
                  {item.sub?.length}
                </p>
              )}

              <p className={styles.task__wrapper__title}>{item.title}</p>
            </div>

            <div className={styles.task__period}>
              <div
                className={styles.task__period__block}
                style={{
                  marginLeft: `${first2start * 22}px`,
                  width: `${start2end * 22}px`,
                  backgroundColor: `${
                    lvl === 1
                      ? "var(--lvl1bg)"
                      : lvl === 3 || lvl === 4
                      ? "var(--lvl3bg)"
                      : "var(--lvl2bg)"
                  }`,
                  borderColor: `${
                    lvl === 1
                      ? "var(--lvl1border)"
                      : lvl === 3 || lvl === 4
                      ? "var(--lvl3border)"
                      : "var(--lvl2border)"
                  }`,
                }}
              />
              <p className={styles.task__period__text}>{item.title}</p>
            </div>

            {item.opened && item.sub && <Task sub={item.sub} lvl={lvl + 1} />}
          </div>
        );
      })}
    </>
  );
};

export { Task };
