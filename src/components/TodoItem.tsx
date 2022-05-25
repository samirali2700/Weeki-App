import React from 'react'
import { Box, HStack, Text } from 'native-base';

import { Shadow, ShadowProps } from 'react-native-shadow-2';

interface TODOInteface {
    index: number, 
    title: string,
}

interface props {
    todo: TODOInteface;
}

export const ShadowPresets = {
    cardBottom: {
        startColor:'rgba(0,0,0,0.1)', 
        finalColor:'#EEF2F6',
        paintInside: false,
        distance: 15,    
        offset: [0,1],
        viewStyle: {alignSelf: 'stretch'},
        sides: ['bottom'],
        corners: ['bottomLeft', 'bottomRight']

    } as ShadowProps,
}


const TodoItem:React.FC<props> = ({ todo }) => {
  return (
        <Box w='100%' mb={5} px={1.5} borderBottomWidth={1} borderColor="primary.100" >
            <Shadow  {...ShadowPresets.cardBottom}>
                <Text style={{ margin: 20, fontSize: 20 }}>{todo.title}</Text>
            </Shadow>
        </Box>

  )
}

export default TodoItem