// app/layout.tsx
'use client'
import { Providers } from "./providers";
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
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box>
            <Flex
              bg={useColorModeValue('white', 'gray.800')}
              color={useColorModeValue('gray.600', 'white')}
              minH={'60px'}
              py={{ base: 2 }}
              px={{ base: 4 }}
              borderBottom={1}
              borderStyle={'solid'}
              borderColor={useColorModeValue('gray.200', 'gray.900')}
              align={'center'}>
              <Flex
                flex={{ base: 1, md: 'auto' }}
                ml={{ base: -2 }}
                display={{ base: 'flex', md: 'none' }}>
                <IconButton
                  onClick={onToggle}
                  icon={
                    isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                  }
                  variant={'ghost'}
                  aria-label={'Toggle Navigation'}
                />
              </Flex>
              <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                <Text
                  textAlign={({ base: 'center', md: 'left' })}
                  fontFamily={'heading'}
                  color={useColorModeValue('gray.800', 'white')}>
                  <Link href='\'>
                    <Img height="60px" src="/pea.png" />
                  </Link>
                </Text>

                <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                </Flex>
              </Flex>

              <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                <Button
                  as={'a'}
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  href={'#'}
                  _hover={{
                    bg: 'pink.300',
                  }}>
                  Log in
                </Button>
              </Stack>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
            </Collapse>
          </Box>
          {children}
        </Providers>
      </body>
    </html>
  );
}