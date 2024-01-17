import { NewsScreen } from "../screen/News";
import { PostNewsScreen } from "../screen/News/PostNews";
import LeaseScreen from "../screen/News/PostNews/Lease/LeaseScreen";
import RentBuyScreen from "../screen/News/PostNews/RentBuy/RentBuyScreen";
import { SellScreen } from "../screen/News/PostNews/Sell";


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
    name: 'RentBuyScreen',
    component: RentBuyScreen,
  },
];
