"use client"
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { latlng } from '../components/latlngStation';
import { useRouter } from "next/navigation";
var currentMarkers: any = [];
const Map = () => {
  const router = useRouter()
  const [map, setMap] = useState(null);
  const box = latlng().filter(item => item.latlng != undefined)
  useEffect(() => {
    if (!map) {
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
        style: 'mapbox://styles/majurio/clj3ygzl300j501qqefdvhe6u', // style URL
        center: [100.523186, 13.736717], // starting position [lng, lat]
        zoom: 5, // starting zoom
      });
      setMap(map)
    }

    box.forEach((item) => {
      const name = `<h3>${item.stationName}</h3><p>${item.stationAddress}</p>`;
      const innerHtmlContent = `<div style="min-width: 300px;font-size: large;color : black;">
                  <h4 class="h4Class">${name} </h4></div>`;

      const divElement = document.createElement('div');
      const assignBtn = document.createElement('div');
      assignBtn.innerHTML = `<Button colorScheme='blue'> Config </Button>`;
      divElement.innerHTML = innerHtmlContent;
      divElement.appendChild(assignBtn);
      // btn.className = 'btn';
      assignBtn.addEventListener('click', (e) => {
        router.push(`/dashboard/overview?chargerName=${item.chargerName}`)
      });

      const marker = new mapboxgl.Marker({ color: item.online === "on" ? "#56F000" : "#FFB302" })
        .setLngLat([item.latlng.lng, item.latlng.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25, focusAfterOpen: true, maxWidth: '300px' })
          .setDOMContent(divElement))
        .addTo(map);
      //markerElement.addEventListener('click', (e) => {
      //  map.flyTo({
      //    center: [item.latlng.lng, item.latlng.lat],
      //    zoom: 15
      //  })
      //})
      currentMarkers.push(marker);
    });

  }, [map])
  return <div id="map" style={{ width: '100%', height: '600px' }}></div>;
};

export default Map;

export function removeMarker(): void {
  if (currentMarkers !== null) {
    for (var i = currentMarkers.length - 1; i >= 0; i--) {
      currentMarkers[i].remove();
    }
    console.log("remove all marker!!")
  }
}

export function addMarker(map: mapboxgl.Map): void {
  removeMarker()
  const marker = new mapboxgl.Marker().setLngLat([90, 10]).addTo(map);
  //currentMarkers.push(marker);
}