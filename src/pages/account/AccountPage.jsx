import React, { useState, useRef } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  Avatar,
  Text,
  IconButton,
  useToast,
  Container
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../../services/Api'
import { logout, updateUser } from '../../features/authSlice';

const AccountPage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const fileInputRef = useRef(null);
  const toast = useToast();

  const [userData, setUserData] = useState({
    ...user,
    image: user.image === 'https://minio.nutech-integrasi.com/take-home-test/null' 
      ? '/profile-default.png' 
      : user.image
  });
  const [loading, setLoading] = useState(false)
  const [loadingV2, setLoadingV2] = useState(false)
  const [status, setStatus] = useState()

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserData(prev => ({
            ...prev,
            image: reader.result
          }));
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('file', file);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const response = await apiClient.put('/profile/image', formData, config);

        if (response) {
          console.log(response)
          setUserData(prev => ({
            ...prev,
            image: response.data.data.profile_image
          }));
          dispatch(updateUser({
            user_image: response.data.data.profile_image
          }))
        }

        toast({
          title: 'Profile picture updated successfully',
          status: 'success',
          duration: 2000,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        
        setUserData(prev => ({
          ...prev,
          image: user.image
        }));

        toast({
          title: 'Failed to upload image',
          description: error.message || 'Something went wrong',
          status: 'error',
          duration: 2000,
        });
      }
    }
  };

  const handleInputChange = (e, field) => {
    setUserData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    
    const requestBody = {
      first_name: userData?.first_name,
      last_name: userData?.last_name
    };
    
    try {
      const response = await apiClient.put('/profile/update', requestBody);
      if (response) {
        console.log(response)
        dispatch(updateUser({
            user_email: response.data?.data?.email,
            user_first_name: response.data?.data?.first_name,
            user_last_name: response.data?.data?.last_name,
          }))
      }
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        status: 'error',
        duration: 2000,
      });
    } finally {
      setLoading(false)
    }
  };

  const handleLogout = async () => {
    setLoadingV2(true)
    try {
      dispatch(logout())
      localStorage.removeItem('sims-token')
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoadingV2(true)
    }
  }

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={6} as="form" onSubmit={handleSubmit}>
        <Box position="relative">
          <Avatar
            size="2xl"
            src={userData.image}
            cursor="pointer"
            onClick={handleImageClick}
          />
          <IconButton
            icon={<EditIcon />}
            size="sm"
            rounded="full"
            position="absolute"
            bottom={0}
            right={0}
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </Box>

        <Text fontSize="2xl" fontWeight="bold">
          {user?.first_name} {user?.last_name}
        </Text>

        <VStack spacing={6} w="100%">
          <Box w="100%">
            <Text mb={4}>Email</Text>
            <Input
              value={userData.email}
              onChange={(e) => handleInputChange(e, 'email')}
              placeholder="Email"
              isDisabled
            />
          </Box>

          <Box w="100%">
            <Text mb={4}>Nama Depan</Text>
            <Input
              value={userData.first_name}
              onChange={(e) => handleInputChange(e, 'first_name')}
              placeholder="Nama Depan"
            />
          </Box>

          <Box w="100%">
            <Text mb={4}>Nama Belakang</Text>
            <Input
              value={userData.last_name}
              onChange={(e) => handleInputChange(e, 'last_name')}
              placeholder="Nama Belakang"
            />
          </Box>

          <Button
            variant="outline"
            colorScheme="red"
            w="100%"
            type="submit"
            isLoading={loading}
          >
            Edit Profile
          </Button>

          <Button
            colorScheme="red"
            w="100%"
            onClick={handleLogout}
            isLoading={loadingV2}
          >
            Logout
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default AccountPage;