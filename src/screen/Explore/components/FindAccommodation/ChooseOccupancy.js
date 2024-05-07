import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, images, scale} from '../../../../assets/constants';
import {IconProfile, IconRoom} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import BottomSheet from '../../../../components/BottomSheet';
import Counter from '../../../../components/Counter';
import ListChildren from './Occupancy/ListChildren';
import CustomImage from '../../../../components/CustomImage';

export default function ChooseOccupancy({setValue}) {
  const bottomSheetRef = useRef();

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
        defaultValue={`${numRooms} Room, ${numAdult} Adult, ${numChild.length} Children`}
        iconLeft={IconRoom}
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
          <Counter
            editable={false}
            heading={'Room(s)'}
            max={numAdult}
            // Icon={<CustomImage source={images.lease} style={styles.iconShe} />}
            // value={numRoom > numAdult ? numAdult : numRoom}
            onChange={setNumRooms}
          />
          <Counter
            heading="Adult"
            onChange={setNumAdult}
            value={numAdult}
            min={numRooms}
          />
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
