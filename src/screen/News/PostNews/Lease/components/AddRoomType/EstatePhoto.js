import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {validateMinLength} from '../../../../../../utils/validate';
import ChooseImgPicker from '../../../../../components/ChooseImgPicker';
import ButtonTabValidate from '../ButtonTabValidate';
import InViewPort from '../../../../../../components/InViewport';
import RulesPostImg from '../../../components/RulesPostImg';

export default function EstatePhoto({control, errors, watch}) {
  const {t} = useLanguage();

  const [isView, setView] = useState(false);

  return (
    <View>
      <ButtonTabValidate
        title={t('estate_photo')}
        onPress={() => setView(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={['files']}
      />
      <InViewPort noLoading={true}>
        <Collapsible collapsed={!isView} style={styles.box}>
          <RulesPostImg />
          <ChooseImgPicker
            title={t('real_estate_images')}
            subHeading={t('update_image_to_maximum')}
            control={control}
            rules={[validateMinLength(t('this_field_required'), 1)]}
            name={'files'}
          />
        </Collapsible>
      </InViewPort>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
});
