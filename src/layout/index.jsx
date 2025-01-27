import React, { useState } from 'react'
import { Container, Flex, Stack } from '@chakra-ui/react';
import Navbar from '../components/navbar/NavbarComponent';

function Layout({ children }) {
 return (
   <Stack height="100vh" w={'full'} bgColor={'gray.50'}>
     <Container maxW={'full'} overflowY={'scroll'}>
       <Navbar />
       <Container minH={'95vh'} maxW={'full'} bgColor={'white'}>
         {children}
       </Container>
     </Container>
   </Stack>
 );
}

export default Layout;