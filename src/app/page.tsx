'use client'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Image,
  Container,
  Select,
  SimpleGrid,
  DarkMode
} from '@chakra-ui/react';

import { Children, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useSession, signIn, signOut } from 'next-auth/react';
import './styles/home.css'

function myFunction() {
  location.replace("/Search")
}
import data from "../../data/raw.githubusercontent.com_kongvut_thai-province-data_master_api_province_with_amphure_tambon.json"
export default function SignupCard() {
  const { data: session } = useSession()
  const [province_isSelect, province_setSelect] = useState(true);
  const [amphur_isSelect, amphur_setSelect] = useState(true);
  const [tambon_isSelect, tambon_setSelect] = useState(true);
  const [selected_province, setSelected_province] = useState('');
  const [selected_amphur, setSelected_amphur] = useState('');
  const bgColor = useColorModeValue('white', 'gray.800')
  const Page1 = () => {
    return (
      <>
        <Box>
          <form action="/api/addCharger" method="post">
            <Flex
              marginTop={10}
              align={'center'}
              justify={'center'}
              position={'sticky'}
            >
              <Box
                bgColor={bgColor} padding={10} rounded={'xl'}>
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
                  <FormLabel>Owener Address</FormLabel>
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
        </Box>
      </>
    )

  }
  if (!session) {
    return (
      <Flex
        id='bgImage'
        w={'full'}
        h={'100vh'}
        backgroundImage="url(https://www.innomatter.com/wp-content/uploads/2023/04/EVHomeChargerCover-1024x651.jpg)"
        backgroundSize={'cover'}
        backgroundAttachment={'scroll'}
      >
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          marginTop={'65px'}
        >
          <Box id='content' bgGradient='linear(to-t, rgba(70,13,92,0.5),rgba(255,255,255,0.1))' rounded={'xl'} padding={10} >
            <Heading>ลงทะเบียน HomeCharger</Heading>
          </Box>
          <Page1 />
        </Container>
      </Flex>
    );
  }
  return (
    myFunction()
  )
}