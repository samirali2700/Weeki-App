import type {
    CompositeScreenProps,
    NavigatorScreenParams,
  } from '@react-navigation/native';
  import type { StackScreenProps  } from '@react-navigation/stack';
  import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
  import type { DrawerScreenProps } from '@react-navigation/drawer';

//messages
export type MessageParamList = {
    Chats: undefined,
    Detail: { id: string } | undefined,
}

export type MessageScreenProps<T extends keyof MessageParamList> = BottomTabScreenProps<MessageParamList, T>;


//  Second level: Public Stack
export type PublicStackParamList = {
    Login: undefined,
    Signup: undefined,
}
//  Second level: Private Drawer
export type PrivateDrawerParamList = {
    AppStack: NavigatorScreenParams<PrivateTabParamList>,
    MyAccount: undefined,
    Settings: undefined,
}
//  Third level: Private Stack
export type PrivateStackParamList = {
    AppStack: NavigatorScreenParams<PrivateTabParamList>,
    MyAccount: undefined,
    Settings: undefined
}
//  Fourth level: Private Tab
export type PrivateTabParamList = {
    Home: undefined,
    Notification: undefined,
    Todo: undefined,
    MyMessages: undefined
}


// Second Level Public Screen Props
export type PublicStackScreenProps<T extends keyof PublicStackParamList> = StackScreenProps<PublicStackParamList, T>

// Second level Private Screen props
export type PrivateDrawerScreenProps<T extends keyof PrivateDrawerParamList> =  DrawerScreenProps<PrivateDrawerParamList, T>


//  Third level Private Screen Props
export type PrivateStackScreenProps<T extends keyof PrivateStackParamList> = CompositeScreenProps<
    StackScreenProps<PrivateStackParamList, T>,
    DrawerScreenProps<PrivateDrawerParamList>
>

// Fourth level Private Screen Props
export type PrivateTabScreenProps<T extends keyof PrivateTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<PrivateTabParamList, T>,
    CompositeScreenProps< 
        StackScreenProps<PrivateStackParamList>,
        DrawerScreenProps<PrivateDrawerParamList>
>>
