/* global kakao */
import React, { Component } from "react";

import "component/map/MapComponent.scss";

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultCenterX: 37.300293,
      defaultCenterY: 126.838796,
      msg: ""
    };

    this.ButtonMan = this.ButtonMan.bind(this);
    this.GpsHandler = this.GpsHandler.bind(this);
    this.MarkerHandler = this.MarkerHandler.bind(this);
  }

  componentDidMount() {
    this.MarkerHandler();
  }

  componentDidUpdate() {
    this.MarkerHandler();
  }

  ButtonMan() {
    this.props.handleSelect({
      title: "Erica",
      X: this.state.defaultCenterX,
      Y: this.state.defaultCenterY
    });
  }

  MarkerHandler(markers, options = { X: null, Y: null, level: null }) {
    /* Map Component Target */
    let container = document.getElementById("map");

    /* Remove Map Object */
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    console.log("render");
    console.log(this.props.selected);

    /* MarkerProsessing */
    if (this.props.group) {
      markers = this.props.group.map(x => {
        return {
          title: x.title,
          X: x.X,
          Y: x.Y
        };
      });
      console.log("markers");
    } else {
      if (!markers) {
        markers = [
          {
            title: "Erica",
            X: this.state.defaultCenterX,
            Y: this.state.defaultCenterY
          }
        ];
      }
    }

    /* Map option */
    options = {
      center: new kakao.maps.LatLng(
        options.X ? options.X : this.props.selected.X,
        options.Y ? options.Y : this.props.selected.Y
      ),
      level: options.level ? options.level : 3
    };

    /* Draw map */
    let map = new kakao.maps.Map(container, options);

    /* Zoom controller */
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    /* Map type controller */
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    kakao.maps.event.addListener(map, "dragend", () => {
      // 지도의 중심좌표를 얻어옵니다
      var latlng = map.getCenter();

      this.props.handleSelect({
        title: "현재 지도의 중심",
        X: latlng.getLat(),
        Y: latlng.getLng()
      });
    });

    /* Draw Marker & Hover Window*/
    markers.forEach(markerInfo => {
      let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(markerInfo.X, markerInfo.Y)
      });
      marker.setMap(map);

      let infowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;"> ' + markerInfo.title + "</div>" // 인포윈도우에 표시할 내용
      });

      kakao.maps.event.addListener(marker, "mouseover", () =>
        infowindow.open(map, marker)
      );

      kakao.maps.event.addListener(marker, "mouseout", () =>
        infowindow.close()
      );
    });
  }

  GpsHandler() {
    if (navigator.geolocation) {
      this.setState({
        msg: "시도중"
      });
      navigator.geolocation.getCurrentPosition(position => {
        this.props.handleSelect({
          title: "현재 당신의 위치",
          X: position.coords.latitude,
          Y: position.coords.longitude
        });
        this.setState({
          msg: "성공"
        });
      });
    } else {
      this.setState({
        msg: "실패"
      });
    }
  }

  render() {
    return (
      <div id="map_container">
        <button onClick={this.GpsHandler}> Get Location </button>
        DEBUG:{this.state.msg}
        <button onClick={this.ButtonMan}>hello</button>
        <div id="map" />
      </div>
    );
  }
}

export default MapComponent;
