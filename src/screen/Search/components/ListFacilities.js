import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconApartment} from '../../../assets/icon/Icon';
import CustomText from '../../../components/CustomText';
import {SIZES, scale} from '../../../assets/constants';

export default function ListFacilities({accom_type}) {
  return (
    <ScrollView horizontal>
      <View
        style={{
          height: scale(30),
          flexDirection: 'row',
          columnGap: scale(10),
          alignItems: 'center',
        }}>
        <CustomText textType="semiBold" style={{fontSize: SIZES.xSmall}}>
          {accom_type?.name}
        </CustomText>
        {[...Array(3)].map(item => (
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(3),
              alignItems: 'center',
            }}>
            <IconApartment
              style={{
                height: scale(16),
                width: scale(16),
              }}
            />
            <CustomText style={{fontSize: SIZES.xSmall}}>
              dayla tien nghi
            </CustomText>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
