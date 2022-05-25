import React from 'react'
import { StackDrawerScreenProps, TabParamList } from '../typings/RootParamList'

import {  createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Todo from '../screens/Todo';
import MyMessages from '../screens/MyMessages';

//Components
import TabButton from '../components/TabButton';

//Icons
import {  Ionicons, Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<TabParamList>();

type Props = StackDrawerScreenProps<'AppStack'>
const AppStack:React.FC<Props> = () => {
  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle:  {
            height: 60,
            position: 'absolute',
            bottom: 16,
            left: 16,
            right:16,
            borderRadius: 16,
        },
        headerShown: false,
        
    }} initialRouteName="Home">

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

export default AppStack