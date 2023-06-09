'use client'
import React, { useState } from "react";
import {
    Spacer,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Img
} from '@chakra-ui/react';
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Flex maxW={'100%'} py={12} bgImage={'.../public/map.png'}
            bgRepeat={'no-repeat'}
            bgPosition={'left top'}
            bgAttachment={'fixed'}
            bgSize={'cover'}>
            <Stack spacing={8} mx={'left'} maxW={'md'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>ลงชื่อเข้าใช้สำหรับพนักงาน</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <form>
                            <FormControl id="Username" >
                                <FormLabel>Username</FormLabel>
                                <Input type="Username" isRequired={true} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" isRequired={true} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Log in
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack >
            <Stack justify={'center'} marginLeft={{ base: '0', sm: '15%' }}>
                <Img src={'LOGO-pea-removebg-preview.png'} />
            </Stack>
        </Flex >
    );
}