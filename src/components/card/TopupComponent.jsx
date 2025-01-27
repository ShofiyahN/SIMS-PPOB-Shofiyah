import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  Flex,
  HStack,
  InputGroup,
  InputLeftElement,
  Stack
} from '@chakra-ui/react';
import { formatNumber } from '../../utils/formatNumber';
import { MdMoney } from 'react-icons/md';
import apiClient from '../../services/Api';
import AlertDialogComponent from '../dialog/DialogComponent';
import { useNavigate } from 'react-router';

const TopUpComponent = () => {
  const navigate = useNavigate()
  const amounts = [10000, 20000, 50000, 100000, 250000, 500000];
  
  const [amount, setAmount] = useState(null);
  const [alert, setAlert] = useState(false)
  const [status, setStatus] = useState(null)
  
  const handleAmountClick = (value) => {
    setAmount(Number(value));
  };

  const handleTopup = async () => {
    try {
      const result = await apiClient.post('/topup', {
        top_up_amount: amount
      })
      if (result) {
        console.log(result)
        setAlert(false)
        setStatus({...result.data})
      }
    } catch (error) {
      setAlert(false)
      console.log(error)
      setStatus({...error})
    }
  }

  return (
    <Box w={'full'} mx="auto" >
      <Stack py={10}>
        <Text fontSize="md" color={'gray.500'} >
          Silahkan Masukkan
        </Text>
        <Text fontSize="3xl" fontWeight="bold" >
          Nominal Top Up
        </Text>
      </Stack>
      
      
      <HStack bg width="100%" spacing={4}>
        <VStack w={'70%'} spacing={4}>
          <InputGroup>
              <InputLeftElement>
                <MdMoney size={25} color="gray" />
              </InputLeftElement>
              <Input
                placeholder="masukan nominal Top Up"
                onChange={(e) => setAmount(e.target.value)}
                size="lg"
                value={amount}
                // type={'number'}
              />
            </InputGroup>
          
          <Button
            width="100%"
            size="lg"
            onClick={() => setAlert(true)}
            colorScheme={'red'}
            disabled={!amount}
          >
            Top Up
          </Button>
        </VStack>
        
        
        <SimpleGrid columns={[2, 3]} spacing={4} width='30%'>
          {amounts.map((value) => (
            <Button
              key={value}
              onClick={() => handleAmountClick(value)}
              variant="outline"
              size="lg"
              fontSize={'sm'}
              fontWeight={'normal'}
            >
              Rp{value.toLocaleString()}
            </Button>
          ))}
        </SimpleGrid>
      </HStack>

      <AlertDialogComponent
        isOpen={alert}
        onClose={() => setAlert(false)}
        desc={`Anda yakin untuk Top Up sebesar`}
        value={`Rp. ${formatNumber(amount)} ?`}
        color={'red'}
        buttonText={'Ya, Lanjutkan Top Up'}
        actionButton={true}
        cancelButton={'Batalkan'}
        image={'Logo.png'}
        onAction={handleTopup}
      />

      {status?.message &&
        <AlertDialogComponent
          isOpen={status}
          onClose={() => {
            setStatus(null)
            navigate('/')
          }}
          desc={`Top Up sebesar`}
          value={formatNumber(amount)}
          color={'red'}
          cancelButton={'Kembali ke Beranda'}
          image={'Logo.png'}
          feedback={status?.data ? 'Berhasil' : 'Gagal'}
        />
      }
    </Box>
  );
};

export default TopUpComponent;