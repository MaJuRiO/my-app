'use client'
import {
    Center,
    Flex,
    VStack,
    Box,
    Input,
    useColorModeValue,
    Button,
    Stack,
    Text,
    useDisclosure,
    Icon,
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Map from '../components/map';
import mapboxgl from 'mapbox-gl';
import { removeMarker, poppoppop } from '../components/map';
import React from 'react';
const axios = require('axios');

type typedata = {
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

}
const CircleIcon = (props: any) => (
    <Icon viewBox='0 0 200 200' {...props}>
        <path
            fill='currentColor'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
        />
    </Icon>
)

export default function Page() {
    const [URL, setURL] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:3014/home/api/station?${URL}`).then(function (response: any) {
            const raw = response.data
            const cooked = raw.filter((item: any) => item.latlng != undefined)
            setUseData(cooked)
        })
    }, [URL])
    const [useData, setUseData] = useState<typedata[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
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
    const url = `keySearch=${keySearch}&chargerName=${chargerName}&csPath=${csPath}&location=${location}&deviceType=${deviceType}&online=${online}&deviceId=${deviceId}&ownerAddress=${ownerAddress}`;
    function Listpopup() {
        return (
            <Stack align={'center'}>
                <Button colorScheme='teal' onClick={() => {
                    onOpen();
                    setURL(url);
                }}>
                    Search
                </Button>
                <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='md'>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader textAlign={'center'}>--Electrical Vehicle Charger--</DrawerHeader>

                        <DrawerBody>
                            {useData.map((item) => {
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
            </Stack>)
    }

    const { data: session } = useSession()
    if (session?.user.role === "admin") {
        return (
            <Flex minWidth='max-content' alignSelf='center' gap='2' >
                <Box bgGradient={useColorModeValue([
                    'linear(to-tr, teal.300, yellow.400)',
                    'linear(to-t, blue.200, teal.500)',
                    'linear(to-b, orange.100, purple.300)',], ['linear(to-t, #460d5c, #4541b9'])}
                    w={350}
                    h={'100vh'}
                    borderRight="1px"
                    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                    pt={'60px'}>
                    <VStack spacing={4}>
                        <Text align={'center'} paddingTop={10} fontSize='3xl' fontWeight='extrabold'>EV Charger Location</Text>
                        <Stack align={'center'}>
                            <Input placeholder='Key Search' type='text' w={250} id='keySearch' name='keySearch' autoComplete='off'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, keySearch: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='Charger Name' type='text' w={250} id='chargerName' name='chargerName' autoComplete='off'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, chargerName: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='csPath' type='text' w={250} id='csPath' name='csPath' autoComplete='off'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, csPath: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'} hidden>
                            <Input placeholder='location' type='text' w={250} id='location' name='location' autoComplete='off'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, location: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='Device Type' type='text' w={250} id='deviceType' name='deviceType' autoComplete='off'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, deviceType: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='Online' type='text' w={250} id='online' name='online' autoComplete='off'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, online: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='Device Id' type='text' w={250} id='deviceId' name='deviceId' autoComplete='off'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, deviceId: e.target.value })); }} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='Owner Address' type='text' w={250} id='ownerAddress' name='ownerAddress' autoComplete='off'
                                onChange={(e) => { setkeysearch(prevState => ({ ...prevState, ownerAddress: e.target.value })); }} />
                        </Stack>
                        <Listpopup />
                    </VStack>
                </Box>
                <Map searchKey={URL} />
            </Flex >
        );
    }
    return (
        <Center bg='#460d5c' h='100vh'><Text color={'white'}>You are not admin</Text></Center>
    )
}