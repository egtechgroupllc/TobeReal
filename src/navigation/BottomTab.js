import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeExploreScreen} from '../screen/Explore';
import {HomeBookingsScreen} from '../screen/Bookings';
import {IconBookings, IconExplore} from '../assets/icon/Icon';
import NavigationExplore from './NavigationExplore';

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
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={HomeBookingsScreen}
        options={{
          tabBarIcon: IconBookings,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
