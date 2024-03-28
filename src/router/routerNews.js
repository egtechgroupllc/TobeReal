import {NewsScreen} from '../screen/News';
import {PostNewsScreen} from '../screen/News/PostNews';

import {ContractScreen} from '../screen/News/PostNews/Contract';
import {LeaseScreen, PostNewLeaseScreen} from '../screen/News/PostNews/Lease';
import {AddRoomTypeScreen} from '../screen/News/PostNews/Lease/AddRoomType';
import {
  PostConfigurationScreen,
  SellScreen,
} from '../screen/News/PostNews/Sell';
import {PostNewTourScreen, TourScreen} from '../screen/News/PostNews/Tour';

export default routerNews = [
  {
    name: 'NewsScreen',
    component: NewsScreen,
  },
  {
    name: 'PostNewsScreen',
    component: PostNewsScreen,
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
    name: 'AddRoomTypeScreen',
    component: AddRoomTypeScreen,
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
];
