import React from 'react'
import { PrivateDrawerScreenProps, PrivateStackParamList} from '../typings/RootParamList';

//Icons
import { Feather } from '@expo/vector-icons';

//reanimated 
import Animated, { Extrapolate, interpolate, interpolateNode, useAnimatedStyle } from 'react-native-reanimated';

import { useDrawerProgress, DrawerScreenProps  } from '@react-navigation/drawer';

import MyAccount from '../screens/private/Stack/MyAccount';
import Settings from '../screens/private/Stack/Settings';

//Nav Stacks
import AppStack from './AppStack';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, IconButton, useColorModeValue, useToken } from 'native-base';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator<PrivateStackParamList>()

type Props = PrivateDrawerScreenProps<'RootStack'>
const RootStack:React.FC<Props> = ({navigation}) => {
    
    const  progress: any = useDrawerProgress();
    const color = useColorModeValue('dark.1', 'primary.100');

    const style = useAnimatedStyle(() => {
        const scale = interpolate(progress.value, [0, 1], [1, 0.85], Extrapolate.CLAMP);
        const borderRadius = interpolate(progress.value, [0,1], [1,15]);

        return {
          borderRadius: borderRadius,
            transform: [{scale: scale}],
        };
      }, []);

    return(
        <Animated.View style={[{flex: 1, overflow: 'hidden' }, style]}>
            <Stack.Navigator initialRouteName='AppStack'  screenOptions={{
                headerTransparent: true,
                headerTitleStyle: { fontWeight: 'bold', color: useToken('colors', color)},
                headerLeft: (props) => <IconButton mx={2} icon={<Icon as={Feather} name='menu' size="2xl" onPress={() => navigation.openDrawer()}/>}/>
            }}>
                <Stack.Group>
                    <Stack.Screen name='AppStack' options={{title: '' }} component={AppStack} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'card' }}>
                    <Stack.Screen name='MyAccount' options={{title: 'Min Konto'}}  component={MyAccount} />
                    <Stack.Screen name='Settings' options={{title: 'Indstillinger'}} component={Settings} />
                </Stack.Group>
                
            </Stack.Navigator>
        </Animated.View>
    )
}

export default RootStack