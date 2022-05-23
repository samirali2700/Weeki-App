import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import theme from "./src/utils/theme";
import AppContainer from "./src/AppContainer";



export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
          <AppContainer/>
      </NativeBaseProvider>
    </NavigationContainer>
   
  );
}

