import { View, Text } from 'react-native'
import React, { useState } from 'react'

import SwipeView from './swipable-view'
import { Box, Center, HStack, Icon, IconButton, Pressable, Stack } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { Todo } from '../entities/Todo'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'
import AnimatedCheckbox from 'react-native-checkbox-reanimated';

import { Shadow, ShadowProps } from "react-native-shadow-2";

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  item: Todo,
  onRemove?: () => void,
  onDone?: () => void
}
import * as Animatable from "react-native-animatable";
import Animated from 'react-native-reanimated'

export const ShadowPreset = {
  primary: {
    startColor: 'rgba(0,0,0,0.1)',
    finalColor: 'rgba(125,125,125,0)',
    radius: 8,
    sides: ['bottom'],
    corners: ['bottomLeft', 'bottomRight'],
    distance: 3,
    offset: [0,0],
    paintInside: false,
  }  as ShadowProps,
   
}  ;

const TodoItem = (props: Props) => {
  const { item, onRemove, onDone, simultaneousHandlers } = props;
  const [checked, setChecked] = useState(false);
  return (
    <Animated.View >
        <Box w='full' h={12} my={1} flex={1} backgroundColor='white' borderRadius={8}>
        <Shadow  viewStyle={{alignSelf: 'stretch'}}  {...ShadowPreset.primary}>
          <HStack  h='100%' alignItems={'center'} px={5} justifyContent="space-between" >
            <HStack space={5}>
            <Pressable w='5' h='5' onPress={() => setChecked(!checked)}>
              <AnimatedCheckbox
                highlightColor='#fff'
                boxOutlineColor='#000'
                checkmarkColor='#000'
                checked={checked}
              />
              </Pressable>
              <Text>{item.task}</Text>
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