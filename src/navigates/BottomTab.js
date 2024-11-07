import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {COLORS, WIDTH} from '~/assets/constants';
import {
  IconBottomTabProfile,
  IconCalendar,
  IconHome,
  IconProduct,
  IconQuestion,
} from '~/assets/icon/Icon';
import HomeAppointUserScreen from '~/screens/Appointment/User/HomeAppointUserScreen';
import {ProfileScreen} from '~/screens/Profile';
import {scale} from '~/utils/scale';
import {HeaderBar} from '~components';
import HomeScreen from '../screens/Home/HomeScreen';
import {CustomBottomTab} from './components/CustomBottomTab';
import {useAuthentication} from '~/hooks/useAuthentication';
import {LoginScreen} from '~/screens/Auth/Login';
import DoctorWorkScreen from '~/screens/Appointment/Doctor/Schedule/DoctorWorkScreen';
import {HomeProductScreen} from '~/screens/Products/HomeProductScreen';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getProfile} from '~/api/user';
import AnswerDoctorScreen from '~/screens/Q&A/QuestionDoctorScreen';
import QuestionDoctorScreen from '~/screens/Q&A/QuestionDoctorScreen';
import QuestionUserScreen from '~/screens/Q&A/QuestionUserScreen';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const {token} = useAuthentication();
  const queryClient = useQueryClient();
  const {isLoading, data, error} = useQuery({
    queryKey: [...getProfile.queryKey],
    queryFn: () => getProfile(),
    enabled: !!token,
  });

  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.cyan,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarItemStyle: {
          columnGap: scale(4),
        },

        tabBarHideOnKeyboard: true,
        headerTransparent: true,
        tabBarStyle: [
          WIDTH.widthScreen > 700 && {
            height: scale(50),
          },
          {
            zIndex: -1,
          },
        ],
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <IconHome fill={focused ? COLORS.cyan : '#97B5BF'} />
          ),
          header: props => <HeaderBar {...props} />,

          // tabBarIcon: () => (
          //   <CImage
          //     source={images.iconSaveloka}
          //     style={{width: scale(25), height: scale(25)}}
          //     resizeMode="cover"
          //   />
          //   // <IconExplore fill={focused && '#F0B90B'} />
          // ),
        }}
      />
      {/* <Tab.Screen
        name={'Booking'}
        component={NavigationBookings}
        options={{
          tabBarLabel: t('booking'),
          tabBarIcon: ({focused}) => (
            <IconBookings fill={focused && '#F0B90B'} />
          ),
        }}
      /> */}
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
      {/* <Tab.Screen
        name={'Video'}
        component={NavigationVideo}
        options={{
          tabBarLabel: t('reviews'),

          tabBarIcon: ({focused}) => (
            <IconVideo fill={focused && COLORS.primary} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Short"
        component={NavigationWishList}
        options={{
          tabBarIcon: ({focused}) => (
            <IconMapView fill={focused && '#F0B90B'} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
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
      /> */}
      {/* <Tab.Screen
        name={'Product'}
        component={HomeProductScreen}
        options={{
          tabBarLabel: 'Product',
          tabBarIcon: ({focused}) => (
            <IconProduct fill={focused && COLORS.cyan} />
          ),
          header: props => <HeaderBar {...props} />,
        }}
      /> */}
      {data?.data?.role !== 3 ? (
        <Tab.Screen
          name={'Questions'}
          component={QuestionUserScreen}
          options={{
            tabBarLabel: 'Q&A',
            tabBarIcon: ({focused}) => (
              <IconQuestion fill={focused && COLORS.cyan} />
            ),
            header: props => <HeaderBar {...props} />,
          }}
        />
      ) : (
        <Tab.Screen
          name={'QuestionsDoctor'}
          component={QuestionDoctorScreen}
          options={{
            tabBarLabel: 'Q&A',
            tabBarIcon: ({focused}) => (
              <IconQuestion fill={focused && COLORS.cyan} />
            ),
            header: props => <HeaderBar {...props} />,
          }}
        />
      )}
      {data?.data?.role !== 3 ? (
        <Tab.Screen
          name={'Appointment'}
          component={HomeAppointUserScreen}
          options={{
            tabBarLabel: 'Appointment',
            tabBarIcon: ({focused}) => (
              <IconCalendar fill={focused && COLORS.cyan} />
            ),
            header: props => <HeaderBar {...props} />,
          }}
        />
      ) : (
        <Tab.Screen
          name={'AppointmentDoctor'}
          component={DoctorWorkScreen}
          options={{
            tabBarLabel: 'Appointment',
            tabBarIcon: ({focused}) => (
              <IconCalendar fill={focused && COLORS.cyan} />
            ),
            header: props => <HeaderBar {...props} />,
          }}
        />
      )}
      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <IconBottomTabProfile fill={focused && COLORS.cyan} />
          ),
          header: props => <HeaderBar {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}
