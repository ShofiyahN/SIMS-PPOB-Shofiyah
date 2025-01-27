import { Button, Card, Container, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import BalanceComponent from '../../components/card/BalanceComponent'
import UserComponent from '../../components/card/UserComponent'
import apiClient from '../../services/Api'
import { formatDate } from '../../utils/formatDate'
import { formatNumber } from '../../utils/formatNumber'

const TransactionHistory = () => {
  const [dataTransaction, setDataTransaction] = useState([])
  const [loadMore, setLoadMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const limit = 5

  const getTransaction = async () => {
    try {
      const result = await apiClient.get(`/transaction/history?offset=${offset}&limit=${limit}`)
      if (result) {
        setDataTransaction([...dataTransaction, ...result.data.data.records])
        if (result?.data?.data?.records?.length < 5) {
          setLoadMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getTransaction()
    return () => {
      setDataTransaction([])
    }
  }, [offset])

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="flex-start" mb={12}>
        <UserComponent/>
        <BalanceComponent/>
      </Flex>
      <Text fontSize="xl" fontWeight="bold" py={5} >
        Semua Transaksi
      </Text>
      {dataTransaction?.length > 0 && dataTransaction.map((x, index) => (
        <Stack border={'1px'} borderColor={'gray.200'} borderRadius={'lg'} key={index} my={4}>
            <HStack p={3} mx={4} justify={'space-between'}>
              <Stack>
              <Text fontWeight={'bold'} fontSize={'xl'} color={x.transaction_type === 'PAYMENT' ? 'red.500' : 'green.500'}>{x.transaction_type === 'PAYMENT' ? '- ' : '+ '} Rp. {formatNumber(x.total_amount)}</Text>
                <Text fontSize={'xs'} color={'gray.400'}>{formatDate(x.created_on)}</Text>
              </Stack>
            <Text fontSize={'xs'} color={'gray.500'} alignSelf={'start'}>{x.description}</Text>
            </HStack>
        </Stack>
      ))}

      {dataTransaction?.length === 0 && 
        <Stack alignItems={'center'}>
          <Text fontSize={'xs'} color={'gray.400'}>Maaf tidak ada transaksi saat ini</Text>
        </Stack>
      }
      {loadMore &&
        <Stack align={'center'} p={3}>
          <Button color={'red'} colorScheme={'white'} w={'fit-content'} onClick={() => setOffset(offset + 1)}>Show More</Button>
        </Stack>
      }
      
    </Container>
  )
}

export default TransactionHistory
