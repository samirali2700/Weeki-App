import type {
    CompositeScreenProps,
    NavigatorScreenParams,
  } from '@react-navigation/native';
  import type { StackScreenProps  } from '@react-navigation/stack';
  import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
  import type { DrawerScreenProps } from '@react-navigation/drawer';


export type PublicStackScreenProps<T extends keyof PublicStackParamList> = StackScreenProps<PublicStackParamList, T>



export type StackParamList = {
    AppStack: NavigatorScreenParams<TabParamList>,
    MyAccount: undefined,
    Settings: undefined
}

export type TabParamList = {
    Home: undefined,
    Notification: undefined,
    Todo: undefined,
    MyMessages: undefined
}
export type DrawerParamList = {
    RootStack: NavigatorScreenParams<StackParamList>
}

    //for Tab Screens nested in Stack nested in Drawer
export type RootTabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
        BottomTabScreenProps<TabParamList, T>,
        CompositeScreenProps<
            StackScreenProps<StackParamList>,
            DrawerScreenProps<DrawerParamList>
        >
    >;

    //for Stack Screens nested in Drawer nav
export type StackDrawerScreenProps<T extends keyof StackParamList> = CompositeScreenProps<
    StackScreenProps<StackParamList, T>,
    DrawerScreenProps<DrawerParamList>
>;

export type RootScreenProps<T extends keyof StackParamList> = StackScreenProps<StackParamList, T>

export type RooStackParamList = {
    PrivateLayout: undefined,
    PublicLayout: undefined
}
export type PublicStackParamList = {
    Login: undefined,
    Signup: undefined,
}
export type PrivateStackParamList = {

}
export type RootStackParamList = {
    AppDrawer: NavigatorScreenParams<TabParamList>,
    MyAccount: undefined,
    Settings: undefined
}
export type DrawerScreenParamList = {
    RootStack: undefined,
}

