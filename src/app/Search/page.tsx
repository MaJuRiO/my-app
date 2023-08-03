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
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Map, { removeMarker } from '../components/map';
import React from 'react';
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

export default function Page() {
    const [URL, setURL] = useState('');
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
    const { data: session } = useSession()
    if (session?.user.role === "admin") {
        return (
            <Flex minWidth='max-content' alignSelf='center' gap='2' >
                <Box bgGradient={useColorModeValue(['linear(to-b, orange.100, purple.300)'], ['linear(to-t, #4541b9, #460d5c)'])}
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
                        <Button colorScheme='teal' onClick={() => {
                            setURL(url)
                            removeMarker()
                        }}>
                            Search
                        </Button>
                    </VStack>
                </Box>
                <Map searchKey={URL} onClose={() => onClose} isOpen={isOpen}/>
            </Flex >
        );
    }
    return (
        <Center bg='#460d5c' h='100vh'><Text color={'white'}>You are not admin</Text></Center>
    )
}