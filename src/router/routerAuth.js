import ForgotPasswordScreen from "../screen/Auth/ForgotPassword/ForgotPasswordScreen";
import { LoginScreen } from "../screen/Auth/Login";
import { RegisterScreen } from "../screen/Auth/Register";
import VerifyEmailScreen from "../screen/Auth/VerifyEmail/VerifyEmailScreen";

export default routerAuth=[
    {
      name: 'LoginScreen',
      component: LoginScreen,
    },
    {
        name: 'RegisterScreen',
        component: RegisterScreen,
      },
      {
        name: 'VerifyEmailScreen',
        component: VerifyEmailScreen,
      },
      {
        name: 'ForgotPasswordScreen',
        component: ForgotPasswordScreen,
      },
  ];
  