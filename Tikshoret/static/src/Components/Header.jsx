import React from "react";

import "./Header.scss";

import header_logotype from "../Assets/header_logotype.svg";

const Header = () => {
  const icons = ["icon twitter", "icon facebook", "icon instagram"];
  const nav = [
    "Locales",
    "Judiciales",
    "Política",
    "Economía",
    "Mundo",
    "Deportes",
    "Vivir+",
    "Status K",
    "Podcasts",
    "Opinión",
    "Multimedia",
    "Correcciones",
  ];
  const themas = [
    "Tribunal Electoral (...",
    "Proceso Civil",
    "Kenia Porcell",
    "Juan Carlos Varela",
    "Enfermedades",
    "Turismo",
    "Viajes",
    "Caja De Seguro Socia...",
    "Jubilados",
  ];

  const TopHeader = () => (
    <div className="header_wrapper">
      <div className="leftSide">
        <div className="header_icons">
          <i className="icon menu"></i>
          <a href={"/"} className="icon search"></a>
          {icons.map((item, index) => (
            <a key={index} href={"/"} className={item}></a>
          ))}
        </div>
        <p className="date">Panamá, 06 de enero del 2023</p>
      </div>

      <a className="centerIcon" href={"/"}>
        <img src={header_logotype} alt="" />
      </a>

      <div className="rightSide">
        <div className="rightSide_buttons">
          <button className="white">Inicia Sesión</button>
          <button className="red">Suscríbete desde $1</button>
        </div>
        <a href="/" target={"_blank"} className="rightSide_link">
          ePaper
        </a>
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className="navigation">
      <ul className="list">
        {nav.map((navItem, index) => (
          <li key={index} className="list_item">
            <a href="/">{navItem}</a>
          </li>
        ))}
      </ul>
    </nav>
  );

  const ThemasDoDay = () => (
    <div className="themas">
      <p className="title">TEMAS DE HOY:</p>
      <div className="list">
        {themas.map((item, index) => (
          <a href="/" key={index} className="list_item">
            {item}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <header className="header">
      <div className="container">
        <TopHeader />
        <Navigation />
        <ThemasDoDay />
      </div>
    </header>
  );
};

export default Header;
