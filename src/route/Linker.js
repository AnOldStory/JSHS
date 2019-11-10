import React, { Component } from "react";
import { Link } from "react-router-dom";

import Title from "img/title.png";
import Info from "img/info.png";
import Report from "img/report.png";
import Intro from "img/intro.png";

class Linker extends Component {
  render() {
    return (
      <div className="top">
        <div className="title">
          <Link to="/">
            <img className="imgs" src={Title} alt="title" />
          </Link>
        </div>
        <div className="title">
          <Link to="/intro">
            <img className="imgs" src={Intro} alt="title" />
          </Link>
        </div>
        <div className="title">
          <Link to="/report">
            <img className="imgs" src={Report} alt="title" />
          </Link>
        </div>
        <div className="title">
          <Link to="/info">
            <img className="imgs" src={Info} alt="title" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Linker;
