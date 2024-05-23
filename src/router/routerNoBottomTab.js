import {
  BookingRoomScreen,
  ListPaymentMethodsScreen,
  PostReviewScreen,
} from '../screen/Bookings';
import {SelectDefaultCountryScreen} from '../screen/DefaultCountry';
import {DetailAccommodationScreen, RoomScreen} from '../screen/Explore';

import {SeeAllRentScreen} from '../screen/Explore/components/ContentAccommodation/SeeAll';
import {DetailBuyScreen} from '../screen/Explore/components/ContentBuy';
import {DetailBrokerScreen} from '../screen/Explore/components/ContentBuy/DetailBuy/DetailBroker';
import {SeeAllBuyScreen} from '../screen/Explore/components/ContentBuy/SeeAll';
import {DetailTourScreen} from '../screen/Explore/components/ContentTour';
import {DetailTicketScreen} from '../screen/Explore/components/ContentTour/DetailTicket';
import {BookTourScreen} from '../screen/Explore/components/ContentTour/DetailTour/BookTour';
import {SeeAllTourScreen} from '../screen/Explore/components/ContentTour/SeeAll';
import {DetailRoomScreen} from '../screen/Explore/components/DetailAccommodation/Rooms';
import {NotifyScreen} from '../screen/Explore/components/Notify';
import {
  AccommoManagementScreen,
  AddPolicyScreen,
} from '../screen/News/PostNews/Lease';
import {AddRoomTypeScreen} from '../screen/News/PostNews/Lease/AddRoomType';
import AdminManageLeaseScreen from '../screen/News/PostNews/Lease/AdminManageLeaseScreen';
import PolicyManageScreen from '../screen/News/PostNews/Lease/components/AdminAccom/PolicyManage/PolicyManageScreen';
import DetailRoomManageScreen from '../screen/News/PostNews/Lease/components/AdminAccom/RoomManage/DetailRoomManageScreen';
import RoomManageScreen from '../screen/News/PostNews/Lease/components/AdminAccom/RoomManage/RoomManageScreen';
import {SellManagementScreen} from '../screen/News/PostNews/Sell';
import {MapSetAccomdScreen} from '../screen/News/PostNews/components';
import {
  ConfirmDepositScreen,
  DepositScreen,
  DetailHistoryDeposit,
  FinancialScreen,
} from '../screen/Profile/FinancialManagement';
import {
  HomeSearchAccommodScreen,
  ListAccommodationSearchScreen,
} from '../screen/Search';
import {ListVideoInfluencerScreen} from '../screen/Video';
import {CountryScreen, CurrencyScreen} from '../screen/components';

// eslint-disable-next-line no-undef
export default routerNoBottomTab = [
  {
    name: 'DetailAccommodationScreen',
    component: DetailAccommodationScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'DetailTourScreen',
    component: DetailTourScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'DetailBuyScreen',
    component: DetailBuyScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'DetailBrokerScreen',
    component: DetailBrokerScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'DetailTicketScreen',
    component: DetailTicketScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SeeAllBuyScreen',
    component: SeeAllBuyScreen,
    options: {
      headerTitleStyle: {
        textAlign: 'left',
      },
    },
  },
  {
    name: 'SeeAllRentScreen',
    component: SeeAllRentScreen,
    options: {
      headerTitleStyle: {
        textAlign: 'left',
      },
    },
  },
  {
    name: 'SeeAllTourScreen',
    component: SeeAllTourScreen,
    options: {
      headerTitleStyle: {
        textAlign: 'left',
      },
    },
  },
  {
    name: 'HomeSearchAccommodScreen',
    component: HomeSearchAccommodScreen,
    options: {
      headerTitleStyle: {
        textAlign: 'left',
      },
    },
  },
  {
    name: 'BookingRoomScreen',
    component: BookingRoomScreen,
  },
  {
    name: 'BookTourScreen',
    component: BookTourScreen,
    options: {
      headerShown: false,
    },
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
  },
  {
    name: 'CurrencyScreen',
    component: CurrencyScreen,
  },
  {
    name: 'MapSetAccomdScreen',
    component: MapSetAccomdScreen,
  },
  {
    name: 'AccommoManagementScreen',
    component: AccommoManagementScreen,
  },
  {
    name: 'RoomScreen',
    component: RoomScreen,
  },
  {
    name: 'DetailRoomScreen',
    component: DetailRoomScreen,
  },
  {
    name: 'SellManagementScreen',
    component: SellManagementScreen,
  },
  {
    name: 'DepositScreen',
    component: DepositScreen,
  },
  {
    name: 'ConfirmDepositScreen',
    component: ConfirmDepositScreen,
  },
  {
    name: 'DetailHistoryDeposit',
    component: DetailHistoryDeposit,
    options: {
      headerTitleStyle: {
        textAlign: 'left',
      },
    },
  },
  {
    name: 'FinancialScreen',
    component: FinancialScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'PostReviewScreen',
    component: PostReviewScreen,
  },
  {
    name: 'ListPaymentMethodsScreen',
    component: ListPaymentMethodsScreen,
  },
  {
    name: 'NotifyScreen',
    component: NotifyScreen,
  },
  {
    name: 'AdminManageLeaseScreen',
    component: AdminManageLeaseScreen,
  },
  {
    name: 'RoomManageScreen',
    component: RoomManageScreen,
  },
  {
    name: 'DetailRoomManageScreen',
    component: DetailRoomManageScreen,
  },
  {
    name: 'PolicyManageScreen',
    component: PolicyManageScreen,
  },
  {
    name: 'AddRoomTypeScreen',
    component: AddRoomTypeScreen,
  },
  {
    name: 'AddPolicyScreen',
    component: AddPolicyScreen,
  },
  {
    name: 'SelectDefaultCountryScreen',
    component: SelectDefaultCountryScreen,
  },
];
