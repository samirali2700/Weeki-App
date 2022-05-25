import { Box, Center, Heading, Text, View,
VStack, useColorModeValue, Pressable
} from "native-base";
import React, { useEffect, useRef } from "react";
import ThemeToggle from "../components/theme-toggle";

import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";
const Home = () => {
    const viewRef = useRef(null);

    useFocusEffect(
        React.useCallback(() => {
            viewRef.current.slideInDown(500);
    }, [])
    );

   

    return(
    <Animatable.View ref={viewRef} style={{flex:1}}>
        <Center flex={1}  px={4}
            _dark={{bg: 'yellow.500'}}
            _light={{bg: 'primary.50'}}
        > 
            <VStack space={5} w="100%" alignItems="center">
                <Box p={10}>
                    <Heading size="2xl">Home</Heading>
                </Box>
                <ThemeToggle></ThemeToggle>
            <Box mt={10}>
            <Animatable.View animation="wobble" duration={1500} iterationCount="infinite" style={{position:'absolute',bottom: 10, right: -20, width: 50, height:50, backgroundColor: "#0088ff", marginBottom:15}}  />
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>❤️</Animatable.Text>
            </Box>
                
            </VStack>
        </Center>
    </Animatable.View>
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