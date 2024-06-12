import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {postBookingRoom, postPaypal} from '../../../../Model/api/apiAccom';
import {
  COLORS,
  SIZES,
  animations,
  images,
  scale,
} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import {
  IconCoinPoint,
  IconSupporterYellow,
  IconX,
} from '../../../../assets/icon/Icon';
import {CustomButton} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatPrice} from '../../../../utils/format';
import DetailPriceRoom from './ContentStep1/DetailPriceRoom';
import TopStep2 from './ContentStep2/TopStep2';
import CustomImage from '../../../../components/CustomImage';
import LottieView from 'lottie-react-native';
import ModalBookingSuccess from './ContentStep2/ModalBookingSuccess';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {check} from 'react-native-permissions';
import {useCountdown} from '../../../../hooks/useCountdown';
export default function ContentStep2({data}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const [contact, setContact] = useState([]);
  const [typePayment, setTypePayment] = useState();
  const insets = useSafeAreaInsets();
  const policyId = data?.accommodation_policies[0]?.id;
  const queryClient = useQueryClient();
  const [openContact, setOpenContact] = useState(false);
  const [check, setCheck] = useState(false);

  const bookingRoomMu = useMutation({
    mutationFn: postBookingRoom,
  });
  const {start, countdown} = useCountdown(10);

  useEffect(() => {
    const loadInfoBooking = async () => {
      const result = await EncryptedStorage.getItem('@infoBooking');
      setContact(JSON.parse(result));
    };
    loadInfoBooking();
  }, []);
  const paypalMutation = useMutation({
    mutationFn: postPaypal,
  });
  const handlePaypal = value => {
    paypalMutation.mutate(
      {
        id: value,
        type: 'ROOM',
      },
      {
        onSuccess: dataInside => {
          Linking.openURL(dataInside?.data?.links[1].href);
          navigate('Booking', {
            screen: 'HomeBookingsScreen',
          });
        },
        onError: err => {
          console.log(err);
        },
      },
    );
  };
  const isPending = useRef(false);
  const handleBookingRoom = value => {
    if (!typePayment) {
      showMess(t('please_select_payment'), 'error');
      return;
    }
    setOpenContact(true);
    setTimeout(() => {
      // setOpenContact(false);
      bookingRoomMu.mutate(
        {
          check_in_date: data?.date?.selectedStartDate,
          check_out_date: data?.date?.selectedEndDate,
          number_room: data?.numRoomSelect,
          accommodation_policy_id: policyId, //id của chính sách liên kết với phòng đó
          room_id: data?.id, //id của phòng
          contact_name: contact?.username,
          contact_email: contact?.email,
          contact_phone: contact?.phone,
          // payment: typePayment,
        },
        {
          onSuccess: dataInside => {
            isPending.current = true;
            setCheck({
              status: dataInside?.status,
              mess: dataInside?.message,
            });
            start();
            // showMess(
            //   dataInside?.message,
            //   dataInside?.status ? 'success' : 'error',
            // );

            setTimeout(
              () => {
                setOpenContact(false);

                if (dataInside?.status) {
                  queryClient.invalidateQueries([
                    'accommodation',
                    'detail',
                    'list-room',
                    data?.idAccom,
                  ]);
                  queryClient.invalidateQueries(['user', 'profile']);
                  if (dataInside?.data?.payment === 'PAYPAL') {
                    handlePaypal(dataInside?.data?.id);
                    return;
                  }
                  navigate('Booking', {
                    screen: 'HomeBookingsScreen',
                  });
                }
              },
              dataInside?.status === false ? 3000 : 10000,
            );
          },
          onError: err => {
            console.log({err});
          },
        },
      );
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <TopStep2 data={data} onChange={value => setTypePayment(value?.type)} />
      <Modal
        isVisible={openContact}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <View style={styles.contact}>
          <LinearGradient
            colors={['#FFE55A', '#F0B90B']}
            start={{x: 1.2, y: 0}}
            end={{x: 0, y: 0}}
            style={styles.contactHeader}>
            <IconSupporterYellow height={scale(20)} width={scale(20)} />
            <CustomText
              style={{
                fontSize: SIZES.small,
                color: COLORS.black,
              }}
              textType="bold">
              {t('notification')}
            </CustomText>
          </LinearGradient>
          <View style={styles.listContact}>
            {!isPending.current ? (
              <LottieView
                autoPlay={true}
                source={animations.pending}
                style={{
                  height: scale(150),
                  width: scale(150),
                }}
                resizeMode="contain"
              />
            ) : (
              <>
                {!check?.status ? (
                  <LottieView
                    autoPlay={true}
                    source={animations.failed}
                    style={{
                      height: scale(70),
                      width: scale(70),
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <CustomImage
                    source={animations.success}
                    style={{
                      height: scale(70),
                      width: scale(70),
                    }}
                    resizeMode="contain"
                  />
                )}
                <CustomText
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: scale(20),
                  }}
                  textType="bold">
                  {check?.mess}!
                </CustomText>
                {check?.status && (
                  <>
                    <CustomText
                      textType="bold"
                      style={{
                        alignSelf: 'center',
                        marginTop: scale(5),
                      }}>
                      0.5 TBC
                    </CustomText>
                    <CustomText
                      style={{
                        alignSelf: 'center',
                        marginTop: scale(5),
                      }}>
                      Congratulations on receiving TBC coin!
                    </CustomText>
                    <CustomText
                      style={{
                        alignSelf: 'center',
                        marginTop: scale(5),
                        paddingBottom: scale(20),
                        textAlign: 'center',
                        color: COLORS.textSub,
                      }}>
                      You will automatic transfer {'\n'} into booking history
                      screen in {'\n'} ... {countdown}s
                    </CustomText>
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
      <View style={{...styles.footer, marginBottom: scale(10) + insets.bottom}}>
        <View style={styles.boxDetailPrice}>
          <DetailPriceRoom data={data} />
          <CustomText textType="semiBold">
            {data?.name} ({data?.room_bed_type?.name}),{data?.numRoomSelect}x
          </CustomText>
          <CustomButton text={t('pay')} onPress={handleBookingRoom} />
        </View>

        <View style={styles.boxEarnPoint}>
          <IconCoinPoint />
          <CustomText color={COLORS.black} textType="semiBold">
            {formatPrice(12312, {showCurrency: false})} {t('point')}
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  footer: {
    backgroundColor: COLORS.subPrimary,
    marginTop: 'auto',
    marginHorizontal: scale(10),
    borderRadius: scale(6),
  },
  boxDetailPrice: {
    backgroundColor: '#fff',
    borderRadius: scale(6),
    rowGap: scale(16),
    padding: scale(20),
  },
  boxEarnPoint: {
    padding: scale(12),
    flexDirection: 'row',
    columnGap: scale(6),
    alignItems: 'center',
  },
  contact: {
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contactHeader: {
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(20),
    width: '100%',
  },
  listContact: {
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: '100%',
    minHeight: scale(120),
  },
});
