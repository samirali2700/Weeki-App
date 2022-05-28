import { extendTheme } from "native-base";
import { ShadowProps } from "react-native-shadow-2";


const config = {
    useSystemColorMode: false,
    initialColorMode: 'light'
}

const colors = {
    primary: {
        50: '#EEF2F6',
        100: '#CFD9E7',
        200: '#B1C1D8',
        300: '#92A9C9',
        400: '#7491B9',
        500: '#5578AA',
        600: '#446088',
        700: '#334866',
        800: '#223044',
        900: '#111822'
      },
    theme: {
      50: '#4a90e2',
      100: '#0088ff',
    }
    
}
const themes = {
    primary: {
       
    }
}

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
      viewStyle: {alignSelf: 'stretch', backgroundColor: 'white'}
    }  as ShadowProps, 
  }  ;

export default extendTheme({ config, colors, themes })