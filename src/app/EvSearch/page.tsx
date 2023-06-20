'use client'
import {
    Flex,
    VStack,
    Box,
    Input,
    useColorModeValue,
    Button,
    Stack,
    Text,
    Link,
    useDisclosure,
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
    Icon,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Map from '../components/map';
import mapboxgl from 'mapbox-gl';
import { removeMarker, addMarker } from '../components/map';
import React from 'react';
const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
        <path
            fill='currentColor'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
        />
    </Icon>
)
export default function Page() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [EVdata, setEVdata] = useState([]);
    const [{ keySearch, chargerName, csPath, location, deviceType, online, deviceId, ownerAddress }, setkeysearch] = useState({
        keySearch: "",
        chargerName: "",
        csPath: "",
        location: "",
        deviceType: "",
        online: "",
        deviceId: "",
        ownerAddress: ""
    });

    const SearchButton = useCallback(() => {
        console.log(EVdata)
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
            style: 'mapbox://styles/majurio/clj3ygzl300j501qqefdvhe6u', // style URL
            center: [100.523186, 13.736717], // starting position [lng, lat]
            zoom: 8, // starting zoom
        });

        EVdata.filter(item => item.latlng != undefined).forEach(item => {
            const marker = new mapboxgl.Marker({ color: item.online === "on" ? "#56F000" : "#FFB302" })
                .setLngLat([item.latlng.lng, item.latlng.lat])
                .setPopup(new mapboxgl.Popup({ offset: 25, focusAfterOpen: true, maxWidth: '300px' })
                )
                .addTo(map);
        })
    }, [EVdata])
    const url = `/dashboard/overview?keySearch=${keySearch}&chargerName=${chargerName}&csPath=${csPath}&location=${location}&deviceType=${deviceType}&online=${online}&deviceId=${deviceId}&ownerAddress=${ownerAddress}`;
    const { data: session } = useSession()
    if (session) {
        return (
            <Flex minWidth='max-content' alignSelf='center' gap='2'>
                <Box bgColor={'#BECFE3'}
                    w={350}

                    borderRight="1px"
                    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                    top={0}
                >
                    <VStack spacing={4}>
                        <Text align={'center'} paddingTop={10} fontSize='3xl'>EV Charger Location</Text>
                        <Stack align={'center'}>
                            <Input placeholder='keySearch' type='text' w={250} id='keySearch' name='keySearch'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, keySearch: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='chargerName' type='text' w={250} id='chargerName' name='chargerName'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, chargerName: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='csPath' type='text' w={250} id='csPath' name='csPath'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, csPath: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='location' type='text' w={250} id='location' name='location'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, location: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='deviceType' type='text' w={250} id='deviceType' name='deviceType'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, deviceType: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='online' type='text' w={250} id='online' name='online'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, online: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='deviceId' type='text' w={250} id='deviceId' name='deviceId'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, deviceId: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='ownerAddress' type='text' w={250} id='ownerAddress' name='ownerAddress'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, ownerAddress: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Button colorScheme='teal' onClick={() => {
                                onOpen();
                                const axios = require('axios');
                                axios.get(`http://localhost:3014/home/api/station?${url}`).then(function (response: any) {
                                    const raw = response.data
                                    const cooked = raw.map((item: any) => {
                                        if (item.latlng != undefined) {
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
                                        }
                                        return item
                                    });
                                    setEVdata(cooked)
                                })
                                SearchButton();
                            }}>
                                Search
                            </Button>
                            <Drawer
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
                                        {EVdata.map((item) => {
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
                            </Drawer>
                        </Stack>
                    </VStack>
                </Box>
                <Map />
            </Flex >
        );
    }
    return (
        null
    )
}