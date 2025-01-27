import { Button, HStack, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { imageUtils } from '../../utils/imageUtils'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router'
import apiClient from '../../services/Api'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login } from '../../features/authSlice';

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(false)
  const [errorLogin, setErrorLogin] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [dataUser, setDataUser] = useState(
    {
      email: '',
      password: ''
    }
  )

  console.log(isLoggedIn,'ccc')

  const handleLogin = async () => {
    // console.log('All env variables:', process.env);
    // console.log('NODE_ENV:', process.env.NODE_ENV);
    setLoading(true)
    console.log(process.env.REACT_APP_API_BASE_URL, 'env')
    try {
      const res = await apiClient.post('/login', dataUser)
      if (res) {
        localStorage.setItem('sims-token', res?.data?.data?.token)
        dispatch(login())
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      if (error.status === 103) {
        setErrorLogin(error.message)
        setDataUser({
          email: '',
          password: ''
        })
      } else {
        setErrorLogin(error.message)
      }
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
  if (isLoggedIn) {
    navigate('/')
  }
}, [isLoggedIn])
  
  return (
    
      <Stack>
        <HStack w={'full'} justify={'space-between'}>
        <Stack w={'50%'} align={'center'} gap={10}>

          <HStack w={'50%'} justify={'center'}>
            <Image src={'Logo.png'}/>
            <Text fontWeight={'semibold'} fontSize={'2xl'}>SIMS POMB</Text>
          </HStack>

          <Text fontWeight={'semibold'} fontSize={'3xl'} w={'45%'} textAlign={'center'}>
            Masuk atau buat akun untuk memulai
          </Text>

          <VStack w={'50%'} gap={10}>
            <InputGroup>
              <InputLeftElement>
                <MdOutlineAlternateEmail size={20} color="gray" />
              </InputLeftElement>
              <Input
                value={dataUser.email}
                placeholder='masukan email anda'
                type='text'
                onChange={(e) => setDataUser({ ...dataUser, email: e.target.value })}
                borderColor={errorLogin ? 'red' : 'gray.200'}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <RiLockPasswordLine size={20} color="gray" />
              </InputLeftElement>
              <Input
                value={dataUser.password}
                placeholder='masukan password anda'
                type={isVisible ? 'text' : 'password'}
                onChange={(e) => setDataUser({ ...dataUser, password: e.target.value })}
                borderColor={errorLogin ? 'red' : 'gray.200'}
              />
              <InputRightElement>
                {!isVisible ? <FaRegEye size={20} color="gray" onClick={() => setIsVisible(!isVisible)}/> : <FaRegEyeSlash size={20} color="gray" onClick={() => setIsVisible(!isVisible)}/> }
              </InputRightElement>
            </InputGroup>
            
            <Button
              w={'full'}
              colorScheme={'red'}
              onClick={handleLogin}
              isLoading={loading}
            >
              Masuk
            </Button>
            <Text>
              Belum punya akun? registrasi <Link color={'red'} onClick={() => navigate('/signup')} >di sini</Link>
            </Text>
          </VStack>

          {errorLogin &&
            <Stack w={'85%'} my={-10}>
              <HStack bgColor={'red.50'} borderRadius={'md'} justify={'space-between'} mt={10}>
              <Text p={2} color={'red'} fontSize={'sm'}>{errorLogin}</Text>
                <Text p={2} color={'red'} fontSize={'sm'} onClick={() => setErrorLogin('')}>x</Text>
              </HStack>
            </Stack>
          }
          
        </Stack>
        <Stack w={'50%'}>
            <Image
              src={'img_1.png'} h={'100vh'}
            />
        </Stack>
        </HStack>
        
       </Stack>
  )
}

export default LoginPage
