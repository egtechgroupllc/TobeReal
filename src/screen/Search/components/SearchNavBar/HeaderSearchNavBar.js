import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {useLanguage} from '../../../../hooks/useLanguage';
import CustomText from '../../../../components/CustomText';
import {SIZES, scale} from '../../../../assets/constants';
import {formatDate} from '../../../../utils/format';
import {differenceInDays} from 'date-fns';
import {CustomButton} from '../../../../components';

const HeaderSearchNavBar = ({data, onPress}) => {
  const {t} = useLanguage();

  return (
    <View
      style={{
        width: '90%',
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: '70%',
        }}>
        <CustomText
          textType="bold"
          numberOfLines={1}
          style={{
            color: '#fff',
            fontSize: SIZES.xMedium,
          }}>
          {data?.province?.name || t('near_me')}
        </CustomText>
        <CustomText
          numberOfLines={2}
          style={{
            color: '#fff',
          }}>
          {`${formatDate(data?.date?.date_end)}, ${differenceInDays(
            data?.date?.date_end,
            data?.date?.date_start,
          )} ${t('night')}, ${data?.numAdult} ${t('guest')}, ${
            data?.numRoom
          } ${t('room')}`}
        </CustomText>
      </View>
      <CustomButton
        text="Thay đổi"
        style={{flex: 1, height: scale(30)}}
        onPress={onPress}
      />
    </View>
  );
};

export default memo(HeaderSearchNavBar);
const styles = StyleSheet.create({});
