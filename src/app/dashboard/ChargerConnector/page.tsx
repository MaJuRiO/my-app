'use client'
import {
    Box, useColorModeValue, Flex, Grid, HStack, Spacer, Stack, Text, Image, Button, Center, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Tooltip, IconButton, useBoolean,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from "react";
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import AlertDialogExample from '../../components/Alert'
import '../ChargerConnector/style.css'
import { io } from 'socket.io-client';
import { WarningTwoIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons'
import PieChartExample from '@/app/components/batteryBar'
const socket = io("https://volta.kapacitor.me/", { transports: ['websocket'] });
type MeterType = {
    method: string;
    data: MeterDatatype;
}
type MeterDatatype = {
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
type StatusNotiType = {
    method: string;
    data: StatusNoti_Datatype;
}
type StatusNoti_Datatype = {
    connectorId: number,
    status: string,
    errorCode: string,
    info: string,
    vendorId: string,
    vendorErrorCode: string
}

export default function page() {
    const { data: session } = useSession()
    const searchParams = useSearchParams()?.get('chargerName')
    const [message, setMessage] = useState("");
    const [Meterdata, setMeterdata] = useState<MeterType|any>()
    const [StatusNoti, setStatusNoti] = useState<StatusNotiType>()
    const axios = require('axios');
    const [currentValue, setcurrenValue] = useState(Meterdata?.data.current)
    const [powerValue, setpowerValue] = useState(Meterdata?.data.power)
    const [showTooltipCurrent, setShowTooltipCurrent] = React.useState(false)
    const [showTooltipPower, setShowTooltipPower] = React.useState(false)
    const [lockButton,setLockbutton] = useState(false)
    const [lockcurrent, setlockCurrent] = useBoolean()
    const [lockpower, setlockpower] = useBoolean()
    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_OCCP_PRODUCTION_ADDRESS}/ocpp/api/command`, {
            "chargerName": `${searchParams}`,
            "method": "TriggerMessage",
            "params": {
                "requestedMessage": "StatusNotification",
                "connectorId": 0
            }
        }).then(function (response: any) {
            response.status
        }).catch(function (error: any) {
            setlockCurrent.toggle()
            setlockpower.toggle()
            setLockbutton(true)
            onOpen();
        });
    }, [])
    useEffect(() => {
        let isMounted = true;
        socket.on(`${searchParams}`, data => {
            setMessage(data);
        })
        if (message !== "" && isMounted) {
            const JSONDATA = JSON.parse(message)
            if (JSONDATA?.method == 'MeterValues') {
                setMeterdata(JSONDATA)
            }
            else if (JSONDATA?.method == 'StatusNotification') {
                setStatusNoti(JSONDATA)
            }

            setcurrenValue(Meterdata?.data.current)
            setpowerValue(Meterdata?.data.power)
        }
        return () => {
            // 👇️ when the component unmounts, set isMounted to false
            isMounted = false;
        };
    }, [message])

    
    const { isOpen, onOpen, onClose } = useDisclosure()
    function ConnectorNotconnect() {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Alert! </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Charger Connector:{searchParams} not connected
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>)
    }

    if (session?.user.role === "admin")
        return (
            <Box mt={50} mr={20} ml={20}>
                <Flex justifyContent={'space-between'}>
                    <Text pb={2}>Charger Name:</Text>
                    <Text>{Meterdata?.data.chargerName}</Text>
                    <Text>Connector Status:</Text>
                    <Text>{StatusNoti?.data.status}</Text>
                </Flex>
                <ConnectorNotconnect />
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: 4, md: 4, lg: 10 }}
                    justifyContent={'space-between'}>
                    <Box w='240px' bg='#F1C40F' h={90} className='Card' >
                        <Flex justifyContent={'space-between'} padding={'2'}>
                            <Image src='/lightning.png' boxSize='40px' alt='voltage' />
                            <Text color={'black'} className='text'>{parseFloat(Meterdata?.data.voltage).toFixed(2)}</Text>
                        </Flex>
                        <Text color={'black'} textAlign={'right'} padding={'2'}>voltage</Text>
                    </Box>

                    <Box w='240px' bg='#3498DB' h={90} className='Card'>
                        <Flex justifyContent={'space-between'} padding={'2'}>
                            <Image src='/water.png' boxSize='40px' alt='current' />
                            <Text className='text'>{parseFloat(Meterdata?.data.current).toFixed(2)}</Text>
                        </Flex>
                        <Text textAlign={'right'} padding={'2'}>current</Text>
                    </Box>

                    <Box w='240px' bg='#FF5733' h={90} className='Card' >
                        <Flex justifyContent={'space-between'} padding={'2'}>
                            <Image src='/lamp.png' boxSize='40px' alt='power' />
                            <Text color={'black'} className='text'> {parseFloat(Meterdata?.data.power).toFixed(2)}</Text>
                        </Flex>
                        <Text color={'black'} textAlign={'right'} padding={'2'}> power</Text>
                    </Box>

                    <Box w='240px' bg='#27AE60' h={90} className='Card' >
                        <Flex justifyContent={'space-between'} padding={'2'}>
                            <Image src='/charging.png' boxSize='40px' alt='charging' />
                            <Text className='text'>{parseFloat(Meterdata?.data.chargingkWh).toFixed(2)}</Text>
                        </Flex>
                        <Text textAlign={'right'} padding={'2'}> charging kW/h</Text>
                    </Box>
                </Stack>

                <Flex justifyContent={'space-between'} pt={7}>
                    <Box h={'400px'} minW={'35vw'} rounded={2} bgColor={useColorModeValue('gray.200', 'gray.500')}>
                        <Text color={'black'} textAlign={'center'} fontSize={'26px'}>Battery Progress</Text>
                        <Center>
                            <Box w={300} h={300}><PieChartExample soc={Meterdata?.data.soc} /></Box>
                        </Center>
                    </Box>
                    <Box h={400} minW={'35vw'} rounded={2} bgColor={useColorModeValue('gray.200', 'gray.500')}>
                        <Flex justifyContent={'space-between'} padding={'6px 15px 2px 15px'}>
                            <Text w='70px'>Current</Text>
                            <Slider paddingLeft={2} aria-label='slider-ex-6' onChange={(val) => setcurrenValue(val)}
                                w={250} min={0} max={300}
                                onMouseEnter={() => setShowTooltipCurrent(true)}
                                onMouseLeave={() => setShowTooltipCurrent(false)}
                                isDisabled={lockcurrent}>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <Tooltip
                                    hasArrow
                                    bg='teal.500'
                                    color='white'
                                    placement='top'
                                    isOpen={showTooltipCurrent}
                                    label={`${currentValue}`}
                                >
                                    <SliderThumb />
                                </Tooltip>
                            </Slider>
                            {lockcurrent == true ?
                                <IconButton
                                    variant='outline'
                                    colorScheme='teal'
                                    aria-label='Send email'
                                    icon={<UnlockIcon />}
                                    isDisabled={lockButton}
                                    onClick={setlockCurrent.toggle}
                                /> :
                                <IconButton
                                    variant='outline'
                                    colorScheme='teal'
                                    aria-label='Send email'
                                    icon={<LockIcon />}
                                    isDisabled={lockButton}
                                    onClick={setlockCurrent.toggle}
                                />}
                        </Flex>

                        <Flex justifyContent={'space-between'} padding={'6px 15px 2px 15px'}>
                            <Text w='70px'>Power</Text>
                            <Slider paddingLeft={2} aria-label='slider-ex-6' onChange={(val) => setpowerValue(val)}
                                w={250} min={0} max={300}
                                onMouseEnter={() => setShowTooltipPower(true)}
                                onMouseLeave={() => setShowTooltipPower(false)}
                                isDisabled={lockpower}>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <Tooltip
                                    hasArrow
                                    bg='teal.500'
                                    color='white'
                                    placement='top'
                                    isOpen={showTooltipPower}
                                    label={`${powerValue}`}
                                >
                                    <SliderThumb />
                                </Tooltip>
                            </Slider>
                            {lockpower == true ?
                                <IconButton
                                    variant='outline'
                                    colorScheme='teal'
                                    aria-label='Send email'
                                    icon={<UnlockIcon />}
                                    isDisabled={lockButton}
                                    onClick={setlockpower.toggle}
                                /> :
                                <IconButton
                                    variant='outline'
                                    colorScheme='teal'
                                    aria-label='Send email'
                                    icon={<LockIcon />}
                                    isDisabled={lockButton}
                                    onClick={setlockpower.toggle}
                                />}
                        </Flex>
                    </Box>
                </Flex >
                <Center paddingTop={5}>
                    {AlertDialogExample(Meterdata)}
                </Center>

            </Box >
        )
}