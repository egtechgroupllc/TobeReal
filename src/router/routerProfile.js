import {ProfileScreen} from '../screen/Profile';
import {ChangePasswordScreen} from '../screen/Profile/ChangePassword';
import {CustomersBuyScreen} from '../screen/Profile/Client/CustomersBuy';
import {CustomersRentScreen} from '../screen/Profile/Client/CustomersRent';
import CustomerManagementScreen from '../screen/Profile/CustomerManagement/CustomerManagementScreen';
import {ListOfCustomersScreen} from '../screen/Profile/CustomerManagement/ListOfCustomers';
import {DepositWithdrawScreen} from '../screen/Profile/FinancialManagement/DepositWithdraw';
import {AddBankScreen} from '../screen/Profile/FinancialManagement/DepositWithdraw/AddBank';

import FinancialScreen from '../screen/Profile/FinancialManagement/FinancialScreen';
import {InformationScreen} from '../screen/Profile/Information';
import {NewsSavedScreen} from '../screen/Profile/NewsSaved';
import PostManagementScreen from '../screen/Profile/PostManagement/PostManagement';
import {PriceListScreen} from '../screen/Profile/PriceList';
import {RegisterAccountTypeScreen} from '../screen/Profile/RegisterAccountType';
import {SelectLanguageScreen} from '../screen/Profile/SelectLanguage';
import {TradingFloorScreen} from '../screen/Profile/TradingFloor';
import {CreateTradingScreen} from '../screen/Profile/TradingFloor/CreateTradingFloor';
import {HomeWishListScreen} from '../screen/WishList';

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
    options: {
      headerShown: true,
    },
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
  {
    name: 'CreateTradingScreen',
    component: CreateTradingScreen,
  },
  {
    name: 'SelectLanguageScreen',
    component: SelectLanguageScreen,
    options: {
      headerShown: true,
    },
  },
  {
    name: 'HomeWishListScreen',
    component: HomeWishListScreen,
  },
  {
    name: 'RegisterAccountTypeScreen',
    component: RegisterAccountTypeScreen,
  },
];
