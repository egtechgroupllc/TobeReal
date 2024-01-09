import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeExploreScreen} from '../screen/Explore';
import {HomeBookingsScreen} from '../screen/Bookings';
import {IconBookings, IconExplore, IconProfile} from '../assets/icon/Icon';
import NavigationExplore from './NavigationExplore';
import ProfileScreen from '../screen/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Explore"
        component={NavigationExplore}
        options={{
          tabBarIcon: IconExplore,
          tabBarActiveTintColor: '#F0B90B',
          tabBarInactiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={HomeBookingsScreen}
        options={{
          tabBarIcon: IconBookings,
          tabBarActiveTintColor: '#F0B90B',
          tabBarInactiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: IconProfile,
          tabBarActiveTintColor: '#F0B90B',
          tabBarInactiveTintColor: '#000000',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
