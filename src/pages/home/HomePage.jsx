import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Text,
  VStack,
  Flex,
  Heading,
  Image
} from '@chakra-ui/react'
import apiClient from '../../services/Api';
import UserComponent from '../../components/card/UserComponent';
import BalanceComponent from '../../components/card/BalanceComponent';
import CarouselComponent from '../../components/carousel/CarouselComponent';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setServices } from '../../features/serviceSlice';

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [service, setService] = useState([])
  const [banner, setBanner] = useState([])
  
  const getFeatures = async () => {
    try {
      const services = await apiClient.get('/services')
      const baner = await apiClient.get('/banner')
      if (services && baner) {
        setBanner(baner.data.data)
        setService(services.data.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getFeatures()
  }, [])

  const handleTransaction = (data) => {
    dispatch(setServices({
      ...data
    }))
    navigate(`/transaction/${data?.service_code}`)

  }

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="flex-start" mb={13}>
        <UserComponent />
        <BalanceComponent />
      </Flex>

      <Grid templateColumns="repeat(12, 1fr)" gap={8} my={12}>
        {service.map((x, index) => (
          <VStack key={index}>
            <Image
              src={x.service_icon}
              rounded={'lg'}
              _hover={{
                shadow: 'lg',
                cursor: 'pointer'
              }}
              onClick={() => handleTransaction(x)}
            />
            <Text fontSize="xs" align={'center'}>{x.service_name}</Text>
          </VStack>
        ))}
      </Grid>

      <Box mb={8}>
       <Heading size="md" mb={6}>Temukan promo menarik</Heading>
       
        <CarouselComponent banners={banner}/>
     </Box>
    </Container>
  );
};

export default HomePage;