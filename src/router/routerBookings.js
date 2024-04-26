import {DetailBookingScreen, HomeBookingsScreen} from '../screen/Bookings';

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
];
