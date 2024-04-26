import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES, scale} from '../../../../../assets/constants';
import {IconClock} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import WrapperContent from '../../WrapperContent';
import BottomSheet from '../../../../../components/BottomSheet';

const listPolicy = [
  {
    icon: IconClock,
    name: 'Required documents',
    value:
      'When checking in, you need to provide ID card/CCCD. Please bring necessary documents in hard copy.',
  },
];
export default function AccommoPolicy({data}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current.open();
    }
  }, [isOpen]);
  return (
    <WrapperContent
      heading={'Accommodation policy'}
      isSeeAll
      onPressSeeAll={() => {
        setIsOpen(true);
      }}
      styleContent={{
        paddingHorizontal: scale(16),
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
          titleIndicator={'Chính sách lưu trú'}
          styleContent={{
            paddingHorizontal: scale(16),
            rowGap: scale(16),
          }}>
          {listPolicy?.map((item, index) => (
            <Item data={item} key={index} />
          ))}
        </BottomSheet>
      )}
    </WrapperContent>
  );
}

const Item = ({data}) => {
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
