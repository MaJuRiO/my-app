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
} from '@chakra-ui/react';
import React from 'react';
import { ReactNode } from 'react';
import { SlEnergy } from "react-icons/sl";
import { FiServer } from 'react-icons/fi';
import { RiRadioButtonLine } from "react-icons/ri";


export default function BasicStatistics() {
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
                                    Status
                                </StatLabel>
                                <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                    <Icon as={RiRadioButtonLine} color={"#00FF00"}
                                        shadow={1} />Avaliable
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
                                    test
                                </StatLabel>
                                <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                    test
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
                                <StatNumber fontSize={'2xl'} fontWeight={'medium'} minW={100} maxW={250}>
                                    ********************************************************************
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