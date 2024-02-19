import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {scale} from '../../assets/constants';
import BottomSheet from '../../components/BottomSheet';

export default function Comment({open}) {
  const bottomSheetRef = useRef();
  useEffect(() => {
    if (open) {
      bottomSheetRef.current.open();
    }
  }, [open]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      titleIndicator={'Comment'}
      snapPoints={['70%']}
      styleContent={{
        rowGap: scale(10),
        paddingHorizontal: scale(20),
      }}></BottomSheet>
  );
}

const styles = StyleSheet.create({});
