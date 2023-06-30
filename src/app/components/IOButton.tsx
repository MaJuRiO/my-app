"use client";
import { Box, Button, Flex, IconButton, Stack, Text, useColorMode } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

const IObutton = () => {
    const { data: session } = useSession()
    if (session && session.user) {
        return (
            <Flex align={'center'} >
                <Text className="text-sky-600" padding={5}>{session.user.Email}</Text>
                <Button colorScheme='purple' onClick={() => signOut()} className="text-red-600">
                    Sign Out
                </Button>
            </Flex>
        );
    } return (
        <Stack>
            <Button onClick={() => signIn()}>
                Login for Admin
            </Button>
        </Stack>
    );
};
export default IObutton;