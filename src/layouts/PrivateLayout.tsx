import React, { useCallback, useEffect } from 'react';

//Navigators
import { createDrawerNavigator } from '@react-navigation/drawer';

//Components
import CustomDrawer from '../components/CustomDrawer';


//Nav Stacks
import RootStack from '../navigationStacks/RootStack';

import * as SecureStore from 'expo-secure-store';

//redux store
import {  useAppDispatch, useAppSelector } from "../hooks/reduxHook";

//native components
import { View, useToken, IconButton, Icon, Slide, Box, Text, Alert } from 'native-base';

import { PrivateDrawerParamList } from '../typings/RootParamList';
import { signout } from '../store/slices/userSlice';
import { getUser } from '../store/selectors';
import AppStack from '../navigationStacks/AppStack';
import MyAccount from '../screens/private/Stack/MyAccount';
import Settings from '../screens/private/Stack/Settings';

const Drawer = createDrawerNavigator<PrivateDrawerParamList>();

const App = () => {
    const themeColor = useToken('themes','theme.50')
    const { user, loggedIn } = useAppSelector(state => state.user); 

    const [popup, setPopup] = React.useState(true)
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        SecureStore.deleteItemAsync('password');
        dispatch(signout());
    }
    useEffect(() => {
        setPopup(true);
        setTimeout(() => {
            setPopup(false);
        }, 2500)
    }, [loggedIn])

    return(
        <View flex={1} bg="theme.100" _dark={{bg: 'dark.1'}}>   
           <Slide in={popup} placement='top'>
                <Box pt={8} pb={4} _text={{color: "white"}} bg="success.600" alignItems={'center'}>
                    <Text fontSize={'md'} color='white'>Velkommen, {user.email}</Text>
                </Box>
            </Slide>
            <Drawer.Navigator
            screenOptions={{ headerShown: false, drawerType: 'slide', overlayColor: 'transparent',
                drawerStyle: { width: '50%', backgroundColor: themeColor},            
                sceneContainerStyle: { backgroundColor: themeColor, borderWidth: 0},
            }}  
            //drawerContent={props =>  <CustomDrawer {...props} onLogout={handleLogout} email={user.email} pp={user.profilePicture}/>}
            >
            <Drawer.Screen name='AppStack' options={{title: 'Hjem'}} component={AppStack}></Drawer.Screen>
            <Drawer.Screen name='MyAccount' options={{title: 'Min Konto'}} component={MyAccount}></Drawer.Screen>
            <Drawer.Screen name='Settings' options={{title: 'Indstillinger'}} component={Settings}></Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}
export default App;

