import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import theme from "./src/utils/theme";
import AppContainer from "./src/AppContainer";

import { Provider } from 'react-redux';
import Store from "./src/store/store";



export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Provider store={Store}>
          <AppContainer/>
          </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
   
  );
}

