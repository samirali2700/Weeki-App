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
import { PrivateDrawerParamList, RootStackScreenProps } from '../typings/RootParamList';

const Drawer = createDrawerNavigator<PrivateDrawerParamList>();


type Props = RootStackScreenProps<'PrivateLayout'>
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

    return(
        <View flex={1} bg="theme.100">   
           <Slide in={popup} placement='top'>
                <Box pt={8} pb={4} _text={{color: "white"}} bg="success.600" alignItems={'center'}>
                    <Text fontSize={'md'} color='white'>Velkommen, {loggedInUser.email}</Text>
                </Box>
            </Slide>
            <Drawer.Navigator
            screenOptions={{ headerShown: false, drawerType: 'slide', overlayColor: 'transparent',
                drawerStyle: { width: '50%', backgroundColor: themeColor},            
                sceneContainerStyle: { backgroundColor: themeColor, borderWidth: 0},
            }}  
            drawerContent={props => <CustomDrawer  {...props} onLogout={handleLogout}/>}>
                <Drawer.Screen name='RootStack' component={RootStack}></Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}



export default App;

