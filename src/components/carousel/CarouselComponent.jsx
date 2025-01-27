import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const CarouselComponent = ({ banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Box position="relative" overflow="hidden" rounded="xl">
      <Flex
        transition="transform 0.5s"
        transform={`translateX(-${currentSlide * 30}%)`}
      >
        {banners?.map((banner, index) => (
          <Box key={index} minW="28%" p={2} color="white" mr={1} h={'15vh'}>
            <Image src={banner.banner_image} h={'full'} />
          </Box>
        ))}
      </Flex>

      <IconButton
       icon={<ChevronLeftIcon />}
       position="absolute"
       left={2}
       top="50%"
       transform="translateY(-50%)"
       onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % (banners.length / 2))}
       variant="ghost"
       color="white"
      />

      <IconButton
        icon={<ChevronRightIcon />}
        position="absolute" 
        right={2}
        top="50%"
        transform="translateY(-50%)"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % (banners.length / 2))}
        variant="ghost"
        color="white"
      />
    </Box>
  );
};

export default CarouselComponent