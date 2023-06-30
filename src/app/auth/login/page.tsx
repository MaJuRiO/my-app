'use client'
import React, { useState } from "react";
import {
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
import { signIn } from "next-auth/react";
import mapImage from "../../../../public/map.png";
import PEALogo from "../../../../public/LOGO-pea-removebg-preview.png"
export default function Login() {
    const [EMAIL,SetEmail] = useState("")
    const [Password,SetPassword] = useState("")
    const onsubmit = () => {
        signIn("credentials",
            {
                Email: EMAIL,
                password: Password,
                redirect: true,
                callbackUrl: "/"
            })
            
    }
    return (
        <Flex maxW={'100%'} py={12} bgImage={`url(${mapImage.src})`} h={'100vh'}
            bgRepeat={'no-repeat'}
            bgPosition={'left top'}
            bgAttachment={'fixed'}
            bgSize={'cover'}>
            <Stack spacing={8} mx={'left'} maxW={'md'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>ลงชื่อเข้าใช้สำหรับพนักงาน</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                            <FormControl id="Email" >
                                <FormLabel>Username</FormLabel>
                                <Input type="Email" isRequired={true} id="Email" onChange={(e)=>{SetEmail(e.target.value)}}/>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" isRequired={true} name="password" onChange={(e)=>{SetPassword(e.target.value)}} />
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
                                    }}
                                    onClick={onsubmit}
                                >
                                    Log in
                                </Button>
                            </Stack>
                    </Stack>
                </Box>
            </Stack >
            <Stack justify={'center'} marginLeft={{ base: '0', sm: '15%' }}>
                <Img src={`${PEALogo.src}`} />
            </Stack>
        </Flex >
    );
}