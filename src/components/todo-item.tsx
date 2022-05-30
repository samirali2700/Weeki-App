import React from 'react'
import { Box, HStack, IconButton, Pressable, Stack, Text } from 'native-base'

import { Ionicons } from '@expo/vector-icons'

import Animated from 'react-native-reanimated'
import { Shadow } from "react-native-shadow-2";
import { PanGestureHandlerProps } from 'react-native-gesture-handler'
import AnimatedCheckbox from 'react-native-checkbox-reanimated';

import { ShadowPreset } from "../utils/theme";
import { Todo } from '../entities/Todo'


interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  item: Todo,
  onRemove?: () => void,
  onDone?: () => void,
}
const TodoItem:React.FC<Props> = ({ item, onRemove, onDone}) => {
  return (
    <Animated.View >
        <Box w='full' h={12} my={1} flex={1} backgroundColor='white' borderRadius={8}>
          <Shadow  viewStyle={{alignSelf: 'stretch'}}  {...ShadowPreset.primary}>
            <HStack  h='100%' alignItems={'center'} px={5} justifyContent="space-between" >
              <HStack space={5}>
              <Pressable w='5' h='5' onPress={onDone}>
                <AnimatedCheckbox
                  highlightColor='#fff'
                  boxOutlineColor='#000'
                  checkmarkColor='#000'
                  checked={item.done}
                />
                </Pressable>
                <Text _dark={{color: 'dark.3'}}>{item.task}</Text>
                </HStack>
                <Stack alignItems={'center'}>
                  <IconButton onPress={onRemove} _icon={{
                    as: Ionicons,
                    name: 'trash-sharp',
                    size: 'lg',
                    color: 'black'
                  }}/>
                </Stack>
            </HStack>
          </Shadow>
        </Box>
    </Animated.View>
  )
}

export default TodoItem