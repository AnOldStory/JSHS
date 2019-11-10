import React, { Component } from "react";

import MapComponent from "component/map/MapComponent";
import SearchComponent from "component/search/SearchComponent";
import CategoryComponent from "component/category/CategoryComponent";
import "./MainContainer.scss";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { title: "TEST", X: 37.300293, Y: 126.838796 },
      group: [],
      curX: null,
      curY: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleGroup = this.handleGroup.bind(this);
  }

  handleSelect(obj) {
    console.log("메인");
    console.log(obj);
    this.setState({
      selected: obj,
      group: [obj]
    });
  }

  handleCurXY(obj) {
    console.log("메인xy");
    console.log(obj);
    this.setState({
      curX: obj.X,
      curY: obj.Y
    });
  }

  handleGroup(obj) {
    console.log("메인그룹!!");
    console.log(obj);
    this.setState({
      group: obj
    });
  }

  render() {
    return (
      <>
        <SearchComponent
          selected={this.state.selected}
          handleSelect={this.handleSelect}
        />
        <CategoryComponent
          selected={this.state.selected}
          handleSelect={this.handleSelect}
          handleGroup={this.handleGroup}
        />
        <div className="main">
          <MapComponent
            handleSelect={this.handleSelect}
            selected={this.state.selected}
            group={this.state.group}
          />
        </div>
      </>
    );
  }
}

export default MainContainer;
