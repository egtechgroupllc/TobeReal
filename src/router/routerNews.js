import {NewsScreen} from '../screen/News';
import {PostNewsScreen} from '../screen/News/PostNews';

import {ContractScreen} from '../screen/News/PostNews/Contract';
import {
  AddPolicyScreen,
  FeaturesPolicyScreen,
  LeaseScreen,
  PostNewLeaseScreen,
} from '../screen/News/PostNews/Lease';
import {AddRoomTypeScreen} from '../screen/News/PostNews/Lease/AddRoomType';
import AdminManageLeaseScreen from '../screen/News/PostNews/Lease/AdminManageLeaseScreen';
import PolicyManageScreen from '../screen/News/PostNews/Lease/components/AdminAccom/PolicyManage/PolicyManageScreen';
import DetailRoomManageScreen from '../screen/News/PostNews/Lease/components/AdminAccom/RoomManage/DetailRoomManageScreen';
import RoomManageScreen from '../screen/News/PostNews/Lease/components/AdminAccom/RoomManage/RoomManageScreen';
import {
  PostConfigurationScreen,
  PostNewSellScreen,
  SellScreen,
} from '../screen/News/PostNews/Sell';
import {
  AddTicketScreen,
  PostNewTourScreen,
  TourScreen,
} from '../screen/News/PostNews/Tour';

export default routerNews = [
  // {
  //   name: 'NewsScreen',
  //   component: NewsScreen,
  // },
  {
    name: 'PostNewsScreen',
    component: PostNewsScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SellScreen',
    component: SellScreen,
  },
  {
    name: 'LeaseScreen',
    component: LeaseScreen,
  },
  {
    name: 'PostNewLeaseScreen',
    component: PostNewLeaseScreen,
  },
  {
    name: 'TourScreen',
    component: TourScreen,
  },

  {
    name: 'ContractScreen',
    component: ContractScreen,
  },
  {
    name: 'PostNewTourScreen',
    component: PostNewTourScreen,
  },
  {
    name: 'PostConfigurationScreen',
    component: PostConfigurationScreen,
  },
  {
    name: 'AddTicketScreen',
    component: AddTicketScreen,
  },
  {
    name: 'PostNewSellScreen',
    component: PostNewSellScreen,
  },

  {
    name: 'FeaturesPolicyScreen',
    component: FeaturesPolicyScreen,
  },
];
