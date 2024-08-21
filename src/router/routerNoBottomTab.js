import {
  BookingRoomScreen,
  ListPaymentMethodsScreen,
  PostReviewScreen,
} from '../screen/Bookings';
import HomeListVoucherScreen from '../screen/Bookings/components/BookingRoom/ContentStep2/Voucher/HomeListVoucherScreen';
import BuyVoucherScreen from '../screen/Bookings/components/BookingRoom/ContentStep2/Voucher/components/BuyVoucherScreen';
import {SelectDefaultCountryScreen} from '../screen/DefaultCountry';
import {DetailAccommodationScreen, RoomScreen} from '../screen/Explore';

import DetailReviewScreen from '../screen/Bookings/DetailReviewScreen';
import PostVideoShortReviewScreen from '../screen/Bookings/PostVideoShortReviewScreen';
import {SeeAllRentScreen} from '../screen/Explore/components/ContentAccommodation/SeeAll';
import {DetailBuyScreen} from '../screen/Explore/components/ContentBuy';
import {DetailBrokerScreen} from '../screen/Explore/components/ContentBuy/DetailBuy/DetailBroker';
import {SeeAllBuyScreen} from '../screen/Explore/components/ContentBuy/SeeAll';
import {DetailTourScreen} from '../screen/Explore/components/ContentTour';
import {DetailTicketScreen} from '../screen/Explore/components/ContentTour/DetailTicket';
import BookTourScreen from '../screen/Explore/components/ContentTour/DetailTour/BookTour/BookTourScreen';
import {SeeAllTourScreen} from '../screen/Explore/components/ContentTour/SeeAll';
import MapLocateEstate from '../screen/Explore/components/DetailAccommodation/Map/MapLocateEstate';
import {DetailRoomScreen} from '../screen/Explore/components/DetailAccommodation/Rooms';
import {NotifyScreen} from '../screen/Explore/components/Notify';
import {
  AccommoManagementScreen,
  AddPolicyScreen,
  FeaturesPolicyScreen,
} from '../screen/News/PostNews/Lease';
import {AddRoomTypeScreen} from '../screen/News/PostNews/Lease/AddRoomType';
import AdminManageLeaseScreen from '../screen/News/PostNews/Lease/AdminManageLeaseScreen';
import CheckInSuccessScreen from '../screen/News/PostNews/Lease/CheckInSuccessScreen';
import QRScanDetailScreen from '../screen/News/PostNews/Lease/QRScanDetailScreen';
import AddVoucherScreen from '../screen/News/PostNews/Lease/VoucherManage/AddVoucherScreen';
import VoucherManageScreen from '../screen/News/PostNews/Lease/VoucherManage/VoucherManageScreen';
import PolicyManageScreen from '../screen/News/PostNews/Lease/components/AdminAccom/PolicyManage/PolicyManageScreen';
import DetailRoomManageScreen from '../screen/News/PostNews/Lease/components/AdminAccom/RoomManage/DetailRoomManageScreen';
import PolicyToRoomScreen from '../screen/News/PostNews/Lease/components/AdminAccom/RoomManage/PolicyToRoomScreen';
import RoomManageScreen from '../screen/News/PostNews/Lease/components/AdminAccom/RoomManage/RoomManageScreen';
import {SellManagementScreen} from '../screen/News/PostNews/Sell';
import {AddTicketScreen} from '../screen/News/PostNews/Tour';
import TourManagementScreen from '../screen/News/PostNews/Tour/TourManagementScreen';
import AdminManageTourScreen from '../screen/News/PostNews/Tour/components/AdminManageTourScreen';
import TicketManageScreen from '../screen/News/PostNews/Tour/components/TicketTourManage/TicketManageScreen';
import {MapSetAccomdScreen} from '../screen/News/PostNews/components';
import DetailVideoShortScreen from '../screen/News/VideoShortManage/DetailVideoShortScreen';
import ManageVideoShortScreen from '../screen/News/VideoShortManage/ManageVideoShortScreen';
import PostVideoShortScreen from '../screen/News/VideoShortManage/PostVideoShortScreen';
import {SelectLanguageScreen} from '../screen/Profile';
import {
  ConfirmDepositScreen,
  DepositScreen,
  DetailHistoryDeposit,
} from '../screen/Profile/FinancialManagement';
import ListBankScreen from '../screen/Profile/FinancialManagement/Withdraw/ListBankScreen';
import {
  HomeSearchAccommodScreen,
  ListAccommodationSearchScreen,
} from '../screen/Search';
import {ListVideoInfluencerScreen} from '../screen/Video';
import DepositTokenScreen from '../screen/WalletToken/DepositTokenScreen';
import DetailTokenScreen from '../screen/WalletToken/DetailTokenScreen';
import HelpCenterTokenScreen from '../screen/WalletToken/HelpCenterTokenScreen';
import HistoryTokenDataScreen from '../screen/WalletToken/HistoryTokenDataScreen';
import WithdrawTokenScreen from '../screen/WalletToken/WithdrawTokenScreen';
import {CountryScreen, CurrencyScreen} from '../screen/components';
import TicketTypeManageScreen from '../screen/News/PostNews/Tour/components/TicketTourManage/TicketTypeManageScreen';
import AddTypeTicketScreen from '../screen/News/PostNews/Tour/AddTicket/AddTypeTicketScreen';
import BookingTourConfirm from '../screen/Explore/components/ContentTour/DetailTour/BookTour/BookingTourConfirmScreen';
import BookingTourConfirmScreen from '../screen/Explore/components/ContentTour/DetailTour/BookTour/BookingTourConfirmScreen';
import DetailReviewTourScreen from '../screen/Bookings/DetailReviewTourScreen';
import ListTourSearchScreen from '../screen/Search/ListTourSearchScreen';
import ChangeInformationScreen from '../screen/Profile/Information/ChangeInformationScreen';
import ChatBoxScreen from '../screen/Chat/ChatBoxScreen';
import MyListChatGroupScreen from '../screen/Chat/ListChatGroupScreen';
import ListChatGroupScreen from '../screen/Chat/ListChatGroupScreen';
import DailyCheckinScreen from '../screen/DailyCheckin/DailyCheckinScreen';
import RoomPriceManageScreen from '../screen/News/PostNews/Lease/components/AdminAccom/RoomManage/RoomPriceManageScreen';
import TicketPriceManageScreen from '../screen/News/PostNews/Tour/components/TicketTourManage/TicketPriceManageScreen';
import RepostExpiredScreen from '../screen/News/PostNews/components/RepostExpiredScreen';

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
    name: 'ListTourSearchScreen',
    component: ListTourSearchScreen,
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
    name: 'TourManagementScreen',
    component: TourManagementScreen,
  },
  {
    name: 'RoomScreen',
    component: RoomScreen,
  },
  {
    name: 'DetailRoomScreen',
    component: DetailRoomScreen,
  },
  // {
  //   name: 'SellManagementScreen',
  //   component: SellManagementScreen,
  // },
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
    name: 'MapLocateEstate',
    component: MapLocateEstate,
  },
  {
    name: 'AdminManageLeaseScreen',
    component: AdminManageLeaseScreen,
  },
  {
    name: 'AdminManageTourScreen',
    component: AdminManageTourScreen,
  },
  {
    name: 'RoomManageScreen',
    component: RoomManageScreen,
  },
  {
    name: 'TicketManageScreen',
    component: TicketManageScreen,
  },
  {
    name: 'DetailRoomManageScreen',
    component: DetailRoomManageScreen,
  },
  {
    name: 'PolicyManageScreen',
    component: PolicyManageScreen,
  },
  // {
  //   name: 'AddRoomTypeScreen',
  //   component: AddRoomTypeScreen,
  // },
  // {
  //   name: 'AddPolicyScreen',
  //   component: AddPolicyScreen,
  // },
  {
    name: 'SelectDefaultCountryScreen',
    component: SelectDefaultCountryScreen,
  },
  {
    name: 'ListBankScreen',
    component: ListBankScreen,
  },
  {
    name: 'AddTicketScreen',
    component: AddTicketScreen,
  },

  {
    name: 'FeaturesPolicyScreen',
    component: FeaturesPolicyScreen,
  },
  {
    name: 'SelectLanguageScreen',
    component: SelectLanguageScreen,
  },
  // {
  //   name: 'PolicyToRoomScreen',
  //   component: PolicyToRoomScreen,
  // },
  {
    name: 'VoucherManageScreen',
    component: VoucherManageScreen,
  },
  {
    name: 'AddVoucherScreen',
    component: AddVoucherScreen,
  },
  {
    name: 'HomeListVoucherScreen',
    component: HomeListVoucherScreen,
  },
  {
    name: 'BuyVoucherScreen',
    component: BuyVoucherScreen,
  },
  {
    name: 'WithdrawTokenScreen',
    component: WithdrawTokenScreen,
  },
  {
    name: 'HistoryTokenDataScreen',
    component: HistoryTokenDataScreen,
  },
  {
    name: 'DepositTokenScreen',
    component: DepositTokenScreen,
  },
  {
    name: 'DetailTokenScreen',
    component: DetailTokenScreen,
  },
  {
    name: 'HelpCenterTokenScreen',
    component: HelpCenterTokenScreen,
  },
  {
    name: 'QRScanDetailScreen',
    component: QRScanDetailScreen,
  },
  {
    name: 'CheckInSuccessScreen',
    component: CheckInSuccessScreen,
  },
  {
    name: 'PostVideoShortReviewScreen',
    component: PostVideoShortReviewScreen,
  },
  {
    name: 'PostVideoShortScreen',
    component: PostVideoShortScreen,
  },
  {
    name: 'DetailReviewScreen',
    component: DetailReviewScreen,
  },
  {
    name: 'DetailReviewTourScreen',
    component: DetailReviewTourScreen,
  },
  {
    name: 'ManageVideoShortScreen',
    component: ManageVideoShortScreen,
  },
  {
    name: 'DetailVideoShortScreen',
    component: DetailVideoShortScreen,
    options: {contentStyle: {backgroundColor: '#000'}, headerShown: false},
  },
  {
    name: 'TicketTypeManageScreen',
    component: TicketTypeManageScreen,
  },
  {
    name: 'AddTypeTicketScreen',
    component: AddTypeTicketScreen,
  },
  {
    name: 'BookingTourConfirmScreen',
    component: BookingTourConfirmScreen,
  },
  {
    name: 'ChatBoxScreen',
    component: ChatBoxScreen,
  },
  {
    name: 'ListChatGroupScreen',
    component: ListChatGroupScreen,
  },
  {
    name: 'DailyCheckinScreen',
    component: DailyCheckinScreen,
  },
  {
    name: 'RoomPriceManageScreen',
    component: RoomPriceManageScreen,
  },
  {
    name: 'TicketPriceManageScreen',
    component: TicketPriceManageScreen,
  },
  {
    name: 'RepostExpiredScreen',
    component: RepostExpiredScreen,
  },
];
