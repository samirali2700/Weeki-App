import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Center, Icon, Image } from 'native-base'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabParamList, RootDrawerParamList } from '../typings/RootParamList'




const CustomDrawer = (props:any) => {

    return(
        <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
            <Center mb={10} mt={-1}>
                <Image style={{borderBottomRightRadius: 20}} h={150} source={require('../assets/masthead.png')} alt="logo"></Image>
            </Center>
            <DrawerItem label="Min Konto" 
            onPress={() => props.navigation.navigate('MyAccount')} 
            icon={({focused}) => <Icon as={MaterialCommunityIcons} name='account'  size="xl" color={focused?"primary.500":'primary.100'} />}
            labelStyle={{marginLeft: -16, color: '#fff'}}
            />

            <DrawerItem label="Indstillinger" 
            onPress={() => props.navigation.navigate('Settings')} 
            icon={({focused}) => <Icon as={Ionicons} name='settings-sharp'  size="xl" color={focused?"primary.500":'primary.100'} />}
            labelStyle={{marginLeft: -16, color: "#fff"}}
            />

        </DrawerContentScrollView>
    )
}

export default CustomDrawer