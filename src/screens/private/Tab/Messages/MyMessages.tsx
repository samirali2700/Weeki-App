import React, { useEffect } from "react";
import { Box,  VStack, useColorModeValue,  useToken } from "native-base";


import { PrivateTabScreenProps, MessageParamList} from "../../../../typings/RootParamList";
import {  Text} from "native-base"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Detail from "./Detail";
import Chats from "./ChatsOverview";

 import { useQueryClient } from "react-query";
const Tab = createBottomTabNavigator<MessageParamList>();

type Props = PrivateTabScreenProps<'MyMessages'>
const MyMessages = ({navigation}: Props) => {
    const queryClient = useQueryClient()
    //queryClient.invalidateQueries('members')

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         queryClient.invalidateQueries('chats');
    //     }, 5000)

    //     navigation.addListener('blur', (e) => {
    //         queryClient.invalidateQueries('chats');

    //         //clear Interval?
    //         clearInterval(interval);
    //     })
    // }, [navigation])


    const bg = useToken('colors',useColorModeValue('primary.50', 'dark.3'))

    return (
        <>
        <VStack h='90px' _dark={{bg: 'dark.2'}} _light={{bg: 'theme.100'}} alignItems='center' justifyContent='center'>
            <Text color={'white'} fontSize={'4xl'} style={{fontFamily: 'Gluten_400Regular'}}>Beskeder</Text>
         </VStack>
        <Box flex={1}  _light={{bg: 'primary.50'}} _dark={{bg: 'dark.3'}} >
              
            <Tab.Navigator initialRouteName="Chats"    screenOptions={{tabBarStyle: {display: 'none'}, unmountOnBlur: true}} >
                <Tab.Screen name='Chats' component={Chats} options={{headerShown: false}} /> 
                <Tab.Screen   name='Detail' component={Detail} options={{headerShown: true, headerStyle: { backgroundColor: bg, borderBottomWidth: 1 }}} initialParams={{id: undefined}} /> 
            </Tab.Navigator>
        </Box>
    </>
    )
}



export default MyMessages;