import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {scale} from '../../assets/constants';
import {useLanguage} from '../../hooks/useLanguage';
import {Counter} from '../../components';

export default memo(function CounterOccupancy({value, onChange}) {
  const {t} = useLanguage();

  const [numAdult, setNumAdult] = useState(value?.numAdult || 1);
  const [numRoom, setNumRoom] = useState(value?.numRoom || 1);

  useEffect(() => {
    onChange &&
      onChange({
        numRoom,
        numAdult,
      });
  }, [numRoom, numAdult, onChange]);

  return (
    <View style={{flex: 1, rowGap: scale(15)}}>
      <Counter
        editable={false}
        heading={t('room')}
        max={numAdult}
        value={numRoom}
        onChange={setNumRoom}
      />

      <Counter
        heading={t('adult')}
        onChange={setNumAdult}
        value={numAdult}
        min={numRoom}
        max={30}
      />
    </View>
  );
});

const styles = StyleSheet.create({});
