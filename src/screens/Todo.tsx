import React, { useCallback, useRef, useState } from "react";
import { Box, Text, Center, Heading, VStack, useColorModeValue, Pressable, HStack, View, IconButton, Icon, Tooltip, useToken, Stack} from "native-base";


import { RootTabScreenProps } from "../typings/RootParamList";


import TodoList from "../components/todo-list";
import { Todo } from "../entities/Todo";

//temp todo list
const TODO = [
    {
        id: 0, 
        task: 'sometjing 10',
        done: false
    },
    {
        id: 1, 
        task: 'sometjing 1',
        done: false
    },
    {
        id: 2, 
        task: 'sometjing 2',
        done: false
    },
    {
        id: 3, 
        task: 'sometjing 3',
        done: false
    },
    {
        id: 4, 
        task: 'sometjing 5',
        done: false
    },

    
  

] as Todo[];

type Props = RootTabScreenProps<'Todo'>
const TodoScreen:React.FC<Props> = () => {
    const [checked, setChecked] = React.useState(false);
    const [todo, setTodo] = useState(TODO);

    // const onRemoveItem = useCallback((item) => {
    //     setTodo((prevTodos) => {
    //         return prevTodos.filter(i => i.id !== item.id);
    //     })
    // },[todo]) 
    const onRemoveItem = (item:any) => {
        console.log('ran onRemoveItem : Todo.tsx')
        setTodo((prevTodos) => {
            const newData = prevTodos.filter(i => i.id !== item.id);
            return newData;
        })
    } 


    return(
        <Box flex={1}>
             <Box bg={useToken('themes', 'primary.50')} mb={5} h={'1/5'} px={5}>
                <Heading fontSize={25}>Hej *Bruger*</Heading>
            </Box>
            <VStack space={10}>
            <Stack px={5}>
                <TodoList 
                    items={todo}
                    onRemoveItem={onRemoveItem}
                />
            </Stack>
            </VStack>
        </Box>
    )
}
    
    
export default TodoScreen;
