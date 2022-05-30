import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import theme from "./src/utils/theme";
import AppContainer from "./src/AppContainer";

import { Provider } from 'react-redux';
import Store from "./src/store/store";

import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient({defaultOptions: { queries: { retry: 2, refetchInterval: 10000, refetchIntervalInBackground: true } }});

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <QueryClientProvider client={client}>
          <Provider store={Store}>
            <AppContainer/>
          </Provider>
        </QueryClientProvider>
      </NativeBaseProvider>
    </NavigationContainer>
   
  );
}

