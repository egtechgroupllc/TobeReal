import {
  AccountAndSecurityScreen,
  ChangePasswordScreen,
  FinancialScreen,
  ProfileScreen,
} from '../screen/Profile';
import ChangeAccountScreen from '../screen/Profile/ChangeAccountScreen';
import ChangeAvatarScreen from '../screen/Profile/ChangeAvatarScreen';
import {CustomersBuyScreen} from '../screen/Profile/Client/CustomersBuy';
import {CustomersRentScreen} from '../screen/Profile/Client/CustomersRent';
import CustomerManagementScreen from '../screen/Profile/CustomerManagement/CustomerManagementScreen';
import {ListOfCustomersScreen} from '../screen/Profile/CustomerManagement/ListOfCustomers';

import {DepositWithdrawScreen} from '../screen/Profile/FinancialManagement/DepositWithdraw';
import {AddBankScreen} from '../screen/Profile/FinancialManagement/DepositWithdraw/AddBank';

import {InformationScreen} from '../screen/Profile/Information';
import ChangeInformationScreen from '../screen/Profile/Information/ChangeInformationScreen';
import {NewsSavedScreen} from '../screen/Profile/NewsSaved';
import PostManagementScreen from '../screen/Profile/PostManagement/PostManagement';
import {PriceListScreen} from '../screen/Profile/PriceList';
import {RegisterAccountTypeScreen} from '../screen/Profile/RegisterAccountType';
import {SelectLanguageScreen} from '../screen/Profile/SelectLanguage';
import {TradingFloorScreen} from '../screen/Profile/TradingFloor';
import {CreateTradingScreen} from '../screen/Profile/TradingFloor/CreateTradingFloor';
import FinancialTokenScreen from '../screen/WalletToken/FinancialTokenScreen';
import {HomeWishListScreen} from '../screen/WishList';

export default routerProfile = [
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
  },
  {
    name: 'HomeWishListScreen',
    component: HomeWishListScreen,
  },
  {
    name: 'RegisterAccountTypeScreen',
    component: RegisterAccountTypeScreen,
  },
  {
    name: 'AccountAndSecurityScreen',
    component: AccountAndSecurityScreen,
  },
  {
    name: 'FinancialScreen',
    component: FinancialScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'FinancialTokenScreen',
    component: FinancialTokenScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ChangeInformationScreen',
    component: ChangeInformationScreen,
  },
  {
    name: 'ChangeAccountScreen',
    component: ChangeAccountScreen,
  },
  {
    name: 'ChangeAvatarScreen',
    component: ChangeAvatarScreen,
  },
];
