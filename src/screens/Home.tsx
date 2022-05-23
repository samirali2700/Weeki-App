import { Box, Center, Heading, Text, View,
VStack, useColorModeValue, Pressable
} from "native-base";
import React from "react";
import ThemeToggle from "../components/theme-toggle";

import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import * as Animatable from "react-native-animatable";
const Home = () => {
    const [checked, setChecked] = React.useState(false);

    return(
    <Center flex={1}  px={4}
        _dark={{bg: 'yellow.500'}}
        _light={{bg: 'red.500'}}
    > 
        <VStack space={5} w="100%" alignItems="center">
            <Box p={10} bg={useColorModeValue('red.500','yellow.500')} >
                <Heading size="2xl">Home</Heading>
            </Box>
            <ThemeToggle></ThemeToggle>
           <Box mt={10}>
           <Animatable.View animation="wobble" duration={1500} iterationCount="infinite" style={{position:'absolute',bottom: 10, right: -20, width: 50, height:50, backgroundColor: "#0088ff", marginBottom:15}}  />
          <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>❤️</Animatable.Text>
           </Box>
            
        </VStack>
    </Center>
    )
}


export default Home;

/**
 *  animation type 
bounce
flash
jello
pulse
rotate
rubberBand
shake
swing
tada
wobble
 */