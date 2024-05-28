import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {CustomButton, CustomInput} from '../../../../../components';
import CheckBox from '../../../../../components/CheckBox';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {requireField, validateEmail} from '../../../../../utils/validate';
import ChooseImgPicker from '../../../../components/ChooseImgPicker';
export default function TabContent() {
  const {t} = useLanguage();
  const {control, handleSubmit} = useForm();
  const [idCardImage, setIdCardImage] = useState([]);
  const [propertyImage, setPropertyImage] = useState([]);
  const [selfieIdImage, setSelfieIdImage] = useState([]);
  const [check1, setCheck1] = useState(false);
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
  };
  const uploadIDCARD = () => {
    ImageCropPicker.openPicker({
      width: scale(300),
      height: scale(400),
      multiple: true,
      maxFiles: 100,
    })
      .then(image => {
        if (image) {
          setIdCardImage(image.map(img => img.path));
          // uploadImage(image.path);
        }
      })
      .catch(error => {
        console.log('Error picking image:', error);
      });
  };
  const uploadProperty = () => {
    ImageCropPicker.openPicker({
      width: scale(300),
      height: scale(400),
      multiple: true,
      maxFiles: 100,
    })
      .then(image => {
        if (image) {
          setPropertyImage(image.map(img => img.path));
          // uploadImage(image.path);
        }
      })
      .catch(error => {
        console.log('Error picking image:', error);
      });
  };

  const ok = () => {};
  return (
    <View style={styles.wrapper}>
      <View style={styles.button}>
        <CustomText textType="medium" style={{...styles.text2}}>
          {t('Contract')}
        </CustomText>
      </View>

      <View
        style={{
          marginTop: scale(40),
          width: '100%',
          rowGap: scale(10),
        }}>
        <CustomInput
          label={t('full_name')}
          control={control}
          name="fullname"
          placeholder={t('full_name')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
        />

        <CustomInput
          label={t('phone')}
          control={control}
          name="phone"
          placeholder={t('phone')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
        />

        <CustomInput
          control={control}
          label={t('email')}
          name="email"
          placeholder={t('email')}
          rules={[
            requireField(t('this_field_required')),
            validateEmail(t('invalid_email')),
          ]}
          style={styles.textInput}
        />

        <ChooseImgPicker
          title={t('Upload ID Card image')}
          control={control}
          rules={[requireField(t('this_field_required'))]}
          name={'descriptionImg1'}
          styleContentImg={{
            height: scale(200),
          }}
        />

        <ChooseImgPicker
          title={t('Selfie with ID Card')}
          control={control}
          rules={[requireField(t('this_field_required'))]}
          name={'descriptionImg2'}
          styleContentImg={{
            height: scale(200),
          }}
        />

        <ChooseImgPicker
          title={t('Add images to prove ownership of your Real Estate assets')}
          control={control}
          rules={[requireField(t('this_field_required'))]}
          name={'descriptionImg3'}
          styleContentImg={{
            height: scale(200),
          }}
        />
        <CheckBox
          text={t(
            'I represent and warrant that: (1) the Hotel has all valid licenses and permits in accordance with the applicable laws and regulations related to Hotel’s business activities; and (2) if the Hotel has not obtained a license or permit, the Hotel will obtain the license or permit as soon as possible and will submit it to Traveloka instantly upon Traveloka’s request.',
          )}
          textStyle={{
            fontSize: SIZES.xSmall,
          }}
          styleWrapper={{
            marginTop: scale(8),
          }}
        />

        <CustomButton
          text={t('submit')}
          linearGradientProps
          onPress={handleSubmit(ok)}
          styleText={{
            fontSize: SIZES.medium,
          }}
          styleWrapper={{
            marginTop: scale(20),
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    alignItems: 'center',
    marginVertical: scale(30),
    alignSelf: 'center',
  },

  label: {
    color: COLORS.black,
  },
  text2: {
    fontSize: SIZES.xLarge,
  },
  button: {
    height: scale(63),
    width: '90%',
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: COLORS.green,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    shadowColor: COLORS.green,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },

  textInput: {
    backgroundColor: '#E3E3E3',
    borderRadius: scale(5),
    // borderWidth: scale(0),
    width: '100%',
  },
});
