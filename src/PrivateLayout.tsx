import React, { useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { AntDesign, Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import Header from './components/Header';
import TabButton from './components/TabButton';

import Home from './screens/Home';
import Todo from './screens/Todo';
import MyMessages from './screens/MyMessages';

import MyAccount from './screens/MyAccount';
import Settings from './screens/Settings';
import Notification from './screens/Notification';


import {  useAppSelector } from "./hooks/reduxHook";

import { Box, Center, Container, HStack, Icon, IconButton, Image, Text, View, VStack } from 'native-base';
import Animated, { Extrapolate, interpolate, interpolateNode, useAnimatedStyle } from 'react-native-reanimated';

import CustomDrawer from './components/CustomDrawer';

import { DrawerItem, createDrawerNavigator, DrawerContentScrollView , useDrawerProgress, DrawerItemList, useDrawerStatus  } from '@react-navigation/drawer';
import { RootStackParamList,RootTabParamList, RootDrawerParamList } from './typings/RootParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();



const TabArr = [
    {id: 1, route: 'Home', label: 'Home', component: Home, type: Ionicons, activeIcon: 'home', inactiveIcon: 'home-outline', toggle: false},
    {id: 2, route: 'Notification', label: 'Notifikation', component: Notification, type: MaterialCommunityIcons, activeIcon: 'account-circle', inactiveIcon: 'account-circle-outline'},
    {id: 3, route: 'Todo', label: 'Todo', component: Todo, type: Ionicons  , activeIcon: 'md-list-sharp', inactiveIcon: 'md-list-outline', toggle: false},
    {id: 4, route: 'MyMessages', label: 'MyMessages', component: MyMessages, type: Ionicons, activeIcon: 'chatbox-ellipses', inactiveIcon: 'chatbox-ellipses-outline', toggle: false},
];


const App = () => {
    return(
        <View flex={1} bg="amber.100">
            <Drawer.Navigator initialRouteName='App'
            screenOptions={{
                headerShown: false,   
            
                drawerStyle: {
                width: '60%',
                backgroundColor: '#0088ff',
                },
                drawerContentContainerStyle: {
                    flex: 1
                },
                drawerType: 'slide',
                overlayColor: 'transparent',
                sceneContainerStyle: {
                backgroundColor: '#0088ff',
                },
                
            }}  
            drawerContent={props => <CustomDrawer  {...props}/>}>
                <Drawer.Screen name='Screens' component={Screens}></Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
    
    
}

function TabStack() {
    const { showTab } = useAppSelector(state => state.app);
    const toggleTab = showTab ? 'flex' :'none';
    return(

        <Tab.Navigator screenOptions={{
            tabBarStyle:  {
                height: 60,
                position: 'absolute',
                bottom: 16,
                left: 16,
                right:16,
                borderRadius: 16,
                display: toggleTab
            },
            headerShown: false
        }}>

        <Tab.Screen name="Home" component={Home} 
        options={{tabBarButton: (props) => <TabButton {...props} activeIcon="home" inactiveIcon="home-outline" type={Ionicons}/>}} />
        
        <Tab.Screen name="Notification" component={Notification} 
        options={{tabBarButton: (props) => <TabButton {...props} activeIcon="notifications" inactiveIcon="notifications-outline" type={Ionicons}/>}} />
        
        <Tab.Screen name="Todo" component={Todo} 
        options={{tabBarButton: (props) => <TabButton {...props} activeIcon="md-list-sharp" inactiveIcon="md-list-outline" type={Ionicons}/>}} />
        
        <Tab.Screen name="MyMessages" component={MyMessages} 
        options={{tabBarButton: (props) => <TabButton {...props} activeIcon="chatbox-ellipses" inactiveIcon="chatbox-ellipses-outline" type={Ionicons}/>}} />

        </Tab.Navigator>

)
}



type Props = NativeStackScreenProps<RootStackParamList, 'App'>
const Screens:React.FC<Props> = ({navigation}) => {
    const progress = useDrawerProgress();

  
    const style = useAnimatedStyle(() => {
        const scale = interpolate(progress.value, [0, 1], [1, 0.8], Extrapolate.CLAMP);
        const borderRadius = interpolate(progress.value, [0,1], [1,30]);
        
        return {
          borderRadius: borderRadius,
          //transform: [{ scale }],
            transform: [{scale: scale}]
        };
      }, []);

    return(
        <Animated.View style={[{flex: 1, overflow: 'hidden'}, style]}>
            <Stack.Navigator screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerLeft: () => (
                    <IconButton mx={2} icon={<Icon as={Feather} name='menu' size="2xl" onPress={() => navigation.openDrawer()}/>}/>
                )
            }}>
                <Stack.Screen name='App' component={TabStack} />
                <Stack.Screen name='MyAccount' component={MyAccount} />
                <Stack.Screen name='Settings' component={Settings} />
            </Stack.Navigator>
        </Animated.View>
    )
}



export default App;

