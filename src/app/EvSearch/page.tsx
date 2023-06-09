'use client'
import {
    Select,
    Flex,
    VStack,
    Box,
    Divider,
    AbsoluteCenter,
    Input,
    useColorModeValue,
    Button,
    Stack,
    Text,
    Spacer,
    useDisclosure,
    ListItem,
    List,
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'
import { useState } from 'react';

interface IOption {
    _id: string;
    Fname: string;
    Lname: String;
    Email: String;
    Location_province: String;
    Location_amphure: String;
    Location_tambon: String;
    zip_code: number;
    CA: String;
    HB_rate: number;
}

export default function Page() {
    const axios = require('axios');
    const [responseData, setResponseData] = useState<IOption[]>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const data = axios.get('http://localhost:3000/api/getCharger').then((response: any) => {
        const data = response.data
        setResponseData(data);
    })
        .catch((error: string | undefined) => {
            throw new Error(error).message;
        });

    return (
        <Flex minWidth='max-content' alignSelf='center' gap='2'>
            <Box bgColor={'#BECFE3'}
                w={'320px'}
                h={'100vh'}
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                top={0}
            >
                <VStack
                    spacing={4}
                >
                    <Text align={'center'} paddingTop={10} fontSize='3xl'>EV Charger Location</Text>
                    <Stack align={'center'}>
                        <Select placeholder='จังหวัด' w={300} marginTop={10}>
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
                        <Input placeholder='CA' w={300} />
                    </Stack>
                    <Stack align={'center'} marginTop={50} >
                        <Button colorScheme='yellow' >Search</Button>
                    </Stack>
                </VStack>
            </Box>
            <Spacer />
            <Box>
                <Button onClick={onOpen}><HamburgerIcon /></Button>
                <Modal isOpen={isOpen} onClose={onClose} size={'xl'} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <List spacing={2}>
                                {responseData?.map(function (object: IOption, i: any) {
                                    return <ListItem border={'solid'} fontSize='xl'>
                                        {object.CA} {object.Location_province} {object.Location_amphure} {object.Location_tambon}
                                        </ListItem>
                                })}
                            </List>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

        </Flex >


    );
}