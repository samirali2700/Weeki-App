import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Box, Center, Heading, Icon, Image, Text, VStack } from 'native-base'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'


interface Props  {
    onLogout?: () => void,
    navigate: (to: string) => void,
}

const CustomDrawer= (props:Props) => {
    const { navigate, onLogout } = props;


    return(
        <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}} alwaysBounceHorizontal>
            <VStack flex={1} justifyContent='space-between' pb={'1/3'}>
                <Box>
                <Box mx={5} my={5} >
                    <Avatar  size={'xl'} source={{uri: 'https://i.ytimg.com/vi/JbT1zyVz13Q/maxresdefault.jpg'}} ></Avatar>
                    <Heading color={'white'} mt={4} fontSize={'lg'}>Ali Chouikhi</Heading>
                </Box>
                <Box>
                    <DrawerItem label="Min Konto" 
                    onPress={() => navigate('MyAccount')} 
                    icon={({focused}) => <Icon as={MaterialCommunityIcons} name='account'  size="xl" color={focused?"primary.500":'primary.100'} />}
                    labelStyle={{marginLeft: -16, color: '#fff'}}
                    />

                    <DrawerItem label="Indstillinger" 
                    onPress={() => navigate('Settings')} 
                    icon={({focused}) => <Icon as={Ionicons} name='settings-sharp'  size="xl" color={focused?"primary.500":'primary.100'} />}
                    labelStyle={{marginLeft: -16, color: "#fff"}}
                    />
                </Box>
                </Box>
                <Box>
                <DrawerItem label="Logout" 
                onPress={onLogout} 
                icon={({focused}) => <Icon as={AntDesign} name='logout'  size="xl" color={focused?"primary.500":'primary.100'} />}
                labelStyle={{marginLeft: -16, color: "#fff"}}
                />
            </Box>
            </VStack>
           
        </DrawerContentScrollView>
    )
}

export default CustomDrawer