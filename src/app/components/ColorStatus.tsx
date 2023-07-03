'use client'
import { Box, Button, Text, Icon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import React from 'react'
import { CircleIcon } from './CircleIcon'
export const ColorStatusIconButton = () => {
    const initialFocusRef = React.useRef()
    return (
        <Popover
            placement='bottom'
            closeOnBlur={false}
        >
            <PopoverTrigger>
                <IconButton
                    colorScheme='white'
                    aria-label='Infomation'
                    icon={<InfoOutlineIcon />}
                    color='red.500'
                    boxSize={'16px'}
                />
            </PopoverTrigger>
            <PopoverContent color='white' bg='blue.800' borderColor='blue.800' w={150}>
                <PopoverHeader pt={4} fontWeight='bold' border='0' fontSize={16}>
                    Status Colors
                </PopoverHeader>
                <PopoverArrow bg='blue.800' />
                <PopoverCloseButton />
                <PopoverBody fontSize={16}>
                    <Text><CircleIcon color="#FF3838" />  Finishing</Text>
                    <Text><CircleIcon color="#FFB302" />  Charging</Text>
                    <Text><CircleIcon color="#56F000" />  Available</Text>
                    <Text><CircleIcon color="#2DCCFF" />  Preparing</Text>
                    <Text><CircleIcon color="#A4ABB6" />  Unavailable</Text>
                </PopoverBody>
            </PopoverContent>
        </Popover>

    )

}