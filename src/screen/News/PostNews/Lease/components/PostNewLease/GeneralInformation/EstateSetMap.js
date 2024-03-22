import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Map from '../../../../../../Explore/components/DetailAccommodation/Map';

export default function EstateSetMap({onChange}) {
  const {navigate, setParams} = useNavigation();
  const [dataFromScreen, setDataFromScreen] = useState(null);

  return (
    <TouchableOpacity
      style={{width: '110%'}}
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
      <Map
        region={{
          latitude: dataFromScreen?.latitude,
          longitude: dataFromScreen?.longitude,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
