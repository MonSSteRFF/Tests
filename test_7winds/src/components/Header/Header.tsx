import React from "react";

import styles from "./Header.module.scss";

import icon_cubes from "../../assets/icons/cubes.svg";
import icon_share from "../../assets/icons/share.svg";
import { useAppSelector } from "../../hooks/redux";

const Header = () => {
  const { isLoading, error } = useAppSelector((state) => state.listReducer);

  const menuClickHandler = () => {
    console.log("menu click");
  };
  const shareClickHandler = () => {
    console.log("share click");
  };

  return (
    <div className={styles.header}>
      <button onClick={menuClickHandler} className={styles.header__btn}>
        <img src={icon_cubes} alt="" className={styles.header__btn__img} />
      </button>

      <button onClick={shareClickHandler} className={styles.header__btn}>
        <img src={icon_share} alt="" className={styles.header__btn__img} />
      </button>

      <div className={styles.header__links}>
        <button className={`${styles.header__links__btn} ${styles.active}`}>
          {"Просмотр"}
        </button>
        <button className={styles.header__links__btn}>{"Управление"}</button>
      </div>

      <div>
        {error && <p>{error}</p>}
        {isLoading && <p>Загрузка листа</p>}
      </div>
    </div>
  );
};

export { Header };
