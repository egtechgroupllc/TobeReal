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
import {WIDTH} from '../assets/constants/theme';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const {t} = useLanguage();
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: '#fff',
        tabBarItemStyle: {
          columnGap: scale(4),
        },
        // tabBarHideOnKeyboard: true,
        tabBarStyle: [
          WIDTH.widthScreen > 700 && {
            height: scale(50),
          },
          {
            backgroundColor: COLORS.primary,
            zIndex: -1,
          },
        ],
      }}>
      <Tab.Screen
        name={'Explore'}
        component={NavigationExplore}
        options={{
          tabBarLabel: t('explore'),

          tabBarIcon: ({focused}) => (
            <CustomImage
              source={images.logoOnly}
              style={{width: scale(17), height: scale(17)}}
              resizeMode="contain"
            />
            // <IconExplore fill={focused && COLORS.green} />
          ),
        }}
      />
      <Tab.Screen
        name={'Booking'}
        component={NavigationBookings}
        options={{
          tabBarLabel: t('booking'),
          tabBarIcon: ({focused}) => (
            <IconBookings fill={focused && COLORS.green} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={'Promotion'}
        component={NavigationPromotion}
        options={{
          tabBarLabel: t('promotion'),

          tabBarIcon: ({focused}) => (
            <IconPromotion fill={focused && COLORS.green} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={'Video'}
        component={NavigationVideo}
        options={{
          tabBarLabel: t('reviews'),

          tabBarIcon: ({focused}) => (
            <IconVideo fill={focused && COLORS.green} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Short"
        component={NavigationWishList}
        options={{
          tabBarIcon: ({focused}) => (
            <IconMapView fill={focused && COLORS.green} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={'Map'}
        component={HomeMapScreen}
        options={{
          tabBarLabel: t('map'),
          tabBarIcon: ({focused}) => (
            <IconMapView fill={focused && COLORS.green} />
          ),
        }}
      />
      <Tab.Screen
        name={'POST'}
        component={NavigationNews}
        options={{
          tabBarLabel: t('post_new'),
          tabBarIcon: ({focused}) => (
            <IconNews fill={focused && COLORS.green} />
          ),
        }}
      />

      <Tab.Screen
        name={'Profile'}
        component={NavigationProfile}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ({focused}) => (
            <IconProfile fill={focused && COLORS.green} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
