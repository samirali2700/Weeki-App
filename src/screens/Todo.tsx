import { Box, Center, Heading, Text, View,
VStack, useColorModeValue, Pressable, HStack
} from "native-base";
import React from "react";
import ThemeToggle from "../components/theme-toggle";
import AnimatedCheckbox from 'react-native-checkbox-reanimated';

const Todo = () => {
    const [checked, setChecked] = React.useState(false);
    return(
    <Center flex={1}  px={4}
        _dark={{bg: 'blueGray.900'}}
        _light={{bg: 'purple.500'}}
    > 
        <VStack space={5} w="100%" alignItems="center">
            <Box p={10} bg={useColorModeValue('red.500','yellow.500')} >
                <Heading size="2xl">TO DO</Heading>
            </Box>
            <ThemeToggle></ThemeToggle>
            <HStack space={5}>
                <Box w={28} h={28}>
                    <Pressable onPress={() => setChecked(!checked)}>
                        <AnimatedCheckbox
                            checked={checked}
                            highlightColor="#4444ff"
                            checkmarkColor="#ffffff"
                            boxOutlineColor="#4444ff"
                            />
                    </Pressable>
                </Box>
                <Box w={28} h={28}>
                    <Pressable onPress={() => setChecked(!checked)}>
                        <AnimatedCheckbox
                            checked={checked}
                            highlightColor="#4444ff"
                            checkmarkColor="#ffffff"
                            boxOutlineColor="#4444ff"
                            />
                    </Pressable>
                </Box>
            </HStack>
        </VStack>
    </Center>
    )
}
    
    
export default Todo;