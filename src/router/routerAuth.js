import ForgotPasswordScreen from "../screen/Auth/ForgotPassword/ForgotPasswordScreen";
import { LoginScreen } from "../screen/Auth/Login";
import { RegisterScreen } from "../screen/Auth/Register";

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
        name: 'ForgotPasswordScreen',
        component: ForgotPasswordScreen,
      },
  ];
  