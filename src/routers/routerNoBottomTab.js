import CountryScreen from '~/components/Country/CountryScreen';
import CurrencyScreen from '~/components/Currency/CurrencyScreen';
import EditorScreen from '~/components/Editor/EditorScreen';
import CheckinSuccessScreen from '~/screens/Appointment/Doctor/Working/Manage/CheckinSuccessScreen';
import ManageDateWorkingScreen from '~/screens/Appointment/Doctor/Working/Manage/Date/ManageDateWorkingScreen';
import MedicalScheduleInfoScreen from '~/screens/Appointment/Doctor/Working/Manage/Information/MedicalScheduleInfoScreen';
import AddPriceExamScreen from '~/screens/Appointment/Doctor/Working/Manage/Price/AddPriceExamScreen';
import AddServicePriceScreen from '~/screens/Appointment/Doctor/Working/Manage/Price/AddServicePriceScreen';
import ManagePriceExamScreen from '~/screens/Appointment/Doctor/Working/Manage/Price/ManagePriceExamScreen';
import ManageServicePrice from '~/screens/Appointment/Doctor/Working/Manage/Price/ManageServicePrice';
import ManageTimeMakerScreen from '~/screens/Appointment/Doctor/Working/Manage/Time/ManageTimeMakerScreen';
import ManageTimeWorkingScreen from '~/screens/Appointment/Doctor/Working/Manage/Time/ManageTimeWorkingScreen';
import CreateVoucherDoctorScreen from '~/screens/Appointment/Doctor/Working/Manage/Voucher/CreateVoucherDoctorScreen';
import ManageVoucherDoctorScreen from '~/screens/Appointment/Doctor/Working/Manage/Voucher/ManageVoucherDoctorScreen';
import WorkManageScreen from '~/screens/Appointment/Doctor/Working/WorkManageScreen';
import BookAppointmentScreen from '~/screens/Appointment/User/BookAppointment/BookAppointmentScreen';
import ListFacilityScreen from '~/screens/Appointment/User/ListFacilityScreen';
import ListSpecialtyScreen from '~/screens/Appointment/User/ListSpecialtyScreen';
import CreateReviewScreen from '~/screens/Appointment/User/Schedule/CreateReviewScreen';
import DetailHistoryAppointScreen from '~/screens/Appointment/User/Schedule/DetailHistoryAppointScreen';
import DetailScheduleScreen from '~/screens/Appointment/User/Schedule/DetailScheduleScreen';
import ScheduleAppointmentScreen from '~/screens/Appointment/User/Schedule/ScheduleAppointmentScreen';
import VerifyLoginScreen from '~/screens/Auth/VerifyLogin/VerifyLoginScreen';
import CooperateRegisterScreen from '~/screens/Home/Cooperate/ManageCooperate/CooperateRegisterScreen';
import ManageCooperateScreen from '~/screens/Home/Cooperate/ManageCooperate/ManageCooperateScreen';
import CreateMedicalFacilityScreen from '~/screens/Home/Cooperate/MedicalFacility/CreateMedicalFacilityScreen';
import ManageFacilityScreen from '~/screens/Home/Cooperate/MedicalFacility/ManageFacilityScreen';
import DetailFacilityScreen from '~/screens/Home/DetailMedical/DetailFacilityScreen';
import DetailSpecialtyScreen from '~/screens/Home/DetailMedical/DetailSpecialtyScreen';
import {DoctorListScreen} from '~/screens/Home/DoctorList/DoctorListScreen';
import ShopRegisterScreen from '~/screens/Products/CooperateShop/AuthShop/ShopRegisterScreen';
import CooperateShopManage from '~/screens/Products/CooperateShop/CooperateShopManage';
import DetailProductScreen from '~/screens/Products/DetailProduct/DetailProductScreen';
import DetailShopScreen from '~/screens/Products/DetailShop/DetailShopScreen';
import SeeAllProductScreen from '~/screens/Products/ListProduct/SeeAllProductScreen';
import SeeAllShopScreen from '~/screens/Products/ListProduct/SeeAllShopScreen';
import BuyVoucherScreen from '~/screens/Products/PaymentProduct/components/ContentStep2/Voucher/components/BuyVoucherScreen';
import HomeListVoucherScreen from '~/screens/Products/PaymentProduct/components/ContentStep2/Voucher/HomeListVoucherScreen';
import ListPaymentMethodsScreen from '~/screens/Products/PaymentProduct/ListPaymentMethodsScreen';
import PaymentProductScreen from '~/screens/Products/PaymentProduct/PaymentProductScreen';
import ShoppingCartScreen from '~/screens/Products/ShoppingCart/ShoppingCartScreen';
import {ChangePasswordScreen} from '~/screens/Profile';
import AccountAndSecurityScreen from '~/screens/Profile/Account&Security/AccountAndSecurityScreen';
import ChangeAccountScreen from '~/screens/Profile/ChangeAccountScreen';
import ChangeAvatarScreen from '~/screens/Profile/ChangeAvatarScreen';
import {
  ConfirmDepositScreen,
  DepositScreen,
  DetailHistoryDeposit,
  FinancialScreen,
} from '~/screens/Profile/FinancialManagement';
import ListBankScreen from '~/screens/Profile/FinancialManagement/Withdraw/ListBankScreen';
import {InformationScreen} from '~/screens/Profile/Information';
import ChangeInformationScreen from '~/screens/Profile/Information/ChangeInformationScreen';
import ManageRegisterDoctorScreen from '~/screens/Profile/RegisterDoctor/ManageRegisterDoctorScreen';
import RegisterDoctorScreen from '~/screens/Profile/RegisterDoctor/RegisterDoctorScreen';
import AddRelativeProfileScreen from '~/screens/Profile/Relatives/AddRelativeProfileScreen';
import RelativeScreen from '~/screens/Profile/Relatives/RelativeScreen';
import {SelectLanguageScreen} from '~/screens/Profile/SelectLanguage';
import AnswerScreen from '~/screens/Q&A/AnswerScreen';
import DetailQuestionScreen from '~/screens/Q&A/DetailQuestionScreen';
import MakeQuestionScreen from '~/screens/Q&A/MakeQuestionScreen';
import MyQuestionScreen from '~/screens/Q&A/MyQuestionScreen';
import QuestionDoctorScreen from '~/screens/Q&A/QuestionDoctorScreen';
import {
  AddressWalletScreen,
  ImportAddressWalletScreen,
  ShowPrivateKeyAndSecretPhrase,
  WalletTokenScreen,
} from '~/screens/WalletToken';
import DepositTokenScreen from '~/screens/WalletToken/DepositTokenScreen';
import DetailTokenScreen from '~/screens/WalletToken/DetailTokenScreen';
import HelpCenterTokenScreen from '~/screens/WalletToken/HelpCenterTokenScreen';

// eslint-disable-next-line no-undef
export default routerNoBottomTab = [
  {
    name: 'DetailProductScreen',
    component: DetailProductScreen,
  },
  {
    name: 'PaymentProductScreen',
    component: PaymentProductScreen,
  },
  {
    name: 'ListPaymentMethodsScreen',
    component: ListPaymentMethodsScreen,
  },
  {
    name: 'VerifyLoginScreen',
    component: VerifyLoginScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'CountryScreen',
    component: CountryScreen,
  },
  {
    name: 'SelectLanguageScreen',
    component: SelectLanguageScreen,
  },
  {
    name: 'DoctorListScreen',
    component: DoctorListScreen,
  },
  {
    name: 'MakeQuestionScreen',
    component: MakeQuestionScreen,
  },
  {
    name: 'MyQuestionScreen',
    component: MyQuestionScreen,
  },
  {
    name: 'DetailQuestionScreen',
    component: DetailQuestionScreen,
  },
  {
    name: 'DetailScheduleScreen',
    component: DetailScheduleScreen,
  },
  {
    name: 'BookAppointmentScreen',
    component: BookAppointmentScreen,
  },
  {
    name: 'AccountAndSecurityScreen',
    component: AccountAndSecurityScreen,
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
    name: 'RelativeScreen',
    component: RelativeScreen,
  },
  {
    name: 'AddRelativeProfileScreen',
    component: AddRelativeProfileScreen,
  },
  {
    name: 'ChangeInformationScreen',
    component: ChangeInformationScreen,
  },
  {
    name: 'ChangeAvatarScreen',
    component: ChangeAvatarScreen,
  },
  {
    name: 'CooperateRegisterScreen',
    component: CooperateRegisterScreen,
  },
  {
    name: 'RegisterDoctorScreen',
    component: RegisterDoctorScreen,
  },
  {
    name: 'EditorScreen',
    component: EditorScreen,
  },
  {
    name: 'ListSpecialtyScreen',
    component: ListSpecialtyScreen,
  },
  {
    name: 'ListFacilityScreen',
    component: ListFacilityScreen,
  },
  {
    name: 'ScheduleAppointmentScreen',
    component: ScheduleAppointmentScreen,
  },
  {
    name: 'WorkManageScreen',
    component: WorkManageScreen,
  },
  {
    name: 'ManageDateWorkingScreen',
    component: ManageDateWorkingScreen,
  },
  {
    name: 'ManageTimeWorkingScreen',
    component: ManageTimeWorkingScreen,
  },
  {
    name: 'ManageTimeMakerScreen',
    component: ManageTimeMakerScreen,
  },
  {
    name: 'ManagePriceExamScreen',
    component: ManagePriceExamScreen,
  },
  {
    name: 'AddPriceExamScreen',
    component: AddPriceExamScreen,
  },
  {
    name: 'ManageCooperateScreen',
    component: ManageCooperateScreen,
  },
  {
    name: 'CreateMedicalFacilityScreen',
    component: CreateMedicalFacilityScreen,
  },
  {
    name: 'ShoppingCartScreen',
    component: ShoppingCartScreen,
  },
  {
    name: 'SeeAllProductScreen',
    component: SeeAllProductScreen,
  },
  {
    name: 'SeeAllShopScreen',
    component: SeeAllShopScreen,
  },
  {
    name: 'DetailShopScreen',
    component: DetailShopScreen,
  },
  {
    name: 'ChangeAccountScreen',
    component: ChangeAccountScreen,
  },
  {
    name: 'FinancialScreen',
    component: FinancialScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'AddressWalletScreen',
    component: AddressWalletScreen,
  },
  {
    name: 'WalletTokenScreen',
    component: WalletTokenScreen,
  },
  {
    name: 'ListBankScreen',
    component: ListBankScreen,
  },
  {
    name: 'HelpCenterTokenScreen',
    component: HelpCenterTokenScreen,
  },
  {
    name: 'CooperateShopManage',
    component: CooperateShopManage,
  },
  {
    name: 'ShopRegisterScreen',
    component: ShopRegisterScreen,
  },
  {
    name: 'ManageFacilityScreen',
    component: ManageFacilityScreen,
  },
  {
    name: 'MedicalScheduleInfoScreen',
    component: MedicalScheduleInfoScreen,
  },
  {
    name: 'DetailSpecialtyScreen',
    component: DetailSpecialtyScreen,
  },
  {
    name: 'DetailFacilityScreen',
    component: DetailFacilityScreen,
  },
  {
    name: 'CurrencyScreen',
    component: CurrencyScreen,
  },
  {
    name: 'ManageRegisterDoctorScreen',
    component: ManageRegisterDoctorScreen,
  },
  {
    name: 'AddServicePriceScreen',
    component: AddServicePriceScreen,
  },
  {
    name: 'ManageServicePrice',
    component: ManageServicePrice,
  },
  {
    name: 'CreateReviewScreen',
    component: CreateReviewScreen,
  },
  {
    name: 'DetailHistoryAppointScreen',
    component: DetailHistoryAppointScreen,
  },
  {
    name: 'CheckinSuccessScreen',
    component: CheckinSuccessScreen,
  },
  {
    name: 'ManageVoucherDoctorScreen',
    component: ManageVoucherDoctorScreen,
  },
  {
    name: 'CreateVoucherDoctorScreen',
    component: CreateVoucherDoctorScreen,
  },
  {
    name: 'DepositScreen',
    component: DepositScreen,
  },
  {
    name: 'ConfirmDepositScreen',
    component: ConfirmDepositScreen,
  },
  {
    name: 'DetailHistoryDeposit',
    component: DetailHistoryDeposit,
  },
  {
    name: 'HomeListVoucherScreen',
    component: HomeListVoucherScreen,
  },
  {
    name: 'BuyVoucherScreen',
    component: BuyVoucherScreen,
  },
  {
    name: 'QuestionDoctorScreen',
    component: QuestionDoctorScreen,
  },
  {
    name: 'AnswerScreen',
    component: AnswerScreen,
  },
  {
    name: 'ImportAddressWalletScreen',
    component: ImportAddressWalletScreen,
  },
  {
    name: 'ShowPrivateKeyAndSecretPhrase',
    component: ShowPrivateKeyAndSecretPhrase,
  },
  {
    name: 'DetailTokenScreen',
    component: DetailTokenScreen,
  },
  {
    name: 'DepositTokenScreen',
    component: DepositTokenScreen,
  },
];
