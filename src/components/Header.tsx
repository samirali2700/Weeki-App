import React from 'react';
import { HStack, Icon, Pressable, StatusBar, 
View, Box, IconButton, Text, useColorModeValue, 
useToken 
} from 'native-base';
import { MaterialIcons  } from '@expo/vector-icons';


const Header = (props: any) => {
    const [lighColor, darkColor] = useToken('colors', ['primary.500', 'primary.900']);
    const statusColor = useColorModeValue(lighColor, darkColor);
   
    return(<>
        <StatusBar backgroundColor={statusColor} barStyle='light-content'/>
        <Box safeAreaTop>
            <HStack _dark={{bg: 'primary.900'}} _light={{bg: 'primary.500'}} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
                <HStack alignItems="center" >
                    <IconButton icon={<Icon size="md" as={MaterialIcons} name="menu" color="white"/>} />
                    <Text color="white" fontSize={20} fontWeight="extrabold">{props.route.name}</Text>
                </HStack>
            <HStack>
                <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
            </HStack>
            </HStack>
        </Box>
        </>
    );
}

export default Header;