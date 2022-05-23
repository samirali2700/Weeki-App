import { Box, Center, Heading, Text, View,
VStack, useColorModeValue, Pressable
} from "native-base";
import React from "react";
import ThemeToggle from "../components/theme-toggle";


const MyMessages = () => {
    const [checked, setChecked] = React.useState(false);
    return(
    <Center flex={1}  px={4}
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
    )
}
    
    
export default MyMessages;