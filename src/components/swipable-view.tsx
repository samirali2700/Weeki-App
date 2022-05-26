import React, { useEffect, useState } from 'react'
import { createAnimatableComponent } from 'react-native-animatable'
import { Box, Center, Icon, Text } from "native-base";
import { Dimensions, StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, 
    useSharedValue, withDelay, withTiming } from 'react-native-reanimated';



const AnimatedBox = createAnimatableComponent(Box)
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ITEM_WIDTH = SCREEN_WIDTH * .8; //item width of 80% of screen width /20% margin / 10% each side
const ITEM_HEIGHT = SCREEN_HEIGHT * .08; //5% of screen height for each item
const BACKVIEW_RIGHT_POSITION = SCREEN_WIDTH * .1; //10% of screen from right

const SWIPE_TRESHOLD = -SCREEN_WIDTH * 0.2;

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    children: React.ReactNode,
    backView: React.ReactNode,
    onSwipeLeft?: () => void,

}

const SwipeView = (props:Props) => {
    const { children, backView, onSwipeLeft, simultaneousHandlers } = props;

    //sharedValues between UI THREAD and MAIN JS THREAD
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1);
    const trashTranslateX = useSharedValue(0);
    const trashOpacity = useSharedValue(0);
    const listHeight = useSharedValue(ITEM_HEIGHT);
    const [removed, setRemoved] = useState(false);


    // useEffect(() => {
    //     if(removed) {
    //         setTimeout(()=> {
    //             onSwipeLeft();
    //         }, 500)
    //     }
    // }, [removed])

   
    
    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>( {
        onActive: event => {
          translateX.value = Math.max(-128, Math.min(0, event.translationX));

          //opacity interpolate, so the opacity changes with the event.translationX
          const opacity = interpolate(event.translationX, [0, -50, -115], [0, .25, .5, 1]);
            trashOpacity.value = opacity;
         
        },
        onEnd: () => {
            const dismissFlag = translateX.value < SWIPE_TRESHOLD;

            if(dismissFlag) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                trashTranslateX.value = withTiming(-SCREEN_WIDTH);
                trashOpacity.value = 0;
                opacity.value = 0;
                // listHeight.value = withDelay(200, withTiming(0));
                runOnJS(onSwipeLeft)();
                //onSwipeLeft && runOnJS(onSwipeLeft)()
            }
            else { translateX.value = withTiming(1) }
            
        },
    
      })

    const AnimatedFacadeStyle = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}],    

    }))
    const AnimatedBackViewStyle = useAnimatedStyle(() => ({
        opacity: trashOpacity.value,
        translateX: trashTranslateX.value,
    }))
    const AnimatedContainerStyle = useAnimatedStyle(() => ({
        height: listHeight.value,
    }))


  return (
      <Animated.View  style={[style.container, AnimatedContainerStyle]}>
         {backView && ( 
                <Animated.View style={[style.backView, AnimatedBackViewStyle]}>{backView}</Animated.View>
         )}
        <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
            <Animated.View  style={[style.holder, AnimatedFacadeStyle]}>{children}</Animated.View>
        </PanGestureHandler>
    </Animated.View>
  )
}

export default SwipeView

const style = StyleSheet.create({

    container: {
        width: '100%',
        alignItems: 'center',
    },
    holder: {
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'white',
        width: ITEM_WIDTH,
        justifyContent: 'center',
        paddingLeft: 10,
        height: '100%',
    },
    backView: {
        position: 'absolute',
        right: BACKVIEW_RIGHT_POSITION,
        width: ITEM_WIDTH * .75,        //25% of the item width
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 25,
        backgroundColor:  'red', //'#fafaf9',
        height: '100%'
    },
})