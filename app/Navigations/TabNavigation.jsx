import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import FavoriteScreen from '../Screen/FavoriteScreen/FavoriteScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,}}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel:"Search",tabBarIcon:({color,size})=>(//change color and size if i want 
        <Ionicons name="search-sharp" size={24} color="black" />
      )}} />
      
    </Tab.Navigator>
  );
}
/*
<Tab.Screen name="Favorite" component={FavoriteScreen} options={{tabBarLabel:"Favorite",tabBarIcon:({color,size})=>(//change color and size if i want 
        <Fontisto name="favorite" size={24} color="black" />
      )}}/>
<Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel:"Profile",tabBarIcon:({color,size})=>(//change color and size if i want 
        <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />
      )}}/>
*/