import {DetailBookingScreen, HomeBookingsScreen} from '../screen/Bookings';
import DetailBookingTourScreen from '../screen/Bookings/DetailBookingTourScreen';

export default routerBookings = [
  {
    name: 'HomeBookingsScreen',
    component: HomeBookingsScreen,
  },
  {
    name: 'DetailBookingScreen',
    component: DetailBookingScreen,
    options: {
      headerShown: true,
    },
  },
  {
    name: 'DetailBookingTourScreen',
    component: DetailBookingTourScreen,
    options: {
      headerShown: true,
    },
  },
];
