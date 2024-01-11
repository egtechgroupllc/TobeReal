import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeBookingsScreen} from '../screen/Bookings';
import {IconBookings, IconBookingsInactive, IconExplore, IconExploreInactive, IconProfile, IconProfileInactive} from '../assets/icon/Icon';
import NavigationExplore from './NavigationExplore';
import NavigationProfile from './NavigationProfile';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const getTabBarIcon = (focused, activeIcon, inactiveIcon) => {
    const color = focused ? '#F0B90B' : '#000000';
    const iconComponent = focused ? activeIcon : inactiveIcon;
  
    return (
      <View style={{ color }}>
        {iconComponent}
      </View>
    );
  };
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
          tabBarIcon: ({ focused }) =>
          getTabBarIcon(focused, <IconExplore/>, <IconExploreInactive/>),
          tabBarActiveTintColor: '#F0B90B',
          tabBarInactiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={HomeBookingsScreen}
        options={{
          tabBarIcon: ({ focused }) =>
          getTabBarIcon(focused, <IconBookings />, <IconBookingsInactive/>),
          tabBarActiveTintColor: '#F0B90B',
          tabBarInactiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={NavigationProfile}
        options={{
          tabBarIcon: ({ focused }) =>
          getTabBarIcon(focused, <IconProfile />, <IconProfileInactive />),
          tabBarActiveTintColor: '#F0B90B',
          tabBarInactiveTintColor: '#000000',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
