'use client'
import { Box, Container, Flex, Grid, HStack, Spacer, Stack, Text, Image, Button, Center } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from "react";
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import '../ChargerConnector/style.css'
import { io } from 'socket.io-client';
import { WarningTwoIcon } from '@chakra-ui/icons'
import PieChartExample from '@/app/components/batteryBar'
const socket = io("https://volta.kapacitor.me/", { transports: ['websocket'] });
type jsontype = {
    method: string;
    data: datatype;
}
type datatype = {
    transactionId: string
    chargerName: string
    connectorId: number
    timestamp: string
    timeFormat: string
    chargingTime: string
    soc: number
    chargingkWh: number
    whStamp: number
    voltage: number
    current: number
    power: number
    remainTime: number
}

export default function page() {
    const { data: session } = useSession()
    const searchParams = useSearchParams()?.get('chargerName')
    const [message, setMessage] = useState("");
    const [jsondata, setJsondata] = useState<jsontype>()
    const axios = require('axios');
    useEffect(() => {
        let isMounted = true;
        socket.on(`${searchParams}`, data => {
            setMessage(data);
        })
        if (message !== "" && isMounted) {
            const JSONDATA = JSON.parse(message)
            setJsondata(JSONDATA)
        }
        return () => {
            // 👇️ when the component unmounts, set isMounted to false
            isMounted = false;
        };
    }, [message])

    function stoptran() {
        axios.post(`${process.env.NEXT_PUBLIC_API_OCCP_PRODUCTION_ADDRESS}/ocpp/api/RemoteStopTransaction`, {
            "chargerName": `${jsondata?.data.chargerName}`,
            "transactionId": `${jsondata?.data.transactionId}`
        })
    }

    if (session?.user.role === "admin")
        return (
            <Box mt={50} mr={20} ml={20}>
                <Flex justifyContent={'space-between'}>
                    <Text pb={2}>Charger Name:{jsondata?.data.chargerName} Connector ID:{jsondata?.data.connectorId}</Text>
                    <Button onClick={() => stoptran()}>Stop<WarningTwoIcon /> </Button>
                </Flex>

                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: 4, md: 4, lg: 10 }}
                    justifyContent={'space-between'}>
                    <Box w='240px' bg='#F1C40F' h={90} className='Card' >
                        <Flex justifyContent={'space-between'} padding={'2'}>
                            <Image src='/lightning.png' boxSize='40px' alt='voltage' />
                            <Text color={'black'} className='text'>{parseFloat(jsondata?.data.voltage).toFixed(2)}</Text>
                        </Flex>
                        <Text color={'black'} textAlign={'right'} padding={'2'}>voltage</Text>
                    </Box>

                    <Box w='240px' bg='#3498DB' h={90} className='Card'>
                        <Flex justifyContent={'space-between'} padding={'2'}>
                            <Image src='/water.png' boxSize='40px' alt='current' />
                            <Text className='text'>{parseFloat(jsondata?.data.current).toFixed(2)}</Text>
                        </Flex>
                        <Text textAlign={'right'} padding={'2'}>current</Text>
                    </Box>

                    <Box w='240px' bg='#FF5733' h={90} className='Card' >
                        <Flex justifyContent={'space-between'} padding={'2'}>
                            <Image src='/lamp.png' boxSize='40px' alt='power' />
                            <Text color={'black'} className='text'> {parseFloat(jsondata?.data.power).toFixed(2)}</Text>
                        </Flex>
                        <Text color={'black'} textAlign={'right'} padding={'2'}> power</Text>
                    </Box>

                    <Box w='240px' bg='#27AE60' h={90} className='Card' >
                        <Flex justifyContent={'space-between'} padding={'2'}>
                            <Image src='/charging.png' boxSize='40px' alt='charging' />
                            <Text className='text'>{parseFloat(jsondata?.data.chargingkWh).toFixed(2)}</Text>
                        </Flex>
                        <Text textAlign={'right'} padding={'2'}> charging kW/h</Text>
                    </Box>
                </Stack>



                <Flex justifyContent={'space-between'} pt={7}>
                    <Box h={'400px'} w={'534px'} bgColor={'white'}>
                        <Text color={'black'} textAlign={'center'}>battery progress</Text>
                        <Center>
                            <Box w={300} h={300}><PieChartExample soc={jsondata?.data.soc} /></Box>
                        </Center>
                    </Box>
                    <Box h={400} w={'534px'} bgColor={'white'}></Box>
                </Flex>
                <Flex justifyContent={'space-between'} pt={7}>
                    <Box h={400} w={'534px'} bgColor={'white'}></Box>
                    <Box h={400} w={'534px'} bgColor={'white'}></Box>
                </Flex>
                <Flex justifyContent={'space-between'} pt={7}>
                    <Box h={400} w={'534px'} bgColor={'white'}></Box>
                    <Box h={400} w={'534px'} bgColor={'white'}></Box>
                </Flex>
            </Box>
        )
}