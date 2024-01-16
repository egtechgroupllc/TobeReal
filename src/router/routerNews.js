import { NewsScreen } from "../screen/News";
import { PostNewsScreen } from "../screen/News/PostNews";
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
];
