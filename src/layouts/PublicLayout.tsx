import React from "react";
import {Box, Center, Divider, HStack, Text}  from "native-base";

import { createStackNavigator } from "@react-navigation/stack";
import { PublicStackParamList, RootStackScreenProps } from "../typings/RootParamList";

import Login from "../screens/public/Login";
import Signup from "../screens/public/Signup";

const Stack = createStackNavigator<PublicStackParamList>();
    
type Props = RootStackScreenProps<'PublicLayout'>
const PublicLayout:React.FC<Props> = () =>  {
    return(
        <Box flex={1} >
            <Center w="100%"  h="175" safeAreaTop>
                <HStack alignItems={'center'}>
                    <Text fontSize={126} style={{fontFamily: 'Gluten_600SemiBold',}} color={'theme.100'}>W</Text>
                    <Text mt={10} ml={-1} fontSize={76} style={{fontFamily: 'Gluten_600SemiBold',}} color={'black'}>eeki</Text>
                </HStack>
                <Divider w={'90%'}/>
            </Center>
            <PublicStack/>
       </Box>
    )
}

const PublicStack = () => {
    return(
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}} >
            <Stack.Screen name="Login"  component={Login}/>
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    )
}

export default PublicLayout;