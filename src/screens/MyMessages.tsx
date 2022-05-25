import { Box, Center, Heading, Text, View,
VStack, useColorModeValue, Pressable
} from "native-base";
import React, { useRef } from "react";
import ThemeToggle from "../components/theme-toggle";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";

const MyMessages = () => {
    const [checked, setChecked] = React.useState(false);
    const handleView = useRef(null);

    useFocusEffect(
        React.useCallback(() => {
            handleView.current.animate({0: {rotate: '-45deg'}, 1: {rotate: '0deg'}});
    }, [])
    );

    return(
    <Animatable.View ref={handleView}  duration={100} style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Center w="100%" h="100%"
            _dark={{bg: 'blueGray.900'}}
            _light={{bg: 'yellow.500'}}
        > 
            <VStack space={5} w="100%" alignItems="center">
                <Box p={10} bg={useColorModeValue('red.500','yellow.500')} >
                    <Heading size="2xl">Beskeder</Heading>
                </Box>
                <ThemeToggle></ThemeToggle>
            </VStack>
        </Center>
    </Animatable.View>
    )
}
    
    
export default MyMessages;