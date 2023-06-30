import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    Link,
    useDisclosure,
    Img,
    Icon,
    useColorMode,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
} from '@chakra-ui/icons';
import IOButton from './IOButton';
import { FaMoon, FaSun } from "react-icons/fa";
export function Nav() {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
        <Flex
            margin={0}
            position='fixed'
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            h={'60px'}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}
            id="nav"
        >
            <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                <Text
                    textAlign={({ base: 'center', md: 'left' })}
                    fontFamily={'heading'}
                    color={useColorModeValue('gray.800', 'white')}>
                    <Link href='\'>
                        <Img height="60px" src="/pea.png" alt="logo" />
                    </Link>
                </Text>
            </Flex>
            <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                <IOButton />
                <IconButton
                    alignSelf={'center'}
                    aria-label="toggle theme"
                    rounded="full"
                    size="s"
                    onClick={toggleColorMode} icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                />
            </Stack>
        </Flex>
    );
}