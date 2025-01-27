import { Box, Flex, HStack, Image, Link, Text } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location,'ini location')
  return (
    <Box as="nav" borderBottom="1px" borderColor="gray.200" bg="white" w={'full'}>
      <Flex 
        maxW="7xl" 
        mx="auto" 
        // px={4} 
        // py={3} 
        p={5}
        justify="space-between" 
        align="center"
      >
        <HStack onClick={() => navigate('/')}>
          <Image src={'Logo.png'}/>
          <Text fontSize="xl" fontWeight="bold">
            SIMS PPOB
          </Text>
        </HStack>

        <Flex gap={8}>
          <Link color="gray.700" _hover={{ color: "gray.900" }} color={location.pathname === '/topup' ? 'red' : 'black'} onClick={() => navigate('/topup')}>Top Up</Link>
          <Link color="gray.700" _hover={{ color: "gray.900" }} color={location.pathname === '/transaction' ? 'red' : 'black'} onClick={() => navigate('/transaction')}>Transaction</Link>
          <Link color="gray.700" _hover={{ color: "gray.900" }} color={location.pathname === '/account' ? 'red' : 'black'} onClick={() => navigate('/account')}>Akun</Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar