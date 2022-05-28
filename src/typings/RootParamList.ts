import type {
    CompositeScreenProps,
    NavigatorScreenParams,
  } from '@react-navigation/native';
  import type { StackScreenProps  } from '@react-navigation/stack';
  import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
  import type { DrawerScreenProps } from '@react-navigation/drawer';




// export type StackParamList = {
//     AppStack: NavigatorScreenParams<TabParamList>,
//     MyAccount: undefined,
//     Settings: undefined
// }

// export type TabParamList = {
//     Home: undefined,
//     Notification: undefined,
//     Todo: undefined,
//     MyMessages: undefined
// }
// export type DrawerParamList = {
//     RootStack: NavigatorScreenParams<StackParamList>
// }

//     //for Tab Screens nested in Stack nested in Drawer
// export type RootTabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
//         BottomTabScreenProps<TabParamList, T>,
//         CompositeScreenProps<
//             StackScreenProps<StackParamList>,
//             DrawerScreenProps<DrawerParamList>
//         >
//     >;

//     //for Stack Screens nested in Drawer nav
// export type StackDrawerScreenProps<T extends keyof StackParamList> = CompositeScreenProps<
//     StackScreenProps<StackParamList, T>,
//     DrawerScreenProps<DrawerParamList>
// >;

// export type RootScreenProps<T extends keyof StackParamList> = StackScreenProps<StackParamList, T>

//  Root: top level stack
export type RootStackParamList = {
    PrivateLayout: NavigatorScreenParams<PrivateDrawerParamList>,
    PublicLayout: NavigatorScreenParams<PublicStackParamList>
}
//  Second level: Public Stack
export type PublicStackParamList = {
    Login: undefined,
    Signup: undefined,
}
//  Second level: Private Drawer
export type PrivateDrawerParamList = {
    RootStack: NavigatorScreenParams<PrivateStackParamList>
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

//  Root: Screen Props
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>

// Second Level Public Screen Props
export type PublicStackScreenProps<T extends keyof PublicStackParamList> = StackScreenProps<PublicStackParamList, T>

// Second level Private Screen props
export type PrivateDrawerScreenProps<T extends keyof PrivateDrawerParamList> = DrawerScreenProps<PrivateDrawerParamList, T>


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
