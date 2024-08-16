import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  IconChat,
  IconPhone,
  LogoLine,
  LogoMessageFB,
  LogoZalo,
} from '../../../../../../../assets/icon/Icon';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../../../../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {useAuthentication} from '../../../../../../../hooks/useAuthentication';
import {useMutation} from '@tanstack/react-query';
import {postCreateGroupChat} from '../../../../../../../Model/api/common';
import {showMess} from '../../../../../../../assets/constants/Helper';
import {useLoading} from '../../../../../../../hooks/useLoading';
import Communications from 'react-native-communications';
import {useLanguage} from '../../../../../../../hooks/useLanguage';

export default function Contact({data}) {
  const {navigate, setOptions} = useNavigation();
  const {token} = useAuthentication();
  const {stopLoading, setLoading} = useLoading();
  const {t} = useLanguage();

  const postCreateGroup = useMutation({
    mutationFn: postCreateGroupChat,
  });

  useEffect(() => {
    stopLoading();

    return () => {
      return setLoading(true);
    };
  }, []);
  const handlePostCreateGroupChat = value => {
    postCreateGroup.mutate(
      {
        data: {
          user_id: data?.user_id,
        },
        token: token,
      },
      {
        onSuccess: dataInside => {
          if (dataInside?.status) {
            navigate('ChatBoxScreen', {
              chat_group_id: dataInside?.data?.id,
              data,
            });
          } else {
            showMess(
              t(dataInside?.message),
              dataInside?.status ? 'success' : 'error',
            );
          }
        },
        onError: err => {
          console.log({err});
        },
      },
    );
  };

  const handleChat = () => {
    if (!token) {
      navigate('NavigationAuth', {screen: 'LoginScreen'});
    } else {
      handlePostCreateGroupChat();
    }
  };

  const handleCall = () => {
    Communications.phonecall(data?.contact_phone, true);
  };

  const dataItem = [
    {
      name: 'Call',
      icon: <IconPhone fill={COLORS.white} />,
      onPress: handleCall,
    },
    {
      name: 'Chat',
      icon: <IconChat fill={COLORS.white} />,
      onPress: handleChat,
    },
  ];

  return (
    <View style={styles.container}>
      {dataItem.map((item, index) => (
        <TouchableOpacity key={index} onPress={item?.onPress}>
          <LinearGradient
            colors={['#FFE55A', '#F0B90B']}
            start={{x: 0, y: 1.5}}
            end={{x: 0, y: 0}}
            style={{...styles.button}}>
            {item.icon}
            <CustomText
              textType="bold"
              style={{
                fontSize: SIZES.xSmall,
                color: COLORS.white,
              }}>
              {item.name}
            </CustomText>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: scale(10),
  },
  button: {
    columnGap: scale(10),
    borderRadius: scale(5),
    flexDirection: 'row',
    minWidth: scale(140),
    height: scale(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
