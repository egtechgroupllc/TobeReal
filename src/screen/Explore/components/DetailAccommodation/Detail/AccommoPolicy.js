import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconClock} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import WrapperContent from '../../WrapperContent';
import BottomSheet from '../../../../../components/BottomSheet';

export default function AccommoPolicy({data}) {
  const {t} = useLanguage();
  const listPolicy = [
    {
      icon: IconClock,
      name: t('require_document'),
      value: t('checking_require'),
    },
  ];
  const bottomSheetRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current.open();
    }
  }, [isOpen]);
  return (
    <WrapperContent
      noBackground
      heading={t('accom_policy')}
      isSeeAll
      onPressSeeAll={() => {
        setIsOpen(true);
      }}
      styleContent={{
        paddingHorizontal: scale(16),
        borderBottomWidth: 1,
        borderColor: COLORS.pioBox,
        paddingBottom: scale(30),
      }}>
      <View
        style={{
          rowGap: scale(16),
        }}>
        {listPolicy?.slice(0, 2).map((item, index) => (
          <Item data={item} key={index} />
        ))}
      </View>

      {isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          onDismiss={() => setIsOpen(false)}
          index={1}
          snapPoints={['50%', '80%']}
          titleIndicator={t('accom_policy')}
          handleStyle={{color: COLORS.black}}
          styleContent={{
            paddingHorizontal: scale(16),
            rowGap: scale(16),
          }}>
          {listPolicy?.map((item, index) => (
            <Item data={item} key={index} textStyle={{color: COLORS.black}} />
          ))}
        </BottomSheet>
      )}
    </WrapperContent>
  );
}

const Item = ({data, textStyle}) => {
  return (
    <View style={styles.item}>
      {data.icon && (
        <data.icon
          style={{
            width: scale(20),
            height: scale(20),
          }}
        />
      )}

      <View
        style={{
          rowGap: scale(4),
          flex: 1,
        }}>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
            ...textStyle,
          }}>
          {data?.name}
        </CustomText>
        <CustomText>{data?.value}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    columnGap: scale(10),
  },
});
