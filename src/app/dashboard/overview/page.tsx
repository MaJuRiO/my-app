'use client'
import {
    Box,
    chakra,
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
    SliderMark,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SlEnergy } from "react-icons/sl";
import { FiServer } from 'react-icons/fi';
import { useSearchParams } from 'next/navigation'
import StatusIndicator from '../../components/status'
const axios = require('axios');

export default function BasicStatistics() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const searchParams = useSearchParams()
    const url = `http://localhost:3014/home/api/station?${searchParams?.toString()}`
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(url);
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    console
    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} padding={20} >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }} >
                <Stat
                    px={{ base: 2, md: 4 }}
                    py={'5'}
                    shadow={'xl'}
                    border={'1px solid'}
                    borderColor={useColorModeValue('gray.800', 'gray.500')}
                    rounded={'lg'}
                    position={'sticky'}>
                    <Flex justifyContent={'space-between'}>
                        <Box pl={{ base: 2, md: 4 }}>
                            <StatLabel fontWeight={'medium'} isTruncated>
                                Status<StatusIndicator />
                            </StatLabel>
                            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                ChargerName: {data.map(item => (<span>{item.chargerName}</span>))}
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
                    px={{ base: 2, md: 4 }}
                    py={'5'}
                    shadow={'xl'}
                    border={'1px solid'}
                    borderColor={useColorModeValue('gray.800', 'gray.500')}
                    rounded={'lg'}>
                    <Flex justifyContent={'space-between'}>
                        <Box pl={{ base: 2, md: 4 }}>
                            <StatLabel fontWeight={'medium'} isTruncated>
                                HeartbeatInterval
                            </StatLabel>
                            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                {data.map(item => (<span>{item.heartbeatInterval}</span>))}
                            </StatNumber>
                        </Box>
                        <Slider aria-label='slider-ex-4' defaultValue={30}>
                            <SliderTrack bg='red.100'>
                                <SliderFilledTrack bg='tomato' />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                                <Box color='tomato' />
                            </SliderThumb>
                        </Slider>
                        <Box
                            my={'auto'}
                            color={useColorModeValue('gray.800', 'gray.200')}
                            alignContent={'center'}>
                            <FiServer size={'3em'} />
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
                    <Flex justifyContent={'space-between'}>
                        <Box pl={{ base: 2, md: 4 }}>
                            <StatLabel fontWeight={'medium'} isTruncated>
                                Location
                            </StatLabel>
                            <StatNumber fontSize={'xl'} fontWeight={'medium'} minW={100} maxW={250}>
                                {data.map(item => (<span>{item.latlng}</span>))}
                            </StatNumber>
                        </Box>
                        <Box
                            my={'auto'}
                            color={useColorModeValue('gray.800', 'gray.200')}
                            alignContent={'center'}>
                            <FiServer size={'3em'} />
                        </Box>
                    </Flex>
                </Stat>
            </SimpleGrid>
        </Box>
    );
}