import React, { Component } from "react";

import "component/search/SearchComponent.scss";

class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
      inputText: "",
      resultList: [{ title: "test", X: 37.3005, Y: 126.839 }]
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
  }

  inputHandler(e) {
    this.setState({
      inputText: e.target.value
    });
    fetch(
      "http://192.168.43.210:8880/test/check1?x=" +
        this.props.selected.Y +
        "&y=" +
        this.props.selected.X +
        "&search=" +
        e.target.value
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        res = res["data"].map(x => {
          return {
            title: x.CMPNM_NM,
            X: x.REFINE_WGS84_LAT,
            Y: x.REFINE_WGS84_LOGT
          };
        });
        this.setState({
          resultList: res
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  focusHandler() {
    this.setState({
      isFocus: !this.state.isFocus
    });
  }

  selectHandler(i) {
    this.props.handleSelect(this.state.resultList[i]);
    this.setState({
      isFocus: !this.state.isFocus,
      inputText: this.state.resultList[i].title
    });
  }

  render() {
    return (
      <div id="search_container">
        <input
          id="search_query"
          type="text"
          value={this.state.inputText}
          onChange={this.inputHandler}
          onClick={this.focusHandler}
        />
        <div className="dropdown">
          {this.state.isFocus
            ? this.state.resultList.map((result, i) => {
                return (
                  <div onClick={() => this.selectHandler(i)} key={i}>
                    {result.title}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}

export default SearchComponent;
