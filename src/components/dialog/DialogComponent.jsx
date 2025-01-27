/* eslint-disable react/prop-types */
import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  Stack,
  Image,
  VStack,
} from '@chakra-ui/react';


const AlertDialogComponent = ({ isLoading, desc, isOpen, onClose, onAction, value, color, buttonText, disabled, actionButton, cancelButton, image, feedback }) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} size={'xs'}>
      <AlertDialogOverlay>
        <AlertDialogContent alignItems={'center'} alignSelf={'center'}>

          <AlertDialogBody>
            <Stack alignItems={'center'} p={5}>
              <Image
                w={'50px'}
                src={'/Logo.png'}
              />
            </Stack>
            <Text textAlign={'center'} color={'gray.500'}>{desc}</Text>
            <Text textAlign={'center'} fontSize={'xl'} fontWeight={'bold'}>{value}</Text>
            {feedback &&  <Text textAlign={'center'} color={'gray.500'}>{feedback}</Text>}
            <VStack p={3}>
              {actionButton &&
                <Button
                  isDisabled={disabled ? disabled : false}
                  isLoading={isLoading}
                  colorScheme={'white'}
                  color={color}
                onClick={() => {
                  onAction()

                }}
                  w={'fit-content'}
                >
                  {buttonText || 'Save'}
                </Button>
              }
                <Button
                  onClick={onClose}
                  color={!actionButton ? 'red' : 'gray.300'}
                  colorScheme={'black'}
                  w={'fit-content'}
                  alignSelf={'center'}
                >
                  {cancelButton}
                </Button>
            </VStack>
            
          </AlertDialogBody>

        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogComponent;