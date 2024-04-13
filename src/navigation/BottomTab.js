/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, images, scale} from '../assets/constants';
import {
  IconBookings,
  IconMapView,
  IconNews,
  IconProfile,
  IconPromotion,
  IconVideo,
} from '../assets/icon/Icon';
import {HomeMapScreen} from '../components';
import CustomImage from '../components/CustomImage';
import {useLanguage} from '../hooks/useLanguage';
import NavigationBookings from './NavigationBookings';
import NavigationExplore from './NavigationExplore';
import NavigationNews from './NavigationNews';
import NavigationProfile from './NavigationProfile';
import NavigationVideo from './NavigationVideo';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const {t} = useLanguage();
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.white,
        tabBarItemStyle: {
          columnGap: scale(4),
        },
        // tabBarHideOnKeyboard: true,
        tabBarStyle: {
          zIndex: -1,
          backgroundColor: COLORS.theme,
        },
      }}>
      <Tab.Screen
        name={'Explore'}
        component={NavigationExplore}
        options={{
          tabBarLabel: t('home'),

          tabBarIcon: ({focused}) => (
            <CustomImage
              source={images.iconNowTravel}
              style={{width: scale(20), height: scale(20)}}
              resizeMode="contain"
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
            <IconBookings fill={focused && COLORS.primary} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={'Promotion'}
        component={NavigationPromotion}
        options={{
          tabBarLabel: t('promotion'),

          tabBarIcon: ({focused}) => (
            <IconPromotion fill={focused && COLORS.primary} />
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
            <IconMapView fill={focused && COLORS.primary} />
          ),
        }}
      />
      <Tab.Screen
        name={'POST'}
        component={NavigationNews}
        options={{
          tabBarLabel: t('post_new'),
          tabBarIcon: ({focused}) => (
            <IconNews fill={focused && COLORS.primary} />
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={NavigationProfile}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ({focused}) => (
            <IconProfile fill={focused && COLORS.primary} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
