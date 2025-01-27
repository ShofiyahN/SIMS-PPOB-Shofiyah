import { Button, HStack, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash, FaUser } from 'react-icons/fa'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router'
import apiClient from '../../services/Api'

const RegistrationPage = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibles, setIsVisibles] = useState(false)
  const [confirmedPass, setConfirmedPass] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordErrorV2, setPasswordErrorV2] = useState('')
  const [errorRegister, setErrorRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const [dataUser, setDataUser] = useState(
    {
      email: '',
      first_name: '',
      last_name: '',
      password: ''
    }
  )

  const validatePassword = (value) => {
    if(value.length < 8) {
      setPasswordError('Password harus minimal 8 karakter')
    } else {
      setPasswordError('')
    }
  }
  const validatePasswordV2 = (value) => {
    if(value !== dataUser.password) {
      setPasswordErrorV2('Password tidak sama')
    } else {
      setPasswordErrorV2('')
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    if (confirmedPass !== dataUser.password) {
      return setPasswordErrorV2('Password tidak sama')
    }
    if (dataUser.email === '' || dataUser.first_name === '' || dataUser.last_name === '' || dataUser.password === '') {
      return setErrorRegister(true)
    }
    try {
      const signup = await apiClient.post('/registration', dataUser)
      if (signup) {
        toast({
          title: signup.data.message,
          status: 'success',
          duration: 2000,
        });
        navigate('/')
      }
    } catch (error) {
      setErrorRegister(true)
      toast({
          title: error.message,
          status: 'warning',
          duration: 2000,
        });
    } finally {
      setLoading(false)
    }
  }
  
  return (
    
      <Stack h={'full'}>
        <HStack w={'full'} justify={'space-between'}>
        <Stack w={'50%'} align={'center'} gap={10}>

          <HStack w={'50%'} justify={'center'}>
            <Image src={'Logo.png'}/>
            <Text fontWeight={'semibold'} fontSize={'2xl'}>SIMS POMB</Text>
          </HStack>

          <Text fontWeight={'semibold'} fontSize={'3xl'} w={'45%'} textAlign={'center'}>
            Lengkapi data untuk membuat akun
          </Text>

          <VStack w={'50%'} gap={8}>
            <InputGroup>
              <InputLeftElement>
                <MdOutlineAlternateEmail size={20} color="gray" />
              </InputLeftElement>
              <Input
                placeholder='masukan email anda'
                type='text'
                onChange={(e) => setDataUser({...dataUser, email: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <FaUser size={20} color="gray" />
              </InputLeftElement>
              <Input
                placeholder='nama depan'
                type={'text'}
                onChange={(e) => setDataUser({...dataUser, first_name: e.target.value})}

              />
              
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <FaUser size={20} color="gray" />
              </InputLeftElement>
              <Input
                placeholder='nama belakang'
                type='text'
                onChange={(e) => setDataUser({...dataUser, last_name: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <RiLockPasswordLine size={20} color="gray" />
              </InputLeftElement>
              <Input
                placeholder='masukan password anda'
                type={isVisible ? 'text' : 'password'}
                onChange={(e) => {
                  validatePassword(e.target.value)
                  setDataUser({...dataUser, password: e.target.value})
                }}
                borderColor={passwordError ? 'red' : 'gray.200'}
              />
              <InputRightElement>
                {!isVisible ? <FaRegEye size={20} color="gray" onClick={() => setIsVisible(!isVisible)}/> : <FaRegEyeSlash size={20} color="gray" onClick={() => setIsVisible(!isVisible)}/> }
              </InputRightElement>
            </InputGroup>
              {passwordError && <Text alignSelf={'end'} my={-7} color="red.500" fontSize="sm">{passwordError}</Text>}
            <InputGroup>
              <InputLeftElement>
                <RiLockPasswordLine size={20} color="gray" />
              </InputLeftElement>
              <Input
                placeholder='konfirmasi password anda'
                type={isVisibles ? 'text' : 'password'}
                onChange={(e) => {
                  validatePasswordV2(e.target.value)
                  setConfirmedPass(e.target.value)
                }}
                borderColor={passwordErrorV2 ? 'red' : 'gray.200'}
              />
              <InputRightElement>
                {!isVisibles ? <FaRegEye size={20} color="gray" onClick={() => setIsVisibles(!isVisibles)}/> : <FaRegEyeSlash size={20} color="gray" onClick={() => setIsVisibles(!isVisibles)}/> }
              </InputRightElement>
            </InputGroup>
            {passwordErrorV2 && <Text alignSelf={'end'} my={-7} color="red.500" fontSize="sm">{passwordErrorV2}</Text>}
            <Button w={'full'} colorScheme={'red'} onClick={handleRegister} isLoading={loading}>
              Registrasi
            </Button>
            <Text>
              sudah punya akun? login <Link color={'red'} onClick={() => navigate('/login')}>di sini</Link>
            </Text>
          </VStack>
          {errorRegister &&
            <Stack w={'85%'} bgColor={'red.50'} borderRadius={'md'} my={-8}>
              <HStack justify={'space-between'}>
                <Text p={2} color={'red'} fontSize={'sm'}>Semua parameter harus diisi</Text>
                <Text p={2} color={'red'} fontSize={'sm'} onClick={() => setErrorRegister(false)}>x</Text>
              </HStack>
            </Stack>
          }
          
          </Stack>
        <Stack w={'50%'}>
            <Image
              src={'img_1.png'} h={'100vh'} w={'full'}
            />
        </Stack>
        
      </HStack>
      
       </Stack>
  )
}

export default RegistrationPage
