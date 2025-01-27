import { Box, Button, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { formatNumber } from '../../utils/formatNumber'


const BalanceComponent = () => {
  const [visible, setVisible] = useState(false)
  const balance = useSelector((state) => state.auth.balance)
  return (
    <Stack p={5} rounded="xl" w={'55%'} h={'17vh'} color="white" bgImage={'balance-bg.png'} bgSize={'cover'} gap={5}>
      <Text fontSize="sm">Saldo anda</Text>
      {
        !visible ?
          <Text fontSize="2xl" fontWeight="bold">Rp •••••••</Text> :
          <Text fontSize="2xl" fontWeight="bold">Rp {formatNumber(balance)}</Text>
      }
      
      <Text
        variant="link"
        fontSize="sm"
        color="white"
        onClick={() => setVisible(!visible)}
        _hover={{
          cursor: 'pointer',
          color:'black.500'
        }}
      >
        {visible ? 'Tutup Saldo' : 'Lihat Saldo'}
      </Text>
    </Stack>
  )
}

export default BalanceComponent
