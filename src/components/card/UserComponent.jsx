import { Avatar, Box, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const UserComponent = () => {
  const user = useSelector((state) => state.auth.user) ?? {
    image: '/profile-default.png',
    first_name: '',
    last_name: ''
  }
  return (
    <VStack spacing={4} align={'right'}>
      <Avatar size="lg" src={user.image === 'https://minio.nutech-integrasi.com/take-home-test/null' 
      ? '/profile-default.png' 
      : user.image} />
      <Box>
        <Text color="gray.500">Selamat datang,</Text>
        <Text fontSize="2xl" fontWeight="semibold">{user?.first_name}{' '}{user?.last_name}</Text>
      </Box>
    </VStack>
  )
}

export default UserComponent
