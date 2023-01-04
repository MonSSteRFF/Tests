import React, { FC, useState } from "react";

import styles from "./Aside.module.scss";

import icon_arrowDown from "../../assets/icons/arrowDown.svg";
import icon_blocks from "../../assets/icons/blocks.svg";

const list = ["По проекту", "Объекты", "РД", "МТО", "СМР", "График"];

const Aside: FC = () => {
  const [listActiveId, setListActiveId] = useState<number>(3);

  const [listIsOpen, setListIsOpen] = useState<boolean>(true);

  const listOpenClose = () => {
    setListIsOpen(!listIsOpen);
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.aside__title}>
        <div className={styles.aside__title__wrapper}>
          <p className={styles.aside__title__wrapper__text}>
            {"Название проекта"}
          </p>
          <p className={styles.aside__title__wrapper__text}>{"Абривиатура"}</p>
        </div>

        <button className={styles.aside__title__btn} onClick={listOpenClose}>
          <img
            src={icon_arrowDown}
            alt=""
            className={`${styles.aside__title__btn__img} ${
              listIsOpen ? `` : ` ${styles.up}`
            }`}
          />
        </button>
      </div>

      <ul
        className={`${styles.aside__list}${
          listIsOpen ? `` : ` ${styles.closedList}`
        }`}
      >
        {list.map((item, index) => (
          <li
            className={`${styles.aside__list__item}${
              index === listActiveId ? ` ${styles.active}` : ""
            }`}
            key={index}
            onClick={() => setListActiveId(index)}
          >
            <img
              src={icon_blocks}
              alt=""
              className={styles.aside__list__item__img}
            />
            <p className={styles.aside__list__item__text}>{item}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export { Aside };
