import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import Collapsible from 'react-native-collapsible';
import {Button} from '~/components';

export default function ProductManage() {
  const {t} = useLanguage();
  const [isView, setView] = useState(false);
  const {navigate} = useNavigation();
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  return (
    <View>
      <ButtonTabValidate title={t('Product manage')} onPress={viewGeneral} />
      <Collapsible collapsed={!isView} style={styles.box}>
        <View style={{alignSelf: 'flex-start'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.dot} />
            <Button.Text
              title={'Create new calendar'}
              styleText={{color: COLORS.White, fontSize: SIZES.xMedium}}
              onPress={() =>
                navigate('ManageDateWorkingScreen', {create: true})
              }
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.dot} />
            <Button.Text
              title={'Remove calendar'}
              styleText={{color: COLORS.White, fontSize: SIZES.xMedium}}
              onPress={() => navigate('ManageDateWorkingScreen')}
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
