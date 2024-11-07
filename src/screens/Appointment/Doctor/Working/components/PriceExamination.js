import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import Collapsible from 'react-native-collapsible';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {useLanguage} from '~/hooks/useLanguage';
import {Button} from '~/components';
import {useNavigation} from '@react-navigation/native';

export default function PriceExamination() {
  const {t} = useLanguage();
  const [isView, setView] = useState(false);

  const viewGeneral = () => {
    setView(prev => !prev);
  };
  const {navigate} = useNavigation();
  return (
    <View>
      <ButtonTabValidate
        title={t('manage_price_examination')}
        onPress={viewGeneral}
      />
      <Collapsible collapsed={!isView} style={styles.box}>
        <View style={{alignSelf: 'flex-start'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.dot} />
            <Button.Text
              title={t('manage_price_examination')}
              styleText={{color: COLORS.White, fontSize: SIZES.xMedium}}
              onPress={() => navigate('ManagePriceExamScreen')}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.dot} />
            <Button.Text
              title={t('create_new_price_examination')}
              styleText={{color: COLORS.White, fontSize: SIZES.xMedium}}
              onPress={() => navigate('AddPriceExamScreen')}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.dot} />
            <Button.Text
              title={t('update_price_examination')}
              styleText={{color: COLORS.White, fontSize: SIZES.xMedium}}
              onPress={() => navigate('AddPriceExamScreen')}
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
