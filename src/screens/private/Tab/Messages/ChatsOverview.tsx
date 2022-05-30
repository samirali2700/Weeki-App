import React, {  useState } from 'react'
import { MessageScreenProps } from '../../../../typings/RootParamList';
import { Box, View, HStack, VStack, Pressable, Center, Spinner, Text, FlatList, Icon, Avatar } from 'native-base';
import { useGetChatOverview, usePostChat, usePostNewPublicChat } from '../../../../hooks/chats';
import { Shadow } from 'react-native-shadow-2';
import { AntDesign} from '@expo/vector-icons';

import { useQueryClient } from "react-query";
import { PublicRoom, ChatContent } from '../../../../interfaces/Chat';
import NewPublicChat from "../../../../components/new-public-chat";



type ChatProps = MessageScreenProps<'Chats'>
const Chats = ({navigation}: ChatProps) => {
    const queryClient = useQueryClient()

    const {isLoading, chats, isSuccess, isError } = useGetChatOverview();
    const {mutateAsync: createPublicRoom } = usePostNewPublicChat();
    const {mutateAsync: createPublicMessage} = usePostChat();

    const [newChat, setNewChat] = useState(false)

 

    const handleNewPublicChat = (title: string, message: string) => {
        setNewChat(false);
        const newRoom: PublicRoom = {
            title: title,
            lastMessage: message
        } 
        createPublicRoom(newRoom, {onSuccess: (data) => {
            createPublicMessage({message: message, id: data.data.name} as ChatContent, {onSuccess: () => queryClient.invalidateQueries('chats')});
        }})
        
    }

    const renderItem = ({ item }: { item: any }) => (
        <View px={5}> 
            <Box w={'100%'} my={2} h={'85px'}  borderWidth={1} borderColor='primary.100' rounded={'sm'} >
                <Shadow sides={['bottom']} distance={4} viewStyle={{width: '100%', alignSelf: 'stretch'}} radius={2} corners={['bottomLeft', 'bottomRight']}>
                <Pressable  onPress={() => navigation.navigate('Detail', {id: item.id}) }>
                <VStack  h={'100%'} alignItems='center' px={4} py={4}>
                    <HStack  space={5} alignSelf='flex-start'>
                        <Avatar source={{uri: item.image || 'https://www.cowbellmusic.dk/wp-content/uploads/2016/04/no-image-icon-md.png'}}/> 
                    <VStack>
                            <Text fontSize='md' bold>{item.title}</Text>
                        <HStack space={1}>
                            <Text fontSize='12px'>{item.from}:</Text>
                            <Text fontSize='12px'>{item.lastMessage}</Text>
                        </HStack>
                    </VStack>
                    </HStack>
                    <Text fontSize='12px' alignSelf='flex-end' mb={2} >{new Date(item.timestamp).toLocaleTimeString()}</Text>
                </VStack>
                </Pressable>
                </Shadow>
            </Box>
            
        </View>
    ); 

    return(
        <Box flex={1}  _light={{bg: 'primary.50'}} _dark={{bg: 'dark.3'}} pb={'20'} position='relative'>
            <NewPublicChat isOpen={newChat} handleClose={() => setNewChat(false)} handleCreateNewChat={handleNewPublicChat} />
            <Box flex={1}>
            {isLoading && (
                <Center w="100%" h="50%"  > 
                    <Spinner size={'lg'}/>
                </Center>
            )}
             {isError && (
                <Center flex={1}>
                    <Text>Kunne ikk hente Chats</Text>
                </Center>
            )}
            {isSuccess && (
                <FlatList data={chats} renderItem={renderItem}></FlatList>
            )}
            </Box>       
                <Pressable onPress={() => setNewChat(true)}  position={'absolute'} bottom={32} right={5}>
                    <Icon color="darkBlue.500" as={<AntDesign name="pluscircle" />} size="4xl" />
                </Pressable> 
        </Box>
    )
}

 


export default Chats