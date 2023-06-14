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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LISTALL from '../components/LISTALL';


export default function Page() {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ca, setCA] = useState('');

    const [{ keySearch, chargerName, csPath, location, deviceType, online, deviceId, ownerAddress }, setkeysearch] = useState({
        keySearch: "",
        chargerName: "",
        csPath: "",
        location: "",
        deviceType: "",
        online: "",
        deviceId: "",
        ownerAddress: ""
    });

    const url = `/dashboard/overview?keySearch=${keySearch}&chargerName=${chargerName}&csPath=${csPath}&location=${location}&deviceType=${deviceType}&online=${online}&deviceId=${deviceId}&ownerAddress=${ownerAddress}`;
    const { data: session } = useSession()
    if (session) {
        return (
            <Flex minWidth='max-content' alignSelf='center' gap='2'>
                <Box bgColor={'#BECFE3'}
                    w={'320px'}
                    h={'100vh'}
                    borderRight="1px"
                    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                    top={0}
                >
                    <VStack spacing={4}>
                        <Text align={'center'} paddingTop={10} fontSize='3xl'>EV Charger Location</Text>

                        <Stack align={'center'}>
                            <Input placeholder='keySearch' type='text' w={300} id='keySearch' name='keySearch' onChange={(e) => { setkeysearch(prevState => ({...prevState,keySearch:e.target.value}));}}  />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='chargerName' type='text' w={300} id='chargerName' name='chargerName' onChange={(e) => {
                                setkeysearch(prevState => ({...prevState,chargerName:e.target.value}));}} />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='csPath' type='text' w={300} id='csPath' name='csPath' onChange={(e) => { setkeysearch(prevState => ({...prevState,csPath:e.target.value}));}}  />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='location' type='text' w={300} id='location' name='location' onChange={(e) => { setkeysearch(prevState => ({...prevState,location:e.target.value}));}}  />
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='deviceType' type='text' w={300} id='deviceType' name='deviceType' onChange={(e) => { setkeysearch(prevState => ({...prevState,deviceType:e.target.value}));}}/>
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='online' type='text' w={300} id='online' name='online' onChange={(e) => { setkeysearch(prevState => ({...prevState,online:e.target.value}));}}/>
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='deviceId' type='text' w={300} id='deviceId' name='deviceId' onChange={(e) => { setkeysearch(prevState => ({...prevState,deviceId:e.target.value}));}}/>
                        </Stack>
                        <Stack align={'center'}>
                            <Input placeholder='ownerAddress' type='text' w={300} id='ownerAddress' name='ownerAddress' onChange={(e) => { setkeysearch(prevState => ({...prevState,ownerAddress:e.target.value}));}}/>
                        </Stack>

                        <Stack align={'center'} marginTop={50} >
                            <Button colorScheme='yellow' onClick={() => {
                                router.push(url)
                            }
                            }>Search</Button>
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

                                <LISTALL></LISTALL>

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
    return (
        null
    )
}