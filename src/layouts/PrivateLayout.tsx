import React, { useCallback, useEffect } from 'react';

//Navigators
import { createDrawerNavigator } from '@react-navigation/drawer';



//Components
import CustomDrawer from '../components/CustomDrawer';


//Nav Stacks
import RootStack from '../navigationStacks/RootStack';


//redux store
import {  useAppSelector } from "../hooks/reduxHook";

//native components
import { View, useToken, IconButton, Icon, Slide, Box, Text } from 'native-base';

//type checking
import { DrawerParamList, RootScreenProps } from '../typings/RootParamList';

import { DrawerActions } from '@react-navigation/native';

const Drawer = createDrawerNavigator<DrawerParamList>();

type Props = RootScreenProps<'AppDrawer'>
const App:React.FC<Props> = ({ navigation }) => {
    const themeColor = useToken('themes','theme.50')
    const { loggedIn, loggedInUser } = useAppSelector(state => state.user);
    const [popup, setPopup] = React.useState(true)
    const handleLogout = () => {}

    useEffect(() => {
        setPopup(true);
        setTimeout(() => {
            setPopup(false);
        }, 2500)
        return () => { console.log('going outside rivate layout')};
    }, [loggedIn])


    const navigate = useCallback(
        (to) => {
            navigation.navigate(to)
        },
        [navigation],
    )
    return(
        <View flex={1} bg="theme.100">   
           <Slide in={popup} placement='top'>
                <Box pt={8} pb={4} _text={{color: "white"}} bg="success.600" alignItems={'center'}>
                    <Text fontSize={'md'} color='white'>Velkommen, {loggedInUser.email}</Text>
                </Box>
            </Slide>
            <Drawer.Navigator backBehavior='initialRoute'
            screenOptions={{ headerShown: false, drawerType: 'slide', overlayColor: 'transparent',
                drawerStyle: { width: '50%', backgroundColor: themeColor},            
                sceneContainerStyle: { backgroundColor: themeColor, borderWidth: 0},
            }}  
            drawerContent={props => <CustomDrawer  {...props} onLogout={handleLogout} navigate={to => navigate(to)}/>}>
                <Drawer.Screen name='RootStack' component={RootStack}></Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}



export default App;

