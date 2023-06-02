'use client'
import React, { ReactNode, useEffect, useState } from 'react';

import {
    Select,
    Flex,
    VStack,
    StackDivider,
    Box,
    Divider,
    AbsoluteCenter,
    Input,
    useColorModeValue,
    Button,
    Stack,
    Img,
    Text,
    Link 
} from '@chakra-ui/react'

export default function Search() {
    return (
        <Flex bgColor={'#8CD9F3'}>
            <VStack
                bgColor={'#BECFE3'}
                spacing={4}
                align='left'
                justify={'left'}
                minW={'370px'}
                minH="100vh"
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            >
                <Text align={'center'} paddingTop={10} fontSize='3xl'>EV Charger Location</Text>
                <Stack align={'center'}>
                    <Select placeholder='จังหวัด' maxW={300} marginTop={10}>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </Stack>
                <Stack align={'center'}>
                    <Select placeholder='อำเภอ' w={300} >
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </Stack>

                <Box position='relative' padding='3' >
                    <Divider />
                    <AbsoluteCenter bg='white' px='4' backgroundColor={'#BECFE3'}>
                        or
                    </AbsoluteCenter>
                </Box>
                <Stack align={'center'}>
                    <Input placeholder='CA' maxW={300} />
                </Stack>
                <Stack align={'center'} marginTop={50} >
                    <Button colorScheme='yellow' >Search</Button>
                </Stack>
            </VStack>
            <Stack justify={'center'} marginLeft={{ base: '0', sm: '15%' }}>
                <Img src={'previewmap.png'} bgAttachment={'fixed'}/>
            </Stack>
        </Flex>

    );
}