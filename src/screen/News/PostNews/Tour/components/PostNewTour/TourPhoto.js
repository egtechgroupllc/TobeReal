import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {scale} from '../../../../../../assets/constants';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {validateMinLength} from '../../../../../../utils/validate';
import ChooseImgPicker from '../../../../../components/ChooseImgPicker';
import RulesPostImg from '../../../components/RulesPostImg';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';

export default function TourPhoto({
  control,
  errors,
  setValue,
  watch,
  arrImg,
  isKyc = true,
}) {
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
        name: filename,
        type: `image/${extension}`,
        id: item.id,
        description: item?.description,
        uri: item.url,
      };
    });

    return result;
  };

  // useEffect(() => {
  //   if (watch('images')) {
  //     const description_img = watch('images').filter(item => !item?.is_kyc);

  //     const image_descriptionFormat = formatImgEdit(description_img);

  //     const kyc_img = watch('images').filter(item => item?.is_kyc);
  //     const image_kycFormat = formatImgEdit(kyc_img);

  //     setValue('description_img', image_descriptionFormat);
  //     setValue('kyc', image_kycFormat);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [watch('images')]);

  const imgKyc = useMemo(() => {
    if (arrImg) {
      const kyc_img = arrImg.filter(item => item?.is_kyc);
      const image_kycFormat = formatImgEdit(kyc_img);
      return image_kycFormat;
    }
  }, [arrImg]);

  const imgDes = useMemo(() => {
    if (arrImg && isKyc) {
      const description_img = arrImg.filter(item => !item?.is_kyc);
      const image_descriptionFormat = formatImgEdit(description_img);

      return image_descriptionFormat;
    }
  }, [arrImg, isKyc]);

  return (
    <View>
      <ButtonTabValidate
        title={t('add_images')}
        onPress={() => setView(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />

      <InViewPort noLoading={true}>
        <Collapsible collapsed={!isView} style={styles.box}>
          <RulesPostImg />
          <ChooseImgPicker
            title={t('tour_image')}
            subHeading={t('update_image_to_maximum')}
            control={control}
            rules={
              !imgDes && [
                validateMinLength(t(' Tối thiểu là 4 ảnh và tối đa 24 ảnh'), 4),
              ]
            }
            name={'description_img'}
          />

          {imgDes && (
            <ChooseImgPicker
              defaultValue={imgDes}
              isAddWhenEmpty={true}
              isAddMore={false}
              name={'image_update_description'}
              control={control}
              onDelete={id => {
                setValue(
                  'image_delete',
                  watch('image_delete') ? [id, ...watch('image_delete')] : [id],
                );
              }}
            />
          )}

          {/* {isKyc && (
              <>
                <ChooseImgPicker
                  title={t(
                    'Add images to prove ownership of your Real Estate assets',
                  )}
                  control={control}
                  rules={
                    !imgKyc && [validateMinLength(t('this_field_required'), 1)]
                  }
                  name={'kyc'}
                />

                {imgKyc && (
                  <ChooseImgPicker
                    defaultValue={imgKyc}
                    isAddWhenEmpty={true}
                    isAddMore={false}
                    name={'image_update_description_kyc'}
                    control={control}
                    onDelete={id => {
                      setValue(
                        'image_delete',
                        watch('image_delete')
                          ? [id, ...watch('image_delete')]
                          : [id],
                      );
                    }}
                  />
                )}
              </>
            )} */}
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
