import {ProfileScreen} from '../screen/Profile';
import { ChangePasswordScreen } from '../screen/Profile/ChangePassword';
import { CustomersBuyScreen } from '../screen/Profile/Client/CustomersBuy';
import { CustomersRentScreen } from '../screen/Profile/Client/CustomersRent';
import CustomerManagementScreen from '../screen/Profile/CustomerManagement/CustomerManagementScreen';
import { ListOfCustomersScreen } from '../screen/Profile/CustomerManagement/ListOfCustomers';
import { DepositWithdrawScreen } from '../screen/Profile/FinancialManagement/DepositWithdraw';
import { AddBankScreen } from '../screen/Profile/FinancialManagement/DepositWithdraw/AddBank';

import FinancialScreen from '../screen/Profile/FinancialManagement/FinancialScreen';
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
  {
    name: 'FinancialScreen',
    component: FinancialScreen,
  },
  {
    name: 'ListOfCustomersScreen',
    component: ListOfCustomersScreen,
  },
  {
    name: 'CustomersBuyScreen',
    component: CustomersBuyScreen,
  },
  {
    name: 'CustomersRentScreen',
    component: CustomersRentScreen,
  },
  {
    name: 'DepositWithdrawScreen',
    component: DepositWithdrawScreen,
  },
  {
    name: 'AddBankScreen',
    component: AddBankScreen,
  },
];
