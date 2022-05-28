import React from 'react';
import { Dimensions } from 'react-native';

import { PanGestureHandlerProps, ScrollView } from 'react-native-gesture-handler';
import Animated, {  Layout, FadeOut, SlideInLeft } from 'react-native-reanimated';


import TodoItem  from "./todo-item";
import { Todo }  from "../entities/Todo";

const {height: SCREEN_HEIGHT} = Dimensions.get('window');


interface TodoItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  item: Todo,
  onRemoveItem: () => void,
  onDone?: () => void,
  index: number,
}
const AnimatedTodoItem:React.FC<TodoItemProps> = ({item, onRemoveItem, simultaneousHandlers, onDone}) => {
  return (
    <Animated.View layout={Layout.delay(200)} entering={SlideInLeft} exiting={FadeOut.duration(2000)}>
      <TodoItem 
          item={item}
          onRemove={onRemoveItem}
          simultaneousHandlers={simultaneousHandlers}
          onDone={onDone}
        />
    </Animated.View>
  )
}



interface TodoListProps {
  todos: Todo[],
  onRemoveItem?: (itemId: number) => void,
  onDone?: (itemId: number) => void,
}
const TodoList:React.FC<TodoListProps> = ({todos, onDone, onRemoveItem}) => {
  return (
    <ScrollView style={{height: SCREEN_HEIGHT * .59} }>
        {todos.map((item, index) => (
          <AnimatedTodoItem
          index={index}
            key={index}
            item={item}
            onRemoveItem={() => onRemoveItem(item.id)}
            onDone={() => onDone(item.id)}
          />
        ))}
    </ScrollView>
  )
}
export default TodoList