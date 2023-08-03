import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import { WarningTwoIcon } from '@chakra-ui/icons'
import React from 'react'
const axios = require('axios')
function stoptran(Meterdata: any) {
    axios.post(`${process.env.NEXT_PUBLIC_API_OCCP_PRODUCTION_ADDRESS}/ocpp/api/RemoteStopTransaction`, {
        "chargerName": `${Meterdata?.data.chargerName}`,
        "transactionId": `${Meterdata?.data.transactionId}`
    })
}
function AlertDialogExample(Meterdata: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<any>()

    return (
        <>
            <Button colorScheme='red' onClick={onOpen} w={'90vw'}>
                Stop<WarningTwoIcon />
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Stop Transaction
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't Start this Transaction afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => {
                                onClose();
                                stoptran(Meterdata);
                            }} ml={3}>
                                Stop Transaction
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
export default AlertDialogExample