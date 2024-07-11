import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconSort} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import OptionAccommodation from '../../FindAccommodation/OptionAccommodation';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function FilterSort({
  isSelectAll,
  noSelectDefault,
  onSort,
  listFill = [],
  sort,
  text,
}) {
  const {t} = useLanguage();

  return (
    <View style={styles.wrapper}>
      {/* {!!listFill[0] && (
        <OptionAccommodation
          outline
          noSelectDefault={noSelectDefault}
          isSelectAll={isSelectAll}
          styleWrapper={{
            alignItems: 'flex-start',
            backgroundColor: 'transparent',
          }}
          styleOption={{
            height: scale(30),
          }}
          styleContent={{
            paddingHorizontal: scale(0),
            columnGap: scale(10),
          }}
          onSelect={e => {}}
          data={listFill}
        />
      )} */}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onSort}
        style={styles.sort}>
        <View style={styles.icon}>
          <IconSort
            style={{
              width: scale(14),
              height: scale(14),
            }}
          />
          <CustomText>{text || t('filter')}</CustomText>
        </View>
        {sort && (
          <CustomText
            textType="semiBold"
            style={{fontSize: SIZES.xSmall, color: COLORS.primary}}>
            {sort}
          </CustomText>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: scale(50),
    width: '25%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    columnGap: scale(10),
  },
  sort: {
    backgroundColor: '#f5f5f5',
    borderRadius: scale(6),
    paddingHorizontal: scale(6),
    paddingVertical: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: scale(3),
    minWidth: scale(80),
    height: '80%',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
  },
});
