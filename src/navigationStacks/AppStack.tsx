import React, { useState } from 'react'
import { PrivateStackScreenProps, PrivateTabParamList } from '../typings/RootParamList'

import {  createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import Home from '../screens/private/Tab/Home';
import Notification from '../screens/private/Tab/Notification';
import TodoScreen from '../screens/private/Tab/Todo';
import MyMessages from '../screens/private/Tab/Messages/MyMessages';

//Components
import TabButton from '../components/tab-Button';

//Icons
import {  Ionicons, Feather } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator<PrivateTabParamList>();

type Props = PrivateStackScreenProps<'AppStack'>
const AppStack:React.FC<Props> = () => {

  const [display, setDiplay] = useState('flex')

  return (
    <Tab.Navigator screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
          tabBarStyle:  {
              height: 60,
              position: 'absolute',
              bottom: 16,
              left: 16,
              right:16,
              borderRadius: 16,
          },
          tabBarHideOnKeyboard: true,        
      }} initialRouteName="Home" >

      <Tab.Screen name="Home" component={Home} 
      options={{tabBarButton: (props) => <TabButton {...props} activeIcon="home" inactiveIcon="home-outline" type={Ionicons}/>}} />
      
      <Tab.Screen name="Notification" component={Notification} 
      options={{tabBarButton: (props) => <TabButton {...props} activeIcon="notifications" inactiveIcon="notifications-outline" type={Ionicons}/>}} />
      
      <Tab.Screen name="Todo" component={TodoScreen}  
      options={{tabBarButton: (props) => <TabButton {...props} activeIcon="md-list-sharp" inactiveIcon="md-list-outline" type={Ionicons}/>}} />
      
      <Tab.Screen name="MyMessages" component={MyMessages} 
      options={({route}) => ({ tabBarStyle: {height: 60,position: 'absolute',bottom: 16,left: 16,right:16,borderRadius: 16, display: getRouteFocus(route)},
         tabBarButton: (props) => <TabButton {...props} activeIcon="chatbox-ellipses" inactiveIcon="chatbox-ellipses-outline" type={Ionicons}/>})} />

      </Tab.Navigator>
  )
}


const getRouteFocus = (route:any) => {

  const routeName = getFocusedRouteNameFromRoute(route);
  
  if(routeName === 'Detail'){
    return 'none'
  }
  return 'flex';
}

export default AppStack