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
  IconVideo,
} from '../assets/icon/Icon';
import NavigationBookings from './NavigationBookings';
import NavigationExplore from './NavigationExplore';
import NavigationProfile from './NavigationProfile';
import NavigationPromotion from './NavigationPromotion';
import NavigationWishList from './NavigationWishList';
import {COLORS, images, scale} from '../assets/constants';
import NavigationNews from './NavigationNews';
import {HomeMapScreen} from '../components';
import {useLanguage} from '../hooks/useLanguage';
import CustomImage from '../components/CustomImage';
import NavigationVideo from './NavigationVideo';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const {t} = useLanguage();
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F0B90B',
        tabBarInactiveTintColor: '#000000',
        tabBarItemStyle: {
          columnGap: scale(4),
        },
        // tabBarHideOnKeyboard: true,
        tabBarStyle: {
          zIndex: -1,
        },
      }}>
      <Tab.Screen
        name={'Explore'}
        component={NavigationExplore}
        options={{
          tabBarLabel: t('explore'),

          tabBarIcon: ({focused}) => (
            <CustomImage
              source={images.iconSaveloka}
              style={{width: scale(25), height: scale(25)}}
              resizeMode="cover"
            />
            // <IconExplore fill={focused && '#F0B90B'} />
          ),
        }}
      />
      <Tab.Screen
        name={'Booking'}
        component={NavigationBookings}
        options={{
          tabBarLabel: t('booking'),
          tabBarIcon: ({focused}) => (
            <IconBookings fill={focused && '#F0B90B'} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={'Promotion'}
        component={NavigationPromotion}
        options={{
          tabBarLabel: t('promotion'),

          tabBarIcon: ({focused}) => (
            <IconPromotion fill={focused && '#F0B90B'} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={'Video'}
        component={NavigationVideo}
        options={{
          tabBarLabel: t('Reviews'),

          tabBarIcon: ({focused}) => (
            <IconVideo fill={focused && COLORS.primary} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Short"
        component={NavigationWishList}
        options={{
          tabBarIcon: ({focused}) => (
            <IconMapView fill={focused && '#F0B90B'} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={'Map'}
        component={HomeMapScreen}
        options={{
          tabBarLabel: t('map'),
          tabBarIcon: ({focused}) => (
            <IconMapView fill={focused && '#F0B90B'} />
          ),
        }}
      />
      <Tab.Screen
        name={'POST'}
        component={NavigationNews}
        options={{
          tabBarLabel: t('post_new'),
          tabBarIcon: ({focused}) => <IconNews fill={focused && '#F0B90B'} />,
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={NavigationProfile}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ({focused}) => (
            <IconProfile fill={focused && '#F0B90B'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
