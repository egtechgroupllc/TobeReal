import React, {useMemo, useRef, useState} from 'react';
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

export default function EstatePhoto({control, errors, watch, setValue}) {
  const {t} = useLanguage();

  const [isView, setView] = useState(false);

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
  const imgDes = useMemo(() => {
    if (watch('images')) {
      const description_img = watch('images');
      const image_descriptionFormat = formatImgEdit(description_img);

      return image_descriptionFormat;
    }
  }, [watch('images')]);

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
            name={'files'}
            rules={
              !imgDes && [
                validateMinLength(t(' Tối thiểu là 4 ảnh và tối đa 24 ảnh'), 4),
              ]
            }
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
