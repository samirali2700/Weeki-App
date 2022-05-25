import React from 'react';

//Navigators
import { createDrawerNavigator } from '@react-navigation/drawer';



//Components
import CustomDrawer from '../components/CustomDrawer';


//Nav Stacks
import RootStack from '../navigationStacks/RootStack';


//redux store
import {  useAppSelector } from "../hooks/reduxHook";

//native components
import { View, useToken, IconButton, Icon } from 'native-base';

//type checking
import { DrawerParamList } from '../typings/RootParamList';





const Drawer = createDrawerNavigator<DrawerParamList>();

const App = () => {
    const themeColor = useToken('themes','primary.50')
    return(
        <View flex={1} bg="amber.100">
            <Drawer.Navigator backBehavior='initialRoute'
            screenOptions={{ headerShown: false, drawerType: 'slide', overlayColor: 'transparent',
                drawerStyle: { width: '60%', backgroundColor: themeColor},            
                sceneContainerStyle: { backgroundColor: themeColor},
            }}  
            drawerContent={props => <CustomDrawer  {...props}/>}>
                <Drawer.Screen name='RootStack' component={RootStack}></Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}



export default App;

