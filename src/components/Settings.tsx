import React, { useCallback } from 'react';
import {
  HStack,
  VStack,
  Center,
  Avatar,
  Heading,
  IconButton,
  useColorModeValue,
  Box
} from 'native-base';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import ThemeToggle from './theme-toggle';
import { Feather } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable"

const Sidebar = () => {

    return(
      <Animatable.View style={{flex:1, padding:7, }} animation="fade">
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton onPress={() => console.log('back')}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.800', 'darBlue.700')
            }}
          />
        </HStack>
        <Heading mb={4} size="xl"> Ali Chouikhi</Heading>

      </VStack>
      </Animatable.View>
    )
}

export default Sidebar;