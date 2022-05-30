import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MessageScreenProps } from '../../../../typings/RootParamList';
import { useGetChatContent, usePostChat } from '../../../../hooks/chats';
import { Box, VStack, Text, Center, View, FlatList, Spinner, IconButton, TextArea, Icon } from 'native-base';
import { Feather, Ionicons } from '@expo/vector-icons';
import { ChatContent } from '../../../../interfaces/Chat';
import { useQueryClient } from "react-query";


type DetailProps = MessageScreenProps<'Detail'>
const Detail = ({route, navigation}: DetailProps) => {
    const {isLoading, chats, isSuccess, isError, refetch } = useGetChatContent(route.params.id);
    const queryClient = useQueryClient();
    const [roomId, setRoomId] = useState(route.params.id);
    const [message, setMessage] = useState('');

    const { mutate: sendMessage } = usePostChat();

    const scrollRef = useRef(null)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <IconButton mx={2} _icon={{as: Feather,name: 'chevron-left',size: '2xl',}} onPress={() => navigation.goBack()}/>,
            title: route.params.id,  
    });
    },[])

    const handleSendMessage = () => {
        if(message.length > 0){
            sendMessage({message: message, id: roomId} as ChatContent, {onSuccess: () => refetch()});
            setMessage('');
        }
    }

    useEffect(() => {
        navigation.addListener('blur', (e) => {
            queryClient.removeQueries(['chat', roomId]);
            setRoomId(null)
        })
    }, [navigation])


    const renderChat = ({item}: {item: any}) => (
        <Box borderWidth={1} maxWidth='75%' px={3} py={1} my={2} rounded='lg' borderColor={'muted.400'}  alignSelf={ item.from === 'dig' ? 'flex-end' : 'flex-start'}>
            <VStack >
                {item.from !== 'dig' && (
                    <Text fontSize={'sm'} bold>{item.from}</Text>
                )}
                <Text>{item.message}</Text>
            </VStack>
        </Box>
    )

    return(
        <View flex={1}  pt={2} _light={{bg: 'primary.50'}} _dark={{bg: 'dark.3'}} pb={'20'}>
            <Box flex={1} px={5}>
            {isLoading && (
                <Center w="100%" h="50%"  > 
                    <Spinner size={'lg'}/>
                </Center>
            )}
            {isError && (
                <Center flex={1}>
                    <Text>Kunne ikk hente Chat</Text>
                </Center>
            )}
            {isSuccess && (
                <FlatList ref={scrollRef} onContentSizeChange={() => scrollRef.current.scrollToEnd({animated: true})}  data={chats} renderItem={renderChat} />
            )}
           
            </Box>
            <Box position={'absolute'} bottom={0} w={'100%'} >
                <TextArea value={message} onChangeText={setMessage} pl={5} pt={4} minHeight={'50px'}  borderColor={'dark.400'} rounded={0}  autoCompleteType={undefined}
                 InputRightElement={(<IconButton onPress={handleSendMessage}  mr={5}  _icon={{
                    as: Ionicons,
                    name: 'send',
                    size:'md',
                    color: 'darkBlue.400'
                     }} />)}
                />
            </Box>
        </View>
    )
}
export default Detail