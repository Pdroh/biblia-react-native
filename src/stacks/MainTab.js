import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Versoes from '../screens/Versoes';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import Testamentos from '../screens/Testamentos';
import Livros from '../screens/Livros';
import Capitulos from '../screens/Capitulos';
import Versiculos from '../screens/Versiculos';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator tabBar={props=><CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Versoes" component={Versoes} />
        <Tab.Screen name="Testamentos" component={Testamentos} />
        <Tab.Screen name="Livros" component={Livros} />
        <Tab.Screen name="Capitulos" component={Capitulos} />
        <Tab.Screen name="Versiculos" component={Versiculos} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Appointments" component={Appointments} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
);