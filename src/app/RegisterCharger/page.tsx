'use client'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Flex,
    useColorModeValue,
    Stack,
    Button,
    Select,
} from '@chakra-ui/react'
import data from "../../../data/raw.githubusercontent.com_kongvut_thai-province-data_master_api_province_with_amphure_tambon.json"
import { useState } from 'react';

export default function AddPost() {
    const [province_isSelect, province_setSelect] = useState(true);
    const [amphur_isSelect, amphur_setSelect] = useState(true);
    const [tambon_isSelect, tambon_setSelect] = useState(true);
    const [selected_province, setSelected_province] = useState('');
    const [selected_amphur, setSelected_amphur] = useState('');

    return (
        <form action="/api/addCharger" method="post">
            <Flex
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                position={'sticky'}>
                <Box
                    bgColor={'white'} padding={10} rounded={'xl'}>
                    <Stack direction={['column', 'row']} spacing='24px'>
                        <FormControl isRequired>
                            <FormLabel>ชื่อ</FormLabel>
                            <Input type="text" id="Fname" name="Fname" required placeholder='First name' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>นามสกุล</FormLabel>
                            <Input type="text" id="Lname" name="Lname" required placeholder='Last name' />
                        </FormControl>
                    </Stack>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' id="Email" name="Email" required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>รายละเอียดที่อยู่</FormLabel>
                        <Input placeholder='ที่อยุ่' id='Location_detail' name='Location_detail' />
                    </FormControl>
                    <Stack direction={['column', 'row']} spacing='24px'>
                        <FormControl>
                            <FormLabel>จังหวัด</FormLabel>
                            <Select placeholder='จังหวัด' id='Location_province' name='Location_province'
                                onChange={(event) => {
                                    setSelected_province(event.target.value);
                                    province_setSelect(false);
                                }}>
                                {data.data.map(data => (
                                    <option>{data.name_th}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>อำเภอ</FormLabel>
                            <Select placeholder='อำเภอ' id='Location_amphure' name='Location_amphure' isDisabled={province_isSelect}
                                onChange={(event) => {
                                    setSelected_amphur(event.target.value);
                                    amphur_setSelect(false)
                                }}
                            >
                                {data.data.map((province) => {
                                    if (province.name_th == selected_province) {
                                        return province.amphure.map((amphure) => (
                                            <option>
                                                {amphure.name_th}
                                            </option>
                                        ));
                                    } else {
                                        return null;
                                        ;
                                    }
                                })}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction={['column', 'row']} spacing='24px'>
                        <FormControl>
                            <FormLabel>ตำบล</FormLabel>
                            <Select placeholder='ตำบล' id='Location_tambon' name='Location_tambon' isDisabled={amphur_isSelect}
                                onChange={() => tambon_setSelect(false)}>
                                {
                                    data.data.map((province) => {
                                        if (province.name_th == selected_province) {
                                            return province.amphure.map((amphure) =>
                                                amphure.tambon.map((tambon) => {
                                                    if (amphure.name_th == selected_amphur) {
                                                        return <option>
                                                            {tambon.name_th}
                                                        </option>
                                                    }
                                                })
                                            );
                                        }
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>รหัสไปรษณีย์</FormLabel>
                            <Select placeholder='รหัสไปรษณีย์' id='zip_code' name='zip_code' isDisabled={tambon_isSelect}>
                                {
                                    data.data.map((province) => {
                                        if (province.name_th == selected_province) {
                                            return province.amphure.map((amphure) =>
                                                amphure.tambon.map((tambon) => {
                                                    if (amphure.name_th == selected_amphur) {
                                                        return <option>
                                                            {tambon.zip_code}
                                                        </option>
                                                    }
                                                })
                                            );
                                        }
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                    <FormControl>
                        <FormLabel>CA NO.</FormLabel>
                        <Input type='text' id="CA" name="CA" required />
                    </FormControl>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                    >
                        Submit
                    </Button>
                </Box>
            </Flex>
        </form >
    );

}