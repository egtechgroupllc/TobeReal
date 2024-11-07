import CountryScreen from '~/components/Country/CountryScreen';
import {ForgotPasswordScreen} from '~/screens/Auth/ForgotPassword';
import {LoginScreen} from '~/screens/Auth/Login';
import {RegisterScreen} from '~/screens/Auth/Register';

export default routerAuth = [
  {
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    name: 'RegisterScreen',
    component: RegisterScreen,
  },

  {
    name: 'ForgotPasswordScreen',
    component: ForgotPasswordScreen,
  },
  {
    name: 'CountryScreen',
    component: CountryScreen,
    options: {
      headerShown: true,
    },
  },
];
