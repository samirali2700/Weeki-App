import React from "react";
import { Box, Center, Heading, Text, View,
VStack, useColorModeValue, Pressable
} from "native-base";

import ThemeToggle from "../components/theme-toggle";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from "../components/Settings";

const Drawer = createDrawerNavigator();

const MyAccountScreen = () => {
    const [checked, setChecked] = React.useState(false);
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

export default function MyAccount() {
    return(
        <Drawer.Navigator initialRouteName="Settings" screenOptions={{
                headerShown: false,

        }}>
            <Drawer.Screen name="MyAccountScreen" component={MyAccountScreen}></Drawer.Screen>
            <Drawer.Screen name="Settings" component={Settings}></Drawer.Screen>
        </Drawer.Navigator>
    )
}
    
    
