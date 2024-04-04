import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {validateMinLength} from '../../../../../../utils/validate';
import ChooseImgPicker from '../../../../../components/ChooseImgPicker';
import ButtonTabValidate from '../ButtonTabValidate';
import InViewPort from '../../../../../../components/InViewport';
import CustomText from '../../../../../../components/CustomText';
import RulesPostImg from '../../../components/RulesPostImg';

export default function EstatePhoto({control, errors, setValue, watch}) {
  const {t} = useLanguage();

  const [isView, setView] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const arrKeywords = useRef(['description_img', 'kyc']).current;

  const formatImgEdit = images => {
    const result = images.map((item, index) => {
      var filename = item.file_name;

      var parts = filename.split('.');

      var extension = parts[parts.length - 1];

      return {
        name: new Date().getTime() + item.file_name,
        type: `image/${extension}`,
        id: item.id,
        description: item?.description,
        uri: item.url,
      };
    });

    return result;
  };

  useEffect(() => {
    if (watch('images')) {
      const description_img = watch('images').filter(item => !item?.is_kyc);

      const image_descriptionFormat = formatImgEdit(description_img);

      const kyc_img = watch('images').filter(item => item?.is_kyc);
      const image_kycFormat = formatImgEdit(kyc_img);

      setValue('description_img', image_descriptionFormat);
      setValue('kyc', image_kycFormat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('images')]);

  return (
    <View>
      <ButtonTabValidate
        title={t('Thêm Ảnh')}
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
              rules={[
                validateMinLength(t(' Tối thiểu là 4 ảnh và tối đa 24 ảnh'), 4),
              ]}
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

            {/* <CustomInput
              label={t('Link youtube')}
              placeholder={t('Link youtube')}
              style={{...styles.textInput}}
            />

            <CustomInput
              label={t('Link tiktok')}
              placeholder={t('Link tiktok')}
              style={{...styles.textInput}}
            /> */}
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
