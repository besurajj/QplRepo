import React, { memo, useEffect } from "react";
import "./Map.scss";
import { ENVIRONMENT } from "../../../../utils/constants";
import  Logo  from "../../../../../src/assets/images/icons/plane.svg"
import { checkUndefiendValue } from "../../../../utils/utils";

const Map = memo(({ mapData }) => {
  useEffect(() => {
    if (!mapData) return;
  
    async function initMap() {
      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary(
        "marker"
      ); 
      const map = new Map(document.getElementById("detailsmap"), {
        zoom: 10,
        center: { lat: +mapData?.latitude, lng: +mapData?.longitude },
        mapId: ENVIRONMENT.MAP_ID,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP,
        },
        scaleControl: true,
        scaleControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP,
        },
        fullscreenControl: true,
        minZoom: 3,
      });

      let currentInfoWindow = null;

      function contentString(select) {
        return `
            <div class="map-popover__content">
              <h3>${select?.name}</h3>
          </div>`;
      }

      const markerOptions = {
        map,
        content: buildContent(mapData),
        position: { lat: +mapData?.latitude, lng: +mapData?.longitude },
      };
       
      const advancedMarker = new window.google.maps.marker.AdvancedMarkerElement(
        markerOptions
      );

      advancedMarker.addListener("click", () => {
        if (currentInfoWindow != null) {
          currentInfoWindow.close();
        }
        infowindow.open({
          anchor: advancedMarker,
          map,
        });
        currentInfoWindow = infowindow;
      });

      const infowindow = new window.google.maps.InfoWindow({
        content: contentString(mapData),
      });

      map.addListener("click", function () {
        infowindow.close();
      });

    }

    function buildContent(property) {
      const content = document.createElement("div");
      content.innerHTML = `
        <div class='${property?.image?"img-thumb":"img-thumb img-empty"} '>
          <img src=${checkUndefiendValue(property?.image , Logo)} />
        </div>`;
      return content;
    }

    initMap();
  }, [mapData]);

  return <div className="hotel-map" id="detailsmap"></div>;
});

export default Map;
