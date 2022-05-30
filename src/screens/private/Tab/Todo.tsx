import React, { useCallback, useState } from "react";
import { Box, Text, Center, Heading, VStack, IconButton, useToken, Stack, Input} from "native-base";

import { PrivateTabScreenProps } from "../../../typings/RootParamList";

import TodoList from "../../../components/todo-list";
import { Todo } from "../../../entities/Todo";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import { ShadowPreset } from "../../../utils/theme";



type Props = PrivateTabScreenProps<'Todo'>;
const TodoScreen:React.FC<Props> = () => {
    const [todos, setTodos] = useState<Todo[]>([new Todo(0, 'Implement Login & Signup'), new Todo(1, 'Implement Chat System')])
    const [task, setTask] = useState('');
    const [empty, setEmpty] = useState(false);

    const handelRemove = useCallback((itemId) => {
        setTodos((prevTodos) => {return [...prevTodos.filter(i => i.id !== itemId)]})
    },[todos]) 

    const handleDone = useCallback((itemId) => {
        const toEdit = todos.findIndex(i => i.id === itemId)
        setTodos(todo => {
            let newData = [...todo];
            newData[toEdit].done = !newData[toEdit].done;
            return newData; 
        })
    },[todos])
    
    const addItem = useCallback(
        () => {
        if(task.length > 0){
            setTodos((currentItems) => {return [...currentItems, new Todo(Math.random(), task)]})
            setTask('');
            setEmpty(false);
        }else setEmpty(true);
    },[task])

    // useFocusEffect(useCallback(
    //     () => {
    //         setTask('');
    //         setEmpty(false);
    //     },
    //     [],
    // ))
    return(
        <Box _dark={{bg: 'dark.3'}} flex={1}>
             <VStack _dark={{bg:'dark.2'}} space={2} safeAreaTop  bg='theme.100' mb={'-7'} h={'72'} px={5} justifyContent='center' 
                style={{
                    borderBottomStartRadius:50,
                    borderBottomEndRadius: 50,
                }}
             >
                 <Box w={100} _dark={{bg:'dark.2'}} bg='theme.100' h={100} position='absolute' left={0} bottom={0} style={{transform: [{rotate: '25deg'}]}}></Box>
                 <Box w={100} _dark={{bg:'dark.2'}} bg='theme.100' h={100} position='absolute' right={0} bottom={0} style={{transform: [{rotate: '-25deg'}]}}></Box>
                <Heading fontSize={'4xl'} color={'white'} >To-do</Heading>
                <Text color={'white'} bold fontSize={'md'}>Hvad vil du lave?</Text>
                <Box>
                    <Input _dark={{bg:'white', color:'dark.3'}}  _focus={{bg:'white'}} placeholder={empty?'Du mangler at tilføje To-do':"Tilføj til To-do"} borderColor={empty?'red.600': 'white'} variant={'filled'} fontSize={'md'} onChangeText={setTask} value={task}/>                <IconButton onPress={addItem} _icon={{as: AntDesign, name: 'plus', color: 'black'}} position='absolute' right={'20px'} size={'lg'}></IconButton>
                </Box>
            </VStack>
            <VStack  space={10} >
                <Stack px={5}  >
                    {todos.length > 0 ? (
                        <TodoList 
                        todos={todos}
                        onDone={handleDone}
                        onRemoveItem={handelRemove}
                    />
                    ) : (
                        <Box w='full' h={50} my={1} backgroundColor='white' borderRadius={8} >
                        <Shadow  viewStyle={{alignSelf: 'stretch'}}  {...ShadowPreset.primary}>
                            <Center h={'100%'}>
                                <Text>Kom I gang med din næste To-do</Text>
                            </Center>
                        </Shadow>
                        </Box>
                    )}
                </Stack>
            </VStack>
        </Box>
    )
}
    
export default TodoScreen;
