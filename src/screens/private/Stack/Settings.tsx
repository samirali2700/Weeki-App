import React, { useLayoutEffect } from 'react';
import { VStack, Switch, useColorMode, Center, Avatar, Heading, IconButton, useColorModeValue, Box, Image, Icon, HStack , Text, Divider, Stack} from 'native-base';

import { PrivateStackScreenProps } from '../../../typings/RootParamList';
import { Feather } from '@expo/vector-icons';

type Props = PrivateStackScreenProps<'Settings'>
const Settings:React.FC<Props> = ({navigation}) => {
    const {colorMode, toggleColorMode} = useColorMode();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <IconButton mx={2} icon={<Icon as={Feather} name='chevron-left' size="2xl" onPress={() => navigation.navigate('AppStack', {screen: 'Home'})}/>}/>     
        });
    },[])

 
    return(
    
        <VStack w="100%" safeAreaTop pt={'3/5'} px={5} space={5}  _dark={{bg: 'blueGray.900'}} _light={{bg: 'primary.50'}} flex={1}>
            
        <Box bg='white' p={5} rounded='xl' _dark={{bg: 'dark.1'}}>
        <Heading mb={5}>App</Heading>
        <Divider />
            <HStack alignItems='center' justifyContent={'space-between'}>
                <Text >Mørktilstand</Text>
                <Switch isChecked={colorMode !== 'light'} onToggle={toggleColorMode}  size='lg' offTrackColor="indigo.100" onTrackColor="indigo.200" onThumbColor="indigo.500" offThumbColor="indigo.50"/>
            </HStack>
        </Box>
            
        </VStack>

   
    )
}

export default Settings;