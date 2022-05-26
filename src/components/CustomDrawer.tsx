import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Box, Center, Icon, Image } from 'native-base'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'




const CustomDrawer= (props:any) => {
    const { navigation } = props;
    return(
        <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
            <Box mx={5} my={5} >
                <Avatar  size={'xl'} source={{uri: 'https://i.ytimg.com/vi/JbT1zyVz13Q/maxresdefault.jpg'}} ></Avatar>
            </Box>
            <DrawerItem label="Min Konto" 
            onPress={() => navigation.navigate('MyAccount')} 
            icon={({focused}) => <Icon as={MaterialCommunityIcons} name='account'  size="xl" color={focused?"primary.500":'primary.100'} />}
            labelStyle={{marginLeft: -16, color: '#fff'}}
            />

            <DrawerItem label="Indstillinger" 
            onPress={() => navigation.navigate('Settings')} 
            icon={({focused}) => <Icon as={Ionicons} name='settings-sharp'  size="xl" color={focused?"primary.500":'primary.100'} />}
            labelStyle={{marginLeft: -16, color: "#fff"}}
            />

        </DrawerContentScrollView>
    )
}

export default CustomDrawer