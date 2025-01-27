import { Button, Container, Flex, HStack, Image, Input, InputGroup, InputLeftElement, Modal, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdMoney } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import BalanceComponent from '../../components/card/BalanceComponent'
import UserComponent from '../../components/card/UserComponent'
import AlertDialogComponent from '../../components/dialog/DialogComponent'
import { clearService } from '../../features/serviceSlice'
import apiClient from '../../services/Api'
import { formatNumber } from '../../utils/formatNumber'

const TransactionPage = () => {
  const route = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dataServices = useSelector((state) => state.services)

  const [alert, setAlert] = useState(false)
  const [status, setStatus] = useState(null)
  
  const handlePay = async () => {
    try {
      const result = await apiClient.post('/transaction', {
        service_code : route.slug
      })
      if (result) {
        setAlert(false)
        setStatus({...result.data})
      }
    } catch (error) {
      setAlert(false)
      setStatus({...error})
    }
  }

  const handleAlert = async () => {
    setAlert(true)
  }


  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="flex-start" mb={12}>
        <UserComponent/>
        <BalanceComponent/>
      </Flex>
      <Stack mb={12}>
        <Text>Pembayaran</Text>
        <HStack>
          <Image w={'50px'} src={dataServices?.service_icon}/>
          <Text fontSize={'lg'} fontWeight={'semibold'}>{dataServices?.service_name}</Text>
        </HStack>
      </Stack>
      <Stack width="100%">
        <VStack w={'full'}>
          <InputGroup>
              <InputLeftElement>
                <MdMoney size={20} color="gray" />
              </InputLeftElement>
              <Input
                value={formatNumber(dataServices?.service_tariff)}
                placeholder='masukan email anda'
                type='text'
              />
            </InputGroup>
          
          <Button
            width="100%"
            size="lg"
            colorScheme={'red'}
            onClick={handleAlert}
          >
            Bayar
          </Button>
        </VStack>
      </Stack>

      <AlertDialogComponent
        isOpen={alert}
        onClose={() => setAlert(false)}
        desc={`Beli ${dataServices?.service_name} senilai`}
        value={`Rp. ${formatNumber(dataServices?.service_tariff)} ?`}
        color={'red'}
        buttonText={'Ya, Lanjutkan Bayar'}
        actionButton={true}
        cancelButton={'Batalkan'}
        image={'Logo.png'}
        onAction={handlePay}
      />

      {status?.message &&
        <AlertDialogComponent
          isOpen={status}
          onClose={() => {
            setStatus(null)
            dispatch(clearService())
            navigate('/')
          }}
          desc={`Pembayaran ${dataServices?.service_name} sebesar`}
          value={formatNumber(dataServices?.service_tariff)}
          color={'red'}
          cancelButton={'Kembali ke Beranda'}
          image={'Logo.png'}
          feedback={status?.data ? 'Berhasil' : 'Gagal'}
        />
      }
    </Container>
  )
}

export default TransactionPage
