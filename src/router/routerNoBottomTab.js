import {DetailAccommodationScreen} from '../screen/Explore';
import { BookingScreen } from '../screen/Explore/components/DetailAccommodation/Booking';
import {HomeSearchAccommodScreen} from '../screen/Search';
import {ListVideoInfluencerScreen} from '../screen/Video';

export default routerNoBottomTab = [
  {
    name: 'DetailAccommodationScreen',
    component: DetailAccommodationScreen,
  },
  {
    name: 'HomeSearchAccommodScreen',
    component: HomeSearchAccommodScreen,
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
];
