import { View, Text } from 'react-native'
import React, { useCallback, useLayoutEffect, useRef } from 'react'


import TodoItem  from "./todo-item";

import { PanGestureHandlerProps, ScrollView } from 'react-native-gesture-handler';

import { Todo }  from "../entities/Todo";

import * as Animatable from "react-native-animatable";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, SlideInUp } from 'react-native-reanimated';
import { Box } from 'native-base';
import { MotiView, AnimatePresence } from "moti";

interface TodoItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  item: Todo,
  onRemoveItem: (item: Todo) => void,

}

const AnimatedTodoItem = (props: TodoItemProps) => {
  const { item, onRemoveItem, simultaneousHandlers } = props;
  
  const opacity = useSharedValue(1);

  const handleRemove = useCallback(() => {

    onRemoveItem(item)
  }, [item, onRemoveItem])

  const containerStyle = useAnimatedStyle(() => ({opacity: opacity.value}))

 

  return (
    <MotiView >
      <TodoItem 
          item={item}
          onRemove={handleRemove}
          simultaneousHandlers={simultaneousHandlers}
        />
    </MotiView>
  )
}



interface TodoListProps {
  items: Todo[],
  onRemoveItem: (item: Todo) => void,
}
const TodoList = (props: TodoListProps) => {
  const { items, onRemoveItem } = props;
  const scrollRef = useRef(null);




  return (
    <ScrollView ref={scrollRef} style={{paddingBottom: 20}}>
         <AnimatePresence>
        {items.map((item, index) => (
          
          <AnimatedTodoItem
            key={index}
            item={item}
            onRemoveItem={onRemoveItem}
            simultaneousHandlers={scrollRef}
          />
 
        ))}
        </AnimatePresence>
    </ScrollView>
  )
}

//TODO do a animated Item holder

export default TodoList