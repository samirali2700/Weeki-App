import React, { useLayoutEffect } from 'react';
import { VStack, Center, Avatar, Heading, IconButton, useColorModeValue, Box, Image, Icon } from 'native-base';

import { PrivateStackScreenProps } from '../../../typings/RootParamList';
import { Feather } from '@expo/vector-icons';

type Props = PrivateStackScreenProps<'Settings'>
const Settings:React.FC<Props> = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <IconButton mx={2} icon={<Icon as={Feather} name='chevron-left' size="2xl" onPress={() => navigation.navigate('AppStack')}/>}/>     
        });
    },[])

 
    return(
     <Center w="100%" h="100%"  _dark={{bg: 'blueGray.900'}}  _light={{bg: 'primary.50'}}> 
        <VStack space={5} w="100%" alignItems="center">
            <Box p={10} bg={useColorModeValue('red.500','yellow.500')} >
                <Heading size="2xl">Indstillinger</Heading>
            </Box>
        </VStack>
    </Center>
   
    )
}

export default Settings;