
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Header from './components/Header';
import TabButton from './components/TabButton';

import Home from './screens/Home';
import MyAccount from './screens/MyAccount';
import Todo from './screens/Todo';
import MyMessages from './screens/MyMessages';




const Tab = createBottomTabNavigator();


const TabArr = [
    {id: 1, route: 'Home', label: 'Home', component: Home, type: Ionicons, activeIcon: 'home', inactiveIcon: 'home-outline'},
    {id: 2, route: 'Todo', label: 'Todo', component: Todo, type: Ionicons  , activeIcon: 'md-list-sharp', inactiveIcon: 'md-list-outline'},
    {id: 3, route: 'MyMessages', label: 'MyMessages', component: MyMessages, type: Ionicons, activeIcon: 'chatbox-ellipses', inactiveIcon: 'chatbox-ellipses-outline'},
    {id: 4, route: 'MyAccount', label: 'MyAccount', component: MyAccount, type: MaterialCommunityIcons, activeIcon: 'account-circle', inactiveIcon: 'account-circle-outline'}
];


const App = () => {
    return (
        <Tab.Navigator screenOptions={{
            header: (props) => <Header {...props}/>,
            headerShown: true,
            tabBarStyle: {
                height: 60,
                position: 'absolute',
                bottom: 16,
                left: 16,
                right:16,
                borderRadius: 16,
            }
        }}>
            {TabArr.map((item, index) => {
                return(
                    <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            tabBarLabel: item.label,
                            tabBarButton: (props) => <TabButton {...props} item={item}/>,
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    )
}

export default App;