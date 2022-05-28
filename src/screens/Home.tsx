import React from "react";
import { Box, Center, Heading,VStack, useColorModeValue, Text, Container, HStack, Icon} from "native-base";

import * as Animatable from "react-native-animatable";


import { PrivateTabScreenProps, RootTabScreenProps } from "../typings/RootParamList";
import { MotiView, AnimatePresence } from 'moti';



type Props = PrivateTabScreenProps<'Home'>
const Home:React.FC<Props> = () => {
    return(
        <Center w="100%" h="100%"  _dark={{bg: 'blueGray.900'}} _light={{bg: 'primary.50'}} > 
            <VStack space={5} w="100%" alignItems="center">
                <AnimatePresence>
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', loop: true, }}
                        exit={
                            {opacity: 0}
                        }
            
                    
                        >
                        <Box p={10} bg={useColorModeValue('red.500','yellow.500')} >
                            <Heading size="2xl">Oversigt</Heading>
                        </Box>
                    </MotiView>
                    </AnimatePresence>
                <Box mt={10}>
                    <Animatable.View animation="wobble" duration={1500} iterationCount="infinite" style={{position:'absolute',bottom: 10, right: -20, width: 50, height:50, backgroundColor: "#0088ff", marginBottom:15}}  />
                    <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>❤️</Animatable.Text>
                </Box>
            
            </VStack>
        </Center>
    )
}



export default Home;