import React from 'react'
import { DrawerParamList, StackParamList } from '../typings/RootParamList';

//Icons
import { Feather } from '@expo/vector-icons';

//reanimated 
import Animated, { Extrapolate, interpolate, interpolateNode, useAnimatedStyle } from 'react-native-reanimated';

import { useDrawerProgress, DrawerScreenProps  } from '@react-navigation/drawer';

import MyAccount from '../screens/MyAccount';
import Settings from '../screens/Settings';

//Nav Stacks
import AppStack from './AppStack';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, IconButton } from 'native-base';


const Stack = createStackNavigator<StackParamList>()

type Props = DrawerScreenProps<DrawerParamList, 'RootStack'>
const RootStack:React.FC<Props> = ({navigation}) => {
    
    const  progress = useDrawerProgress();

    const style = useAnimatedStyle(() => {
        const scale = interpolate(progress.value, [0, 1], [1, 0.85], Extrapolate.CLAMP);
        const borderRadius = interpolate(progress.value, [0,1], [1,15]);

        
        return {
          borderRadius: borderRadius,
          //transform: [{ scale }],
            transform: [{scale: scale}],
        };
      }, []);

    return(
        <Animated.View style={[{flex: 1, overflow: 'hidden', borderWidth:1, borderColor: '#808080'  }, style]}>
            <Stack.Navigator initialRouteName='AppStack'  screenOptions={{
                headerTransparent: true,
                headerTitleStyle: { fontWeight: 'bold'},
                headerLeft: (props) => <IconButton mx={2} icon={<Icon as={Feather} name='menu' size="2xl" onPress={() => navigation.openDrawer()}/>}/>
            }}>
                <Stack.Screen name='AppStack' options={{title: '' }} component={AppStack} />
                <Stack.Screen name='MyAccount' options={{title: 'Min Konto'}}  component={MyAccount} />
                <Stack.Screen name='Settings' options={{title: 'Indstillinger'}} component={Settings} />
            </Stack.Navigator>
        </Animated.View>
    )
}

export default RootStack