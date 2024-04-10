/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../../../../../../assets/constants';
import DetailAccommoMap from '../../../../../../Explore/components/DetailAccommodation/DetailAccommoMap';

export default function EstateSetMap({onChange, watch = () => {}}) {
  const {navigate} = useNavigation();

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
        address={
          '333 Soi Phahonyathin 34, Senanikhom, Sena Nikhom, Chatuchak, Bangkok, Thailand, 10900'
        }
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
