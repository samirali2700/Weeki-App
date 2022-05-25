import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import { Center, VStack, Box, Heading, useColorModeValue } from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import { useFocusEffect } from '@react-navigation/native'
import * as Animatable from "react-native-animatable";
const MyAccount = () => {
   


    return(
       
            <Center flex={1}  px={4}
                _dark={{bg: 'blueGray.900'}}
                _light={{bg: 'green.500'}}
            > 
                <VStack space={5} w="100%" alignItems="center">
                    <Box p={10} bg={useColorModeValue('red.500','yellow.500')} >
                        <Heading size="2xl">Min Konto</Heading>
                    </Box>
                    <ThemeToggle></ThemeToggle>
                </VStack>
            </Center>

        )
}

export default MyAccount;