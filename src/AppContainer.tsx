import React from 'react';
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from './hooks/reduxHook';

const Stack = createNativeStackNavigator();


import {
    useFonts,
    Gluten_100Thin,
    Gluten_200ExtraLight,
    Gluten_300Light,
    Gluten_400Regular,
    Gluten_500Medium,
    Gluten_600SemiBold,
    Gluten_700Bold,
    Gluten_800ExtraBold,
    Gluten_900Black,
  } from '@expo-google-fonts/gluten';
import { Box, Center, Slide, Spinner } from 'native-base';



const AppContainer = () => {
    const { isLoading } = useAppSelector(state => state.app);
    const { loggedIn } = useAppSelector(state => state.user);

    let [fontsLoaded] = useFonts({
        Gluten_100Thin,
        Gluten_200ExtraLight,
        Gluten_300Light,
        Gluten_400Regular,
        Gluten_500Medium,
        Gluten_600SemiBold,
        Gluten_700Bold,
        Gluten_800ExtraBold,
        Gluten_900Black,
    });

    if(!fontsLoaded || isLoading){
    return <Center flex={1}>
            <Spinner accessibilityLabel="Loading posts" size={45}/>
        </Center>
    }
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
        {
        loggedIn ? 
        
            (<Stack.Screen name='private' component={PrivateLayout}/>) 
        : 
            (<Stack.Screen name='public' component={PublicLayout}/>  )
        }
        </Stack.Navigator>        
    )
}


export default AppContainer;