import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {validateMinLength} from '../../../../../../utils/validate';
import ChooseImgPicker from '../../../../../components/ChooseImgPicker';
import RulesPostImg from '../../../components/RulesPostImg';
import ButtonTabValidate from '../ButtonTabValidate';

export default function EstatePhoto({control, errors, watch}) {
  const {t} = useLanguage();

  const [isView, setView] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const arrKeywords = useRef(['description_img', 'kyc']).current;

  return (
    <View>
      <ButtonTabValidate
        title={t('estate_photo')}
        onPress={() => setView(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <InViewPort
        noLoading={true}
        onChange={render => render && setIsRender(render)}>
        {isRender && (
          <Collapsible collapsed={!isView} style={styles.box}>
            <RulesPostImg />
            <ChooseImgPicker
              title={t('real_estate_images')}
              subHeading={t('update_image_to_maximum')}
              control={control}
              rules={[validateMinLength(t('this_field_required'), 4)]}
              name={'description_img'}
            />

            <ChooseImgPicker
              title={t(
                'Add images to prove ownership of your Real Estate assets',
              )}
              control={control}
              rules={[validateMinLength(t('this_field_required'), 1)]}
              name={'kyc'}
            />

            <CustomInput
              label={t('Link youtube')}
              placeholder={t('Link youtube')}
              style={{...styles.textInput}}
            />

            <CustomInput
              label={t('Link tiktok')}
              placeholder={t('Link tiktok')}
              style={{...styles.textInput}}
            />
          </Collapsible>
        )}
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

  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
});
