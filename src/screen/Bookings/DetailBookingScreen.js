import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {IconBan, IconPeople, IconRoom, IconWifi} from '../../assets/icon/Icon';
import CustomText from '../../components/CustomText';
import MainWrapper from '../../components/MainWrapper';
import {useLanguage} from '../../hooks/useLanguage';
import ItemUtil from '../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import Contact from './components/DetailBooking/Contact';
import FooterButton from './components/DetailBooking/FooterButton';
import TimeBookingCheckInOut from './components/DetailBooking/TimeBookingCheckInOut';
import TotalPriceBooking from './components/DetailBooking/TotalPriceBooking';
import QRCode from 'react-native-qrcode-svg';
import {CustomButton} from '../../components';
import {postCreateQR} from '../../Model/api/apiAccom';
import {useMutation} from '@tanstack/react-query';

export default function DetailBookingScreen() {
  const {t} = useLanguage();
  const data = useRoute().params;
  console.log(data?.type_payment, 312312321);
  const objAccmo = data?.accommodation;
  const {setOptions} = useNavigation();

  const [isOpen, setIsOpen] = useState(false);
  const [qrCode, setQrCode] = useState([]);
  const createQRMutation = useMutation({
    mutationFn: postCreateQR,
  });
  const handleCreateQR = value => {
    createQRMutation.mutate(
      {bookingId: data?.id},
      {
        onSuccess: dataInside => {
          if (dataInside?.status) {
            setQrCode(dataInside?.data);
          }
        },
        onError: err => {
          console.log(err);
        },
      },
    );
  };
  useEffect(() => {
    handleCreateQR();
  }, []);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('booking_detail'),
    });
  }, []);
  return (
    <>
      <MainWrapper styleContent={styles.wrapper}>
        <View
          style={{
            backgroundColor: COLORS.subPrimary,
            padding: scale(10),
          }}>
          <CustomText textType="bold" size={SIZES.large}>
            {t('booking_detail')}
          </CustomText>
          <CustomText size={SIZES.xMedium} color={COLORS.textSub}>
            {t('booking_code')}: {data?.id}
          </CustomText>
          {data.status && (
            <View
              style={{
                ...styles.boxStatus,
                backgroundColor:
                  data.status === 'SUCCESS'
                    ? '#42b00b'
                    : data.status === 'PENDING'
                    ? COLORS.primary
                    : '#e03c31',
              }}>
              <CustomText
                textType="semiBold"
                color={COLORS.white}
                size={SIZES.xSmall}>
                {data.status}
              </CustomText>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View>
            <CustomText textType="bold" size={SIZES.medium}>
              {objAccmo?.name}
            </CustomText>
            <CustomText>{objAccmo?.address}</CustomText>
          </View>

          <TimeBookingCheckInOut data={data} />

          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(50),
            }}>
            <View style={{rowGap: scale(3)}}>
              <CustomText
                textType="bold"
                size={SIZES.xMedium}
                style={{marginBottom: scale(5)}}>
                ({data?.number_room} {t('room')} - {data?.room?.room_type?.name}
                ){'  '} {data?.room?.name}
              </CustomText>

              <ItemUtil
                Icon={IconPeople}
                value={`${data?.room?.max_occupancy} ${t('guest')}`}
                valueBold
                styleTextValue={styles.textValueUntil}
                styleIcon={styles.iconUntil}
              />
              <ItemUtil
                Icon={IconRoom}
                value={`${data?.room?.room_bed_type?.name}`}
                valueBold
                styleTextValue={styles.textValueUntil}
                styleIcon={styles.iconUntil}
              />
              <ItemUtil
                Icon={IconWifi}
                value={`${t('free_wifi')}`}
                valueBold
                styleTextValue={styles.textValueUntil}
                styleIcon={styles.iconUntil}
              />
            </View>
            {data?.type_payment && data?.type_payment === 'FIAT' && (
              <TouchableOpacity
                onPress={() => setIsOpen(true)}
                style={{flex: 1, alignItems: 'center', rowGap: scale(10)}}>
                {qrCode ? (
                  <QRCode value={JSON.stringify(qrCode)} color="#000" />
                ) : (
                  <ActivityIndicator color={COLORS.primary} size="large" />
                )}
                <CustomText style={{width: scale(150), textAlign: 'center'}}>
                  {t('please_give_qrcode_to')}
                </CustomText>
              </TouchableOpacity>
            )}
          </View>

          <View>
            <CustomText textType="bold" size={SIZES.xMedium}>
              {t('special_request')}
            </CustomText>
            <CustomText
              textType="medium"
              size={SIZES.xMedium}
              color={COLORS.textSub}>
              _
            </CustomText>
          </View>

          <View style={{rowGap: scale(5)}}>
            <CustomText textType="bold" size={SIZES.xMedium}>
              {t('guest_name')}
            </CustomText>
            <CustomText
              textType="medium"
              size={SIZES.xMedium}
              color={COLORS.textSub}>
              {data?.contact_name}
            </CustomText>
          </View>

          <View>
            <ItemUtil
              Icon={IconBan}
              value={`${t('no_refund')}`}
              valueBold
              styleTextValue={styles.textValueUntil}
              styleIcon={styles.iconPolicy}
            />

            <ItemUtil
              Icon={IconBan}
              value={`${t('no_reschedulung')}`}
              valueBold
              styleTextValue={styles.textValueUntil}
              styleIcon={styles.iconPolicy}
            />
          </View>
          <TotalPriceBooking data={data} />
          <Contact data={data} />
        </View>

        <View style={styles.footer}>
          <CustomText
            textType="medium"
            size={SIZES.xMedium}
            color={COLORS.black}
            style={{
              textAlign: 'center',
              paddingTop: scale(12),
              padding: scale(10),
            }}>
            {t('great_choice')}
          </CustomText>
        </View>
      </MainWrapper>
      {data.status !== 'SUCCESS' && <FooterButton />}

      <Modal
        animationType="fade"
        transparent={true}
        visible={!!isOpen}
        onRequestClose={() => setIsOpen(false)}>
        <View style={styles.wrappers}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: '#00000070',
              ...StyleSheet.absoluteFill,
            }}
            onPress={() => setIsOpen(false)}
          />

          <View
            style={{
              padding: scale(10),
              backgroundColor: '#fff',
              borderRadius: scale(10),
              rowGap: scale(10),
            }}>
            <View style={styles.content}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View>
                  {qrCode ? (
                    <QRCode
                      size={scale(220)}
                      value={JSON.stringify(qrCode)}
                      color="#000"
                    />
                  ) : (
                    <ActivityIndicator color={COLORS.primary} size="large" />
                  )}
                </View>
              </View>
            </View>
          </View>

          <CustomButton
            buttonType="normal"
            text={t('close')}
            onPress={() => setIsOpen(false)}
            style={{minWidth: scale(100), marginTop: scale(10)}}
          />
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.subPrimary,
    marginHorizontal: scale(12),
    borderRadius: scale(12),
    overflow: 'hidden',
    paddingBottom: scale(0),
    marginVertical: scale(20),
  },
  wrappers: {
    alignItems: 'center',
    justifyContent: 'center',

    flex: 1,
    rowGap: scale(10),
  },
  content: {
    padding: scale(10),
    rowGap: scale(12),
    backgroundColor: '#fff',
    borderBottomLeftRadius: scale(12),
    borderBottomRightRadius: scale(12),
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  boxStatus: {
    position: 'absolute',
    right: 0,
    borderRadius: scale(3),
    padding: scale(3),
  },
  textValueUntil: {
    fontSize: SIZES.xMedium,
    color: COLORS.text,
  },
  iconUntil: {
    width: scale(16),
    height: scale(16),
  },

  iconPolicy: {
    width: scale(18),
    height: scale(18),
  },

  footer: {},
});
