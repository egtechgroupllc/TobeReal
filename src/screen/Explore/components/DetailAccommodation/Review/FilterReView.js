import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconSort} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import OptionAccommodation from '../../FindAccommodation/OptionAccommodation';

export default function FilterReView({onSort, sort}) {
  return (
    <View
      style={{
        // height: scale(30),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: scale(12),
        paddingVertical: scale(4),
      }}>
      <OptionAccommodation
        outline
        isSelectOnly
        styleWrapper={{
          alignItems: 'flex-start',
          paddingRight: scale(12),
        }}
        styleOption={{
          height: scale(30),
        }}
        onSelect={() => {
          // bottomSheetRef.current.expand();
        }}
        data={[
          {
            text: 'All',
          },
          {
            text: 'Have pictures',
          },
        ]}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onSort}
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: scale(6),
          paddingHorizontal: scale(10),
          paddingVertical: scale(4),
          alignItems: 'center',
          rowGap: scale(3),
          minWidth: scale(100),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(4),
          }}>
          <IconSort
            style={{
              width: scale(14),
              height: scale(14),
            }}
          />
          <CustomText style={{fontSize: SIZES.xSmall}}>Sort by</CustomText>
        </View>
        <CustomText
          textType="semiBold"
          style={{fontSize: SIZES.xSmall, color: COLORS.primary}}>
          {sort}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
