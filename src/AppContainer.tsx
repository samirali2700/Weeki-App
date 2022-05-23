import React from 'react';
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
   const [ loggedIn, setLoggedIn ] = React.useState(true)
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