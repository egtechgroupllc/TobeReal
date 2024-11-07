import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useLanguage} from '~/hooks/useLanguage';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import Collapsible from 'react-native-collapsible';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {Button} from '~/components';
import {useNavigation} from '@react-navigation/native';

export default function TimeWorking() {
  const {t} = useLanguage();
  const [isView, setView] = useState(false);
  const {navigate} = useNavigation();

  const viewGeneral = () => {
    setView(prev => !prev);
  };
  return (
    <View>
      <ButtonTabValidate
        title={t('manage_time_working')}
        onPress={viewGeneral}
      />
      <Collapsible collapsed={!isView} style={styles.box}>
        <View style={{alignSelf: 'flex-start'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.dot} />
            <Button.Text
              title={t('manage_time_markers')}
              styleText={{color: COLORS.White, fontSize: SIZES.xMedium}}
              onPress={() => navigate('ManageTimeWorkingScreen')}
            />
          </View>
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: COLORS.input,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  dot: {
    backgroundColor: COLORS.White,
    borderRadius: scale(99),
    height: scale(10),
    aspectRatio: 1,
  },
});
