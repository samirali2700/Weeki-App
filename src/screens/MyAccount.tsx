import React from 'react'
import { Center, VStack, Box, Heading, useColorModeValue } from 'native-base';


import { StackDrawerScreenProps} from '../typings/RootParamList'


type Props = StackDrawerScreenProps<'MyAccount'>
const MyAccount:React.FC<Props> = () => {
    return(
       
            <Center flex={1}  px={4} _dark={{bg: 'blueGray.900'}}_light={{bg: 'primary.50'}}> 
                <VStack space={5} w="100%" alignItems="center">
                    <Box p={10} bg={useColorModeValue('red.500','yellow.500')} >
                        <Heading size="2xl">Min Konto</Heading>
                    </Box>
                </VStack>
            </Center>

        )
}

export default MyAccount;