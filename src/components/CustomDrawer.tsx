import React from 'react'
import {  DrawerItem} from '@react-navigation/drawer'
import { Avatar, Box,  Heading, Icon, VStack } from 'native-base'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
    onLogout: () => void,
    email?: String,
    name?: String,
    pp?: string,
    navigation: any
}

const CustomDrawer:React.FC<Props > = ({navigation, email, name, pp, onLogout}) => {
    return(
    
            <VStack safeAreaTop flex={1} justifyContent='space-between' pb={'1/3'} _dark={{bg: 'dark.1'}}>
                <Box>
                    <Box mx={5} my={10} >
                        <Avatar  size={'lg'} source={{uri: pp}} ></Avatar>
                        <Heading color={'white'} mt={4} fontSize={'lg'}>{name || email}</Heading>
                    </Box>
                    <Box>
                            <DrawerItem  label="Min Konto"  
                            onPress={() => navigation.navigate('MyAccount')} 
                            icon={() => <Icon as={MaterialCommunityIcons} name='account' size="xl" color={'primary.100'} />}
                            labelStyle={{marginLeft: -16, color: '#fff'}}
                            />
                            <DrawerItem label="Indstillinger"
                            onPress={() => navigation.navigate('Settings')} 
                            icon={() => <Icon as={Ionicons} name='settings-sharp' size="xl" color={'primary.100'} />}
                            labelStyle={{marginLeft: -16, color: "white"}}
                            />
                    </Box>
                </Box>
                <Box>
                    <DrawerItem label="Logout"
                        icon={({ focused }) => <Icon as={AntDesign} name='logout' size="xl" color={focused ? "primary.500" : 'primary.100'} />}
                        labelStyle={{ marginLeft: -16, color: "#fff" }} onPress={onLogout}/>
                </Box>
            </VStack>
    )
}

export default CustomDrawer