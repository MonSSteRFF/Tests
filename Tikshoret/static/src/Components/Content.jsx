import React from "react";

import "./Content.scss";

import trust_logo from "../Assets/trust-logo.svg";
import descriptionImage from "../Assets/descriptionImage.webp";

const Content = () => {
  const themas = ["educación", "Meduca", "Panamá"];

  const MainContent = () => (
    <>
      <p className="newsTag">
        <a href="/">
          NOTICIA
          <span className="hiddenBlock">
            NOTICIA. Contenido con base en hechos observados o verificados por
            el reportero, o con base en fuentes conocedoras de la temática.
          </span>
        </a>
        <span> | </span>EDUCACIÓN
      </p>
      <h1 className="title">
        ¿Cuándo finaliza el año escolar 2022 en el sector oficial?
      </h1>

      <div className="author">
        <a href="/" className="author_name">
          Aleida Samaniego C.
        </a>
        <p className="author_date">09 dic 2022 - 08:04 AM</p>
      </div>

      <div className="trustBlock">
        <p>La Prensa forma parte de</p>
        <a href="/">
          <img src={trust_logo} alt="" />
        </a>
      </div>

      <div className="themasBlock">
        <p>TEMAS: </p>
        {themas.map((item, index) => (
          <React.Fragment key={index}>
            <a href={"/"}>
              {item}
              {index + 1 !== themas.length ? <span>/</span> : ""}
            </a>
          </React.Fragment>
        ))}
      </div>

      <a className="descriptionImage" href="/">
        <img src={descriptionImage} alt="" />
        <p>El paro de los docentes de julio pasado duró casi un mes. Archivo</p>
      </a>
    </>
  );
  const NewsContent = () => <div></div>;

  const Aside = () => (
    <Aside>
      <p>text</p>
    </Aside>
  );

  return (
    <main className="container">
      <div className="mainContent">
        <MainContent />
        <NewsContent />
      </div>
      <Aside />
    </main>
  );
};

export default Content;
