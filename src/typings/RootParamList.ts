import { CompositeScreenProps, CompositeNavigationProp } from "@react-navigation/native"


export type TabParamList = {
    Home: undefined,
    Notification: undefined,
    Todo: undefined,
    MyMessages: undefined
}

export type StackParamList = {
    App: undefined,
    MyAccount: undefined,
    Settings: undefined
}
export type DrawerParamList = {
    Screens: undefined
}
export interface RootStackParamList extends StackParamList, TabParamList, DrawerParamList {
    Screens: undefined
}