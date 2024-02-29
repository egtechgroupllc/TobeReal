import { NewsScreen } from "../screen/News";
import { PostNewsScreen } from "../screen/News/PostNews";
import { AddRoomTypeScreen } from "../screen/News/PostNews/Lease/AddRoomType";
import LeaseScreen from "../screen/News/PostNews/Lease/LeaseScreen";
import { SellScreen } from "../screen/News/PostNews/Sell";
import TourScreen from "../screen/News/PostNews/Tour/TourScreen";


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
    name: 'TourScreen',
    component: TourScreen,
  },
  {
    name: 'AddRoomTypeScreen',
    component: AddRoomTypeScreen,
  },
];
