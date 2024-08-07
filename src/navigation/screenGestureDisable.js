import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddRoomTypeScreen} from '../screen/News/PostNews/Lease/AddRoomType';
import {AddPolicyScreen} from '../screen/News/PostNews/Lease';
import PolicyToRoomScreen from '../screen/News/PostNews/Lease/components/AdminAccom/RoomManage/PolicyToRoomScreen';
import {
  PostConfigurationSellScreen,
  SellManagementScreen,
} from '../screen/News/PostNews/Sell';
import {AddTicketScreen} from '../screen/News/PostNews/Tour';

const Stack = createNativeStackNavigator();

export const screenGestureDisable = () => {
  return (
    <>
      <Stack.Screen name="AddRoomTypeScreen" component={AddRoomTypeScreen} />
      <Stack.Screen name="AddPolicyScreen" component={AddPolicyScreen} />
      <Stack.Screen name="PolicyToRoomScreen" component={PolicyToRoomScreen} />
      <Stack.Screen
        name="PostConfigurationSellScreen"
        component={PostConfigurationSellScreen}
      />
      <Stack.Screen
        name="SellManagementScreen"
        component={SellManagementScreen}
      />
      <Stack.Screen name="AddTicketScreen" component={AddTicketScreen} />
    </>
  );
};
