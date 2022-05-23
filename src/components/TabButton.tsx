import React, { useEffect, useRef} from 'react';
import { Icon, Pressable} from 'native-base';

import * as Animatable from "react-native-animatable";


const TabButton = (props: any) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
       if(focused) {
           viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1: {scale: 1.5, rotate: '360deg'}}); 
       } else {
        viewRef.current.animate({0: {scale: 1.5,  rotate: '360deg'}, 1: {scale: 1,  rotate: '0deg'}}); 
       }
    }, [focused])


    return(
        <Pressable flex={1} alignItems="center" justifyContent="center"
            onPress={onPress}
        >
            <Animatable.View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}
                ref={viewRef}
                duration={500}
            >
            <Icon as={item.type} name={focused ? item.activeIcon: item.inactiveIcon} color={focused?'blue.800': 'blue.300'}></Icon>
            </Animatable.View>
        </Pressable>
    );  
}

export default TabButton;