import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, scale} from '../../../../assets/constants';
import {IconProfile} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import BottomSheet from '../../../../components/BottomSheet';
import Counter from '../../../../components/Counter';
import ListChildren from './Occupancy/ListChildren';

export default function ChooseOccupancy() {
  const bottomSheetRef = useRef();

  const [numAdult, setNumAdult] = useState(1);
  const [numChild, setNumChild] = useState([]);

  return (
    <View>
      <CustomInput
        defaultValue={`${numAdult} Adult, ${numChild.length} Children`}
        iconLeft={IconProfile}
        styleIcon={{
          ...styles.icon,
          color: COLORS.primary,
        }}
        onPress={() => bottomSheetRef.current.open()}
      />

      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={'Occupancy'}
        snapPoints={['70%']}
        styleContent={{
          rowGap: scale(10),
          padding: scale(20),
        }}>
        <View style={{flex: 1, rowGap: scale(15)}}>
          <Counter heading="Adult" onChange={setNumAdult} value={numAdult} />
          <ListChildren onChange={setNumChild} quantity={numChild} />
        </View>

        <CustomButton
          buttonType="large"
          text="Confirm"
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
