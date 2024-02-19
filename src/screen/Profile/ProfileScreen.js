import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import MainAuth from '../../components/MainAuth';
import {useAuthentication} from '../../hooks/useAuthentication';
import AvatarImage from './components/AvatarImage';
import Bottom from './components/Bottom';
import Content from './components/Content';
import HeaderAvatar from './components/HeaderAvatar';

export default function ProfileScreen() {
  const upgrade = () => {};

  // const {token} = useAuthentication();
  const {navigate, goBack} = useNavigation();
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     if (!token) {
//       navigate('NavigationAuth');
//       if(!isFocused ){
//         goBack()
//       }
//     }
// console.log(token,3213,isFocused);
//   }, [isFocused,token]);

  return (
    <MainAuth>
      <HeaderAvatar noti={true} notify={goBack} heading={'Profile'} />
      <AvatarImage upgrade={true} name={'John'} onPressUpgrade={upgrade} />
      <Content />
      <Bottom />
    </MainAuth>
  );
}
