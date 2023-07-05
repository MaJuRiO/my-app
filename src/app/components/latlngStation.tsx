import { useEffect, useState } from "react";

interface typedata {
    chargerName: string;
    ownerAddress: string;
    csPath: string;
    online: string;
    deviceType: string;
    location: string;
    ownerShip: string;
    latlng: string;
    stationName: string;
    stationAddress: string;
    public: string;
    heartbeatInterval: string;
    dateModified: string;
    serviceRateLabel: string;
    serviceHourLabel: string;
    lat: number;
    lng: number;
}

export const latlng = (filter: string) => {
    const [location, setlocation] = useState<typedata[]>([])
    useEffect(() => {
        const axios = require('axios');
        axios.get(`${process.env.API_OCCP_ADDRESS}/home/api/station?${filter}`).then(function (response: any) {
            const raw = response.data
            const cooked = raw.filter((item:any) => item.latlng != undefined).map((item: any) => {
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
    }, [])
    return location
}