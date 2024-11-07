import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Input from '~/components/Input';
import {requireField, validateEmail} from '~/utils/validate';
import {COLORS, SIZES} from '~/assets/constants';
import {useLanguage} from '~/hooks/useLanguage';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useNavigation} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import Collapsible from 'react-native-collapsible';

export default function General({control}) {
  const {t} = useLanguage();
  const [isView, setView] = useState(false);
  const {navigate} = useNavigation();
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  return (
    <View>
      <ButtonTabValidate
        title={t('General information')}
        onPress={viewGeneral}
      />
      <Collapsible collapsed={!isView} style={styles.box}>
        <Input
          label={t('full_name')}
          control={control}
          name="name"
          placeholder={t('enter_fullname')}
          rules={[requireField(t('this_field_required'))]}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={{color: COLORS.White, textType: 'medium'}}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
        <Input
          label={t('phone')}
          control={control}
          name="phone"
          placeholder={t('enter_phone')}
          rules={[requireField(t('this_field_required'))]}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={{color: COLORS.White, textType: 'medium'}}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          keyboardType="numeric"
        />
        <Input
          label={t('email')}
          control={control}
          sizeInput="medium"
          style={styles.textInput}
          styleTextLabel={{color: COLORS.White, textType: 'medium'}}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          rules={[
            requireField(t('this_field_required')),
            validateEmail(t('invalid_email')),
          ]}
          name="email"
          placeholder={t('enter_email')}
        />
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
