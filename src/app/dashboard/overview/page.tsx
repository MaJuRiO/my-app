'use client'
import {
    Box,
    Center,
    Image,
    Container,
    Flex,
    Icon,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Text,
    Tooltip,
    Button,
    FormControl,
    Spacer,
    Editable,
    EditablePreview,
    EditableInput,
    EditableTextarea,
    useToast,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SlEnergy } from "react-icons/sl";
import { FiServer } from 'react-icons/fi';
import { useSearchParams } from 'next/navigation'
import { OnlineIndicator, OfflineIndicator } from '../../components/status'
const axios = require('axios');
import { FaLock, FaGlobeAsia, FaPowerOff } from "react-icons/fa";
import { CustomControlsExample } from '../../components/Editinput'
import { ColorStatusIconButton } from '@/app/components/ColorStatus';
type Connector = {
    chargerName: String;
    connectorId: number;
    connectorStatus: String;
    connectorType: String
    connectorRating: number;
};
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
    public: boolean;
    heartbeatInterval: number;
    dateModified: string;
    serviceRateLabel: string;
    serviceHourLabel: string;
    noOfconnector: number;
    connector: Connector[];
}
import { useRouter } from 'next/navigation';
import { TfiMapAlt } from "react-icons/tfi";
import { useSession } from 'next-auth/react';

export default function BasicStatistics() {
    const [data, setData] = useState<typedata | any>()
    const searchParams = useSearchParams()
    const [sliderValue, setSliderValue] = React.useState(0)
    const [showTooltip, setShowTooltip] = React.useState(false)
    const [loading, setloading] = useState(false)
    const { data: session } = useSession()
    const router = useRouter();
    const toast = useToast()
    const url = `http://localhost:3014/home/api/station?${searchParams?.toString()}`
    // get api for pull charger data
    useMemo(() => {
        axios.get(url).then(function (response: any) {
            const raw = response.data[0]
            const condition: Record<string, string> = {
                ac2: 'AC type 2',
                dcccs: 'DC CCS Type 2',
                dccha: 'CHAdeMO',
            };

            // Iterate over the connectors and modify the connectorType based on the condition
            for (const connector of raw.connector) {
                if (connector.connectorType in condition) {
                    connector.connectorType = condition[connector.connectorType];
                }
            }
            setData(raw)
            setSliderValue(response.data[0].heartbeatInterval)
            setloading(true)
        })
    }, []);

    // patch api for update profile charger
    function updateStation() {
        axios.patch(`http://localhost:3014/home/api/station/${data.chargerName}`,
            {
                "ownerShip": document.getElementById("ownerShip")!.getAttribute("value"),
                "heartbeatInterval": sliderValue,
                "deviceType": "",
                "stationName": document.getElementById("stationName")!.getAttribute("value"),
                "latlng": document.getElementById("latlng")!.innerText,
                "stationAddress": document.getElementById("stationAddress")!.innerText,
                "serviceRate": "",
                "serviceRateLabel": "",
                "serviceHourLabel": document.getElementById("serviceHourLabel")!.getAttribute("value"),
                "keySearch": ""
            }).then(function () {
                toast({
                    title: 'Station updated!',
                    description: "Station Profile will update soon!",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    //patch api for ปิดการ online ของเครื่อง charger
    function TurnOFFCharger() {
        axios.patch(`http://localhost:3014/home/api/station/${data.chargerName}`, { "online": "off" })
    }

    //popup ปิดการ online ของเครื่อง charger
    const TurnOffmodal = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        return (
            <>
                <IconButton
                    colorScheme='orange'
                    aria-label='TurnOFF'
                    icon={<FaPowerOff size={20} />}
                    onClick={onOpen} />
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Warning</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Do you want to turn off this charger
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => { TurnOFFCharger(); onClose(); window.location.reload(); }}>
                                Sure
                            </Button>
                            <Button variant='red.500' onClick={onClose}>Cancle</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }
    if (loading && session?.user.role === "admin")
        return (
            <Container maxW="6xl" mx={'auto'} px={{ base: 2, sm: 12, md: 17 }} pos={'fixed'} mt={'60px'}>
                <Flex justify={'right'}>
                    <Button onClick={() => {
                        updateStation();
                        window.location.reload();
                    }}
                        height={'fit-content'} borderRadius='2px'>Save</Button>
                    <Button onClick={() => { window.location.reload() }} height={'fit-content'} borderRadius='2px'>Cancel</Button></Flex>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }} >
                    <Stat
                        shadow={'xl'}
                        border={'1px solid'}
                        borderColor={useColorModeValue('gray.800', 'gray.500')}
                        rounded={'lg'}
                        position={'sticky'}>
                        <StatLabel fontWeight={'medium'} isTruncated bgColor={'purple.400'} fontSize={'2xl'} padding={2} rounded={'7px 7px 0px 0px'}>
                            ChargerName: {data.chargerName}
                        </StatLabel>
                        <Flex justifyContent={'space-between'} paddingTop={3}>
                            <Box pl={{ base: 2, md: 4 }}>
                                <StatNumber fontSize={'sm'} fontWeight={'medium'} >
                                    <Flex align="center">
                                        {data.online === 'on' ? (<Box marginRight={2} >
                                            <TurnOffmodal />
                                        </Box>) : null}
                                        <Text>Status :</Text>
                                        {data.online === 'on' ? (<OnlineIndicator />) : <OfflineIndicator />}
                                        <Text marginRight={3}>Access :</Text>
                                        {data.public == true ? (<Tooltip label={`Public`}><Box><FaGlobeAsia size={20} /></Box></Tooltip>) : <Tooltip label={`Private`}><Box><FaLock size={20} /></Box></Tooltip>}
                                    </Flex>
                                </StatNumber>
                            </Box>
                            <Box
                                my={'auto'}
                                color={useColorModeValue('gray.800', 'gray.200')}
                                alignContent={'center'}>
                                <SlEnergy size={'3em'} />
                            </Box>
                        </Flex>
                    </Stat>

                    <Stat
                        shadow={'xl'}
                        border={'1px solid'}
                        borderColor={useColorModeValue('gray.800', 'gray.500')}
                        rounded={'lg'}>
                        <StatLabel fontWeight={'medium'} isTruncated bgColor={'purple.400'} fontSize={'2xl'} padding={2} rounded={'7px 7px 0px 0px'}>
                            Heartbeat   Interval
                        </StatLabel>
                        <Flex
                            justifyContent={'space-between'}
                            px={{ base: 2, md: 4 }}
                            py={'5'}>
                            <Box pl={{ base: 2, md: 4 }}>
                                <StatNumber fontSize={'2xl'} fontWeight={'medium'} id='hbinterval'>
                                    {data.heartbeatInterval}
                                </StatNumber>
                            </Box>
                            <Slider w={'50%'} aria-label='slider-ex-4' defaultValue={data.heartbeatInterval} min={0} max={100} step={5} onChange={(v) => setSliderValue(v)}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}>
                                <SliderTrack bgGradient='linear(to-l, #7928CA, #FF0080,0.9)'>
                                    <SliderFilledTrack bgGradient='linear(to-l, #7928CA, #FF0080)' />
                                </SliderTrack>
                                <Tooltip
                                    hasArrow
                                    bg='purple.500'
                                    color='white'
                                    placement='top'
                                    isOpen={showTooltip}
                                    label={`${sliderValue}`}>
                                    <SliderThumb boxSize={6}>
                                        <Box color='tomato' />
                                    </SliderThumb>
                                </Tooltip>
                            </Slider>
                            <Box my={'auto'}
                                color={useColorModeValue('gray.800', 'gray.200')}
                                alignContent={'center'}><Button colorScheme="messenger" size='sm' textAlign={'center'} onClick={() => {
                                    document.getElementById('hbinterval')!.innerHTML = sliderValue.toString()
                                }}>Confirm</Button></Box>
                            <Box
                                my={'auto'}
                                color={useColorModeValue('gray.800', 'gray.200')}
                                alignContent={'center'}>
                                <FiServer size={'3em'} />
                            </Box>
                        </Flex>
                    </Stat>

                    <Stat
                        shadow={'xl'}
                        border={'1px solid'}
                        borderColor={useColorModeValue('gray.800', 'gray.500')}
                        rounded={'lg'}>
                        <StatLabel fontWeight={'medium'} isTruncated bgColor={'purple.300'} fontSize={'2xl'} padding={2} rounded={'7px 7px 0px 0px'}>
                            Location
                        </StatLabel>
                        <Flex justifyContent={'space-between'} px={{ base: 2, md: 4 }}
                            py={'5'}>
                            <Box pl={{ base: 2, md: 4 }}>
                                <StatNumber fontSize={'xl'} fontWeight={'medium'} minW={100} maxW={500}>
                                    <Text fontSize={'xs'} color={'gray'}>
                                        <Editable defaultValue={data.latlng} id='latlng'>
                                            <EditablePreview />
                                            <EditableTextarea />
                                        </Editable>
                                    </Text>
                                    {data.stationAddress == null ?
                                        <Editable defaultValue='No Address' id='stationAddress'>
                                            <EditablePreview />
                                            <EditableTextarea />
                                        </Editable>
                                        : <Editable defaultValue={data.stationAddress} id='stationAddress'><EditablePreview />
                                            <EditableTextarea />
                                        </Editable>}
                                </StatNumber>
                            </Box>
                            <Box
                                my={'auto'}
                                color={useColorModeValue('gray.800', 'gray.200')}
                                alignContent={'center'}>
                                <TfiMapAlt size={'3em'} />
                            </Box>
                        </Flex>
                    </Stat>

                    <Stat
                        shadow={'xl'}
                        border={'1px solid'}
                        borderColor={useColorModeValue('gray.800', 'gray.500')}
                        rounded={'lg'}>
                        <StatLabel fontWeight={'medium'} isTruncated bgColor={'purple.300'} fontSize={'2xl'} padding={2} rounded={'7px 7px 0px 0px'} h={'52px'}>
                            Connector Status:{data.noOfconnector}<ColorStatusIconButton />
                        </StatLabel>
                        <Flex justifyContent={'space-between'} px={{ base: 2, md: 4 }}
                            py={'5'}>
                            <Box pl={{ base: 2, md: 4 }}>
                                <StatNumber fontSize={'xl'} fontWeight={'medium'} minW={100} maxW={500}>
                                    <Flex gap={10}>
                                        {data.connector.map((item: any) => {
                                            if (item.connectorId != 0 && item.connectorStatus == 'Available')
                                                return (
                                                    <>
                                                        <Box><Image src='\charging-station-Available.png' boxSize='60px' />
                                                            <Text fontSize='sm'>
                                                                <Text>Connector Id: {item.connectorId}</Text>
                                                                <Text>Status: {item.connectorStatus}</Text>
                                                                <Text>Rating: {item.connectorRating}</Text>
                                                                <Text>Type: {item.connectorType}</Text></Text></Box>
                                                    </>)
                                            if (item.connectorId != 0 && item.connectorStatus == 'Preparing')
                                                return (
                                                    <>
                                                        <Box><Image src='\charging-station-Preparing.png' boxSize='60px' />
                                                            <Text fontSize='sm'>
                                                                <Text>Connector Id: {item.connectorId}</Text>
                                                                <Text>Status: {item.connectorStatus}</Text>
                                                                <Text>Rating: {item.connectorRating}</Text>
                                                                <Text>Type: {item.connectorType}</Text></Text></Box>
                                                    </>)
                                            if (item.connectorId != 0 && item.connectorStatus == 'Charging')
                                                return (
                                                    <>
                                                        <Box><Image src='\charging-station-Finishing.png' boxSize='60px' />
                                                            <Text fontSize='sm'>
                                                                <Text>Connector Id: {item.connectorId}</Text>
                                                                <Text>Status: {item.connectorStatus}</Text>
                                                                <Text>Rating: {item.connectorRating}</Text>
                                                                <Text>Type: {item.connectorType}</Text></Text></Box>
                                                    </>)
                                            if (item.connectorId != 0 && item.connectorStatus == 'Finishing')
                                                return (
                                                    <>
                                                        <Box><Image src='\charging-station-Faulted.png' boxSize='60px' />
                                                            <Text fontSize='sm'>
                                                                <Text>Connector Id: {item.connectorId}</Text>
                                                                <Text>Status: {item.connectorStatus}</Text>
                                                                <Text>Rating: {item.connectorRating}</Text>
                                                                <Text>Type: {item.connectorType}</Text></Text></Box>
                                                    </>)
                                            if (item.connectorId != 0 && item.connectorStatus == 'Unavailable')
                                                return (
                                                    <>
                                                        <Box><Image src='\charging-station-Unavailable.png' boxSize='60px' />
                                                            <Text fontSize='sm'>
                                                                <Text>Connector Id: {item.connectorId}</Text>
                                                                <Text>Status: {item.connectorStatus}</Text>
                                                                <Text>Rating: {item.connectorRating}</Text>
                                                                <Text>Type: {item.connectorType}</Text></Text></Box>
                                                    </>)
                                        })}
                                    </Flex>
                                </StatNumber>
                            </Box>
                        </Flex>
                    </Stat>

                    <Stat
                        px={{ base: 2, md: 4 }}
                        py={'5'}
                        shadow={'xl'}
                        border={'1px solid'}
                        borderColor={useColorModeValue('gray.800', 'gray.500')}
                        rounded={'lg'}>

                        <Flex align={'center'}>
                            <Text fontWeight={'medium'} isTruncated  >
                                Station Name   :
                            </Text>
                            <CustomControlsExample value={data.stationName} name={'stationName'} />
                        </Flex>

                        <Flex align={'center'}>
                            <Text fontWeight={'medium'} isTruncated  >
                                ownerShip   :
                            </Text>
                            <CustomControlsExample value={data.ownerShip} name={'ownerShip'} />
                        </Flex>

                        <Flex align={'center'}>
                            <Text fontWeight={'medium'} isTruncated  >
                                serviceHourLabel    :
                            </Text>
                            <CustomControlsExample value={data.serviceHourLabel} name={'serviceHourLabel'} />
                        </Flex>

                    </Stat>
                </SimpleGrid>
            </Container >
        );
}