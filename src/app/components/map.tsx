"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRouter } from "next/navigation";
import '../styles/map.css'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Card,
  CardBody,
  Heading,
  useDisclosure,
  Button,
  Text,
  Icon,
} from '@chakra-ui/react'
import { CircleIcon } from "./CircleIcon";
type latlngtype = {
  lat: number;
  lng: number;
};
type typedata = {
  chargerName: string;
  ownerAddress: string;
  csPath: string;
  online: string;
  deviceType: string;
  location: string;
  ownerShip: string;
  latlng: latlngtype;
  stationName: string;
  stationAddress: string;
  public: string;
  heartbeatInterval: string;
  dateModified: string;
  serviceRateLabel: string;
  serviceHourLabel: string;
}

var currentMarkers: any = [];
export default function Map({ searchKey }: any) {
  const router = useRouter()
  const [station, setlocation] = useState<typedata[]>([])
  const [map, setMap] = useState<any>(null);
  useEffect(() => {
    console.log(searchKey)
    const axios = require('axios');
    axios.get(`${process.env.NEXT_PUBLIC_API_OCCP_ADDRESS}/home/api/station?${searchKey}`).then(function (response: any) {
      const raw = response.data
      const cooked = raw.filter((item: any) => item.latlng != undefined).map((item: any) => {
        const latlng = item.latlng.split(",");
        const latitudeString = latlng[0].split(":")[1].trim();
        const longitudeString = latlng[1].split(":")[1].trim();
        const latitude = parseFloat(latitudeString);
        const longitude = parseFloat(longitudeString);
        const latlngtude = {
          lat: latitude,
          lng: longitude,
        };
        item.latlng = latlngtude
        return item
      });
      setlocation(cooked)
    });
  }, [searchKey])

  useEffect(() => {
    if (!map) {
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
        style: 'mapbox://styles/majurio/clj3ygzl300j501qqefdvhe6u', // style URL
        center: [100.523186, 13.736717], // starting position [lng, lat]
        zoom: 5, // starting zoom
      });
      setMap(
        map)
    }
    removeMarker();
    station.forEach((item) => {
      const name = `<p class="stationName">${item.stationName}</p><p class="stationAddress">${item.stationAddress}</p>`;
      const innerHtmlContent =
        `<div style="min-width: 300px;color : black;">
                  <p>${name} </p></div>`;

      const divElement = document.createElement('div');
      const assignBtn = document.createElement('div');
      assignBtn.innerHTML = `<button class="btn-config"> Config </button>`;
      divElement.innerHTML = innerHtmlContent;
      divElement.appendChild(assignBtn);
      // btn.className = 'btn';
      assignBtn.addEventListener('click', (e) => {
        router.replace(`/dashboard/overview?chargerName=${item.chargerName}`)
      });

      const el = document.createElement('div');
      el.id = `marker-${item.chargerName}`;
      el.className = `marker-${item.online}`;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([item.latlng.lng, item.latlng.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25, focusAfterOpen: true, maxWidth: '300px' })
          .setDOMContent(divElement))
        .addTo(map);
      currentMarkers.push(marker);
      console.log(el)
      el.addEventListener('click', () => {
        map.flyTo({
          center: [item.latlng.lng, item.latlng.lat],
          zoom: 13
        });
      });
    });

  }, [map, station])
  return <div id="map" style={{ width: '100%', height: '650px', marginTop: '65px' }}></div>;
};

export function removeMarker(): void {
  if (currentMarkers !== null) {
    for (var i = currentMarkers.length - 1; i >= 0; i--) {
      currentMarkers[i].remove();
    }
  }
}

export const poppoppop = ({ searchKey }: any) => {
  const [station, setlocation] = useState<typedata[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    const axios = require('axios');

    axios.get(`${process.env.NEXT_PUBLIC_API_OCCP_ADDRESS}/home/api/station?${searchKey}`).then(function (response: any) {
      const raw = response.data
      const cooked = raw.filter((item: any) => item.latlng != undefined).map((item: any) => {
        const latlng = item.latlng.split(",");
        const latitudeString = latlng[0].split(":")[1].trim();
        const longitudeString = latlng[1].split(":")[1].trim();
        const latitude = parseFloat(latitudeString);
        const longitude = parseFloat(longitudeString);
        const latlngtude = {
          lat: latitude,
          lng: longitude,
        };
        item.latlng = latlngtude
        return item
      });
      setlocation(cooked)
      return station
    });
    removeMarker();
  }, [searchKey])
  return (<Drawer
    isOpen={isOpen}
    placement='right'
    onClose={onClose}
    size='md'
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader textAlign={'center'}>--Electrical Vehicle Charger--</DrawerHeader>

      <DrawerBody>
        {station.map((item) => {
          if (item.online == 'on') {
            return (<Card><CardBody><Heading pt='2' fontSize='sm'><CircleIcon boxSize={4} color='green.500' />{item.chargerName}</Heading >
              <Text pt='2' fontSize='sm'>{item.stationAddress}</Text>

            </CardBody></Card>
            )
          }
          else {
            return (<Card><CardBody><Heading pt='2' fontSize='sm'><CircleIcon boxSize={4} color='red.500' />{item.chargerName}</Heading >
              <Text pt='2' fontSize='sm'>{item.stationAddress}</Text>

            </CardBody></Card>
            )
          }
        })}
      </DrawerBody>

      <DrawerFooter>
        <Button variant='outline' mr={3} onClick={onClose}>
          Cancel
        </Button>

      </DrawerFooter>
    </DrawerContent>
  </Drawer>)
}
