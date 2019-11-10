import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Linker from "route/Linker";

import MainContainer from "container/main/MainContainer";
import IntroContainer from "container/intro/IntroContainer";
import ReportContainer from "container/report/ReportContainer";
import InfoContainer from "container/info/InfoContainer";

class Router extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <>
          <Linker />
          <Switch>
            <Route exact path="/" component={MainContainer} />
            <Route exact path="/intro" component={IntroContainer} />
            <Route exact path="/report" compoennt={ReportContainer} />
            <Route exact path="/info" compoennt={InfoContainer} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default Router;
