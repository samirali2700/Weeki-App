import React from 'react';
import { HStack, Icon, Pressable, StatusBar, 
View, Box, IconButton, Text, useColorModeValue, 
useToken 
} from 'native-base';
import { Ionicons, MaterialIcons  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface props {
    name: string,
}

const Header:React.FC<props> = ({name}) => {
  
    const navigation = useNavigation();
    
    const [lighColor, darkColor] = useToken('colors', ['primary.500', 'primary.900']);
    const statusColor = useColorModeValue(lighColor, darkColor);

  
    function toggleDrawer(){
       navigation.openDrawer();
    }

    return(<>
        <StatusBar backgroundColor={statusColor} barStyle='light-content'/>
        <Box safeAreaTop>
            <HStack h={65} _dark={{bg: 'primary.900'}} _light={{bg: 'primary.500'}} px="15" py="3" justifyContent="space-between" alignItems="center" w="100%">
                <HStack alignItems="center">
                    <IconButton onPress={toggleDrawer} icon={<Icon as={Ionicons} name="menu" size="2xl" color="white"/>}></IconButton>
                    <Text color="white" fontSize={20} fontWeight="extrabold">{name}</Text>
                </HStack>
            </HStack>
        </Box>
        </>
    );
}

export default Header;