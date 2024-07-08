/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../../../../../../assets/constants';
import DetailAccommoMap from '../../../../../../Explore/components/DetailAccommodation/Detail/DetailAccommoMap';
import CustomText from '../../../../../../../components/CustomText';
import {useLanguage} from '../../../../../../../hooks/useLanguage';

export default function EstateSetMap({onChange, watch = () => {}, address}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();

  const [dataFromScreen, setDataFromScreen] = useState(null);

  useEffect(() => {
    if (watch('latitude') && watch('longitude')) {
      setDataFromScreen({
        latitude: watch('latitude'),
        longitude: watch('longitude'),
      });
    }
  }, [watch('latitude'), watch('longitude')]);

  return (
    <TouchableOpacity
      style={{width: '100%'}}
      activeOpacity={0.7}
      onPress={() => {
        navigate('NoBottomTab', {
          screen: 'MapSetAccomdScreen',
          params: {
            onGoBack: data => {
              setDataFromScreen(data);
              onChange && onChange(data);
            },
            region: dataFromScreen,
          },
        });
      }}>
      <DetailAccommoMap
        disable
        address={address ? address : t('address')}
        region={dataFromScreen}
        styleWrapper={{
          marginHorizontal: scale(0),
        }}
        isShowNearby={false}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
