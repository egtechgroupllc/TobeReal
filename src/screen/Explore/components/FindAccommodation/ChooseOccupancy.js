import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, images, scale} from '../../../../assets/constants';
import {IconProfile, IconRoom} from '../../../../assets/icon/Icon';
import {
  BottomSheet,
  Counter,
  CustomButton,
  CustomInput,
} from '../../../../components';
import ListChildren from './Occupancy/ListChildren';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function ChooseOccupancy({setValue}) {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();

  const [numAdult, setNumAdult] = useState(1);
  const [numChild, setNumChild] = useState([]);
  const [numRooms, setNumRooms] = useState(1);
  useEffect(() => {
    setValue('numAdult', numAdult);
    setValue('numChild', numChild);
    setValue('numRoom', numRooms);
  }, [numAdult, numChild, numRooms]);
  return (
    <View>
      <CustomInput
        defaultValue={`${numRooms} ${t('room')}, ${numAdult} ${t('adult')}, ${
          numChild.length
        } ${t('children')}`}
        iconLeft={IconRoom}
        styleIcon={{
          ...styles.icon,
          color: COLORS.primary,
        }}
        onPress={() => bottomSheetRef.current.open()}
      />

      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={t('occupancy')}
        snapPoints={['60%']}
        styleContent={{
          rowGap: scale(10),
          padding: scale(20),
        }}>
        <View style={{flex: 1, rowGap: scale(15)}}>
          <Counter
            editable={false}
            heading={t('room')}
            max={numAdult}
            // Icon={<CustomImage source={images.lease} style={styles.iconShe} />}
            // value={numRoom > numAdult ? numAdult : numRoom}
            onChange={setNumRooms}
          />
          <Counter
            heading={t('adult')}
            onChange={setNumAdult}
            value={numAdult}
            min={numRooms}
          />
          <ListChildren onChange={setNumChild} quantity={numChild} />
        </View>

        <CustomButton
          buttonType="large"
          text={t('confirm')}
          style={{
            marginTop: scale(10),
          }}
          styleText={{
            textType: 'semiBold',
          }}
          onPress={() => bottomSheetRef.current.close()}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({});
