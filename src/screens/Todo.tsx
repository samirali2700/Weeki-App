import React, { useState } from "react";
import { Box, Text, Center, Heading, VStack, useColorModeValue, Pressable, HStack, ScrollView} from "native-base";

//components
import TodoItem from "../components/TodoItem";

import AnimatedCheckbox from 'react-native-checkbox-reanimated';

import { RootTabScreenProps } from "../typings/RootParamList";

//temp todo list
const TODO = [
    {
        index: 0,
        title: 'My First todo'
    },
    {
        index: 1,
        title: 'My Second todo'
    },
    {
        index: 2,
        title: 'My Third todo'
    },
    {
        index: 3,
        title: 'My Fourth todo'
    },
    {
        index: 4,
        title: 'My Fifth todo'
    }

]

type Props = RootTabScreenProps<'Todo'>
const Todo:React.FC<Props> = () => {
    const [checked, setChecked] = React.useState(false);

    const [todo, setTodo] = useState(TODO);

    return(
        <Box  flex={1} _dark={{bg: 'blueGray.900'}}  _light={{bg: 'primary.50'}}>
            <Box py={9} bg={useColorModeValue('red.500','yellow.500')} w="100%" alignItems="center">
                <Heading  size="2xl">TO DO</Heading>
            </Box>
            <ScrollView  px={3.5} pt={5}>
                {todo.map((todo, index) => (
                    <TodoItem key={index} todo={todo} />
                ))}
            </ScrollView>
        </Box>

    )
}
    
    
export default Todo;

{/* <Pressable onPress={() => setChecked(!checked)}>
<AnimatedCheckbox
    checked={checked}
    highlightColor="#4444ff"
    checkmarkColor="#ffffff"
    boxOutlineColor="#4444ff"
    />
</Pressable> */}