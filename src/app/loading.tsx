'use client'
import { Center, Spinner } from '@chakra-ui/react'
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (

        <Center h="100vh">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Center>

    )
}