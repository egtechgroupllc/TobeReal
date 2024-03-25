import {DetailAccommodationScreen} from '../screen/Explore';
import { DetailBuyScreen } from '../screen/Explore/components/ContentBuy';
import { DetailTourScreen } from '../screen/Explore/components/ContentTour';
import { DetailTicketScreen } from '../screen/Explore/components/ContentTour/DetailTicket';
import { BookTourScreen } from '../screen/Explore/components/ContentTour/DetailTour/BookTour';
import {BookingScreen} from '../screen/Explore/components/DetailAccommodation/Booking';
import { DetailRoomScreen } from '../screen/Explore/components/DetailAccommodation/Rooms/DetailRoom';
import {MapSetAccomdScreen} from '../screen/News/PostNews/components';
import {
  HomeSearchAccommodScreen,
  ListAccommodationSearchScreen,
} from '../screen/Search';
import {ListVideoInfluencerScreen} from '../screen/Video';
import {CountryScreen, CurrencyScreen} from '../screen/components';

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
    name: 'DetailBuyScreen',
    component: DetailBuyScreen,
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
    name: 'DetailRoomScreen',
    component: DetailRoomScreen,
  },
  {
    name: 'BookTourScreen',
    component: BookTourScreen,
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
  {
    name: 'CountryScreen',
    component: CountryScreen,
    options: {
      headerShown: true,
    },
  },
  {
    name: 'CurrencyScreen',
    component: CurrencyScreen,
    options: {
      headerShown: true,
    },
  },
  {
    name: 'MapSetAccomdScreen',
    component: MapSetAccomdScreen,
    options: {
      headerShown: true,
    },
  },
];
