import { Container, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import BalanceComponent from '../../components/card/BalanceComponent'
import TopUpComponent from '../../components/card/TopupComponent'
import UserComponent from '../../components/card/UserComponent'

const TopUpPage = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="flex-start" mb={12}>
        <UserComponent/>
        <BalanceComponent/>
      </Flex>
      <Stack>
        <TopUpComponent/>
      </Stack>
      
    </Container>
  )
}

export default TopUpPage
