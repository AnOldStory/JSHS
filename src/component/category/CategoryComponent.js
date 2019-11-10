import React, { Component } from "react";

import "./CategoryComponent.scss";

class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.handleCategory = this.handleCategory.bind(this);
  }
  handleCategory() {
    fetch(
      "http://192.168.43.210:8880/test/check2?category=음식점&x=" +
        this.props.selected.Y +
        "&y=" +
        this.props.selected.X
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
        return res;
      })
      .then(res => {
        this.props.handleGroup(res);
      });
  }
  render() {
    return (
      <div className="category">
        <div onClick={this.handleCategory}>
          llasdfasllasdfasllasdfasllasdfasllasdfasllasdfasllasdfasllasdfasllasdfasllasdfasllll
        </div>
        <div />
      </div>
    );
  }
}

export default CategoryComponent;
