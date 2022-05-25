import React from "react";
import { Box, Center, Heading, VStack, useColorModeValue } from "native-base";


import { RootTabScreenProps } from "../typings/RootParamList";


type Props = RootTabScreenProps<'MyMessages'>
const MyMessages:React.FC<Props> = () => {
    return(
        <Center w="100%" h="100%" _dark={{bg: 'blueGray.900'}}  _light={{bg: 'primary.50'}}> 
            <VStack space={5} w="100%" alignItems="center">
                <Box p={10} bg={useColorModeValue('red.500','yellow.500')} >
                    <Heading size="2xl">Beskeder</Heading>
                </Box>
            </VStack>
        </Center>
    )
}
    
    
export default MyMessages;