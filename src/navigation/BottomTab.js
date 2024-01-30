/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {
  IconBookings,
  IconExplore,
  IconHeart,
  IconMapView,
  IconNews,
  IconProfile,
  IconProfileInactive,
  IconPromotion,
} from '../assets/icon/Icon';
import NavigationBookings from './NavigationBookings';
import NavigationExplore from './NavigationExplore';
import NavigationProfile from './NavigationProfile';
import NavigationPromotion from './NavigationPromotion';
import NavigationWishList from './NavigationWishList';
import {scale} from '../assets/constants';
import NavigationNews from './NavigationNews';
import {HomeMapScreen} from '../components';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F0B90B',
        tabBarInactiveTintColor: '#000000',
        tabBarItemStyle: {
          // height: scale(90),
          columnGap: scale(4),
        },
        // tabBarHideOnKeyboard: true,
        tabBarStyle: {
          zIndex: -1,
        },
      }}>
      <Tab.Screen
        name="Explore"
        component={NavigationExplore}
        options={{
          tabBarIcon: ({focused}) => (
            <IconExplore fill={focused && '#F0B90B'} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={NavigationBookings}
        options={{
          tabBarIcon: ({focused}) => (
            <IconBookings fill={focused && '#F0B90B'} />
          ),
        }}
      />
      <Tab.Screen
        name="Promotion"
        component={NavigationPromotion}
        options={{
          tabBarIcon: ({focused}) => <IconPromotion active={focused} />,
        }}
      />
      {/* <Tab.Screen
        name="WishList"
        component={NavigationWishList}
        options={{
          tabBarBadge: 3,
          title: 'Wish List',
          tabBarIcon: ({focused}) => <IconHeart fill={focused && '#F0B90B'} />,
        }}
      /> */}
      <Tab.Screen
        name="Map"
        component={HomeMapScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconMapView fill={focused && '#F0B90B'} />
          ),
        }}
      />
      <Tab.Screen
        name="Post news"
        component={NavigationNews}
        options={{
          tabBarIcon: ({focused}) => <IconNews fill={focused && '#F0B90B'} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={NavigationProfile}
        options={{
          tabBarIcon: ({focused}) => (
            <IconProfile fill={focused && '#F0B90B'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
