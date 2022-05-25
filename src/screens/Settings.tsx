import React, { useCallback, useEffect, useRef } from 'react';
import {
  HStack,
  VStack,
  Center,
  Avatar,
  Heading,
  IconButton,
  useColorModeValue,
  Box,
  Image
} from 'native-base';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import ThemeToggle from '../components/theme-toggle';
import { Feather } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable"

import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';


import { useAppDispatch } from '../hooks/reduxHook';
import { toggleTab } from '../store/slices/appSlice';
import AnimatedColorBox from '../components/animated-color-box';
import MenuButton from '../components/menu-button';




const Settings = (props:any) => {
  const dispatch = useAppDispatch();

  const { state, navigation } = props
  const currentRoute = 'settings'

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer()
  }, [navigation])
  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Main')
  }, [navigation])
  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate('About')
  }, [navigation])

  
  useFocusEffect(
    React.useCallback(() => {
      dispatch(toggleTab());
      return () => dispatch(toggleTab());
    },[])
  );
    return(

      <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.800', 'darkBlue.700')
            }}
          />
        </HStack>
        <Image w="full" h="150" source={require('../assets/masthead.png')}></Image>
        <Avatar
          source={require('../assets/profile-image.png')}
          size="xl"
          borderRadius={100}
          mb={6}
          borderColor="secondary.500"
          borderWidth={3}
        />
  
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
   
    )
}

export default Settings;