import {
  AddressWalletScreen,
  ImportAddressWalletScreen,
  ShowPrivateKeyAndSecretPhrase,
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
  {
    name: 'ShowPrivateKeyAndSecretPhrase',
    component: ShowPrivateKeyAndSecretPhrase,
  },
];
