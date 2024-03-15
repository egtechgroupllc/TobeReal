import {DetailAccommodationScreen} from '../screen/Explore';
import { DetailTourScreen } from '../screen/Explore/components/ContentTour';
import { DetailTicketScreen } from '../screen/Explore/components/ContentTour/DetailTicket';
import {BookingScreen} from '../screen/Explore/components/DetailAccommodation/Booking';
import {
  HomeSearchAccommodScreen,
  ListAccommodationSearchScreen,
} from '../screen/Search';
import {ListVideoInfluencerScreen} from '../screen/Video';

export default routerNoBottomTab = [
  {
    name: 'DetailAccommodationScreen',
    component: DetailAccommodationScreen,
  },
  {
    name: 'DetailTourScreen',
    component: DetailTourScreen,
  },
  {
    name: 'DetailTicketScreen',
    component: DetailTicketScreen,
  },
  {
    name: 'HomeSearchAccommodScreen',
    component: HomeSearchAccommodScreen,
    options: {
      headerShown: true,
      headerTitleStyle: {
        textAlign: 'left',
      },
    },
  },
  {
    name: 'BookingScreen',
    component: BookingScreen,
  },
  {
    name: 'ListVideoInfluencerScreen',
    component: ListVideoInfluencerScreen,
    options: {contentStyle: {backgroundColor: '#000'}},
  },
  {
    name: 'ListAccommodationSearchScreen',
    component: ListAccommodationSearchScreen,
  },
];
