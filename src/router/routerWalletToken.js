import {AddressWalletScreen} from '../screen/Profile';
import {
  ImportAddressWalletScreen,
  WalletTokenScreen,
} from '../screen/WalletToken';

export default routerWalletToken = [
  {
    name: 'AddressWalletScreen',
    component: AddressWalletScreen,
  },
  {
    name: 'WalletTokenScreen',
    component: WalletTokenScreen,
  },
  {
    name: 'ImportAddressWalletScreen',
    component: ImportAddressWalletScreen,
  },
];
