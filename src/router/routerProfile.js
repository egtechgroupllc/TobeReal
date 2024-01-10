import {ProfileScreen} from '../screen/Profile';
import { ChangePasswordScreen } from '../screen/Profile/ChangePassword';
import CustomerManagementScreen from '../screen/Profile/CustomerManagement/CustomerManagementScreen';
import {InformationScreen} from '../screen/Profile/Information';
import { NewsSavedScreen } from '../screen/Profile/NewsSaved';
import PostManagementScreen from '../screen/Profile/PostManagement/PostManagement';
import { PriceListScreen } from '../screen/Profile/PriceList';
import { TradingFloorScreen } from '../screen/Profile/TradingFloor';

export default routerProfile = [
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
  },
  {
    name: 'InformationScreen',
    component: InformationScreen,
  },
  {
    name: 'ChangePasswordScreen',
    component: ChangePasswordScreen,
  },
  {
    name: 'NewsSavedScreen',
    component: NewsSavedScreen,
  },
  {
    name: 'PostManagementScreen',
    component: PostManagementScreen,
  },
  {
    name: 'CustomerManagementScreen',
    component: CustomerManagementScreen,
  },
  {
    name: 'TradingFloorScreen',
    component: TradingFloorScreen,
  },
  {
    name: 'PriceListScreen',
    component: PriceListScreen,
  },
];
