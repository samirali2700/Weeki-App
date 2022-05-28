import React from 'react'
import { Center, VStack, Box, Heading, useColorModeValue } from 'native-base'

import { PrivateTabScreenProps } from '../../../typings/RootParamList'


type Props = PrivateTabScreenProps<'Notification'>
const Notification:React.FC<Props> = () => {
  return (
    <Center w="100%" h="100%"  _dark={{bg: 'blueGray.900'}}  _light={{bg: 'primary.50'}}> 
        <VStack space={5} w="100%" alignItems="center">
            <Box p={10} bg={useColorModeValue('red.500','yellow.500')} >
                <Heading size="2xl">Notifikationer</Heading>
            </Box>
        </VStack>
    </Center>
  )
}
export default Notification