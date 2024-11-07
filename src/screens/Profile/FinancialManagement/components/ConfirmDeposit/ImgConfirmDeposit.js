import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES} from '~/assets/constants';
import {CText} from '~/components';
import ChooseImgPicker from '~/components/ChoosePhoto/ChooseImgPicker';
import {useLanguage} from '~/hooks/useLanguage';
import ImageCertificate from '~/screens/Profile/RegisterDoctor/components/ImageCertificate';
import {scale} from '~/utils/scale';
import {requireField} from '~/utils/validate';
import PhotoProof from './PhotoProof';

export default function ImgConfirmDeposit({control, setValue, watch, errors}) {
  const {t} = useLanguage();
  return (
    <View>
      {/* <CText
        textType="semiBold"
        style={{
          fontSize: SIZES.medium,
          marginBottom: scale(-10),
        }}>
        {t('photo_proof')}
      </CText> */}

      {/* <ChooseImgPicker
        title={t('photo_proof_transfer')}
        name={'files'}
        isDescriptionImg={false}
        maxFiles={2}
        control={control}
        rules={[requireField(t('this_field_required'))]}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
