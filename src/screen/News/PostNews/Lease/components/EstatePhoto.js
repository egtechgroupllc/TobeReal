import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomInput} from '../../../../../components';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {IconCamera, IconRight} from '../../../../../assets/icon/Icon';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {requireField} from '../../../../../utils/validate';
import CustomText from '../../../../../components/CustomText';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImageDetail from '../../../../components/ImageDetail';

export default function EstatePhoto() {
  const {t} = useLanguage();
  const [viewContact, setViewContact] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);

  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: scale(300),
      height: scale(400),
      multiple: true,
      maxFiles: 100,
    })
      .then(image => {
        if (image) {
          setSelectedImage(image.map(img => img.path));
          // uploadImage(image.path);
        }
      })
      .catch(error => {
        console.log('Error picking image:', error);
      });
  };

  return (
    <View>
      <CustomButton
        outline
        style={styles.buttonCategories}
        text={t('estate_photo')}
        iconRight={() => <IconRight />}
        onPress={() => setViewContact(prev => !prev)}
        styleText={{
          color: COLORS.text,
        }}
      />

      <Collapsible collapsed={!viewContact} style={styles.box}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(20),
                alignSelf: 'flex-start',
              }}>
              {t('real_estate_images')}
            </CustomText>
            <CustomText
              textType="regular"
              style={{
                ...styles.text3,
                color: COLORS.black,
                alignSelf: 'flex-start',
              }}>
              {t('update_image_to_maximum')}
            </CustomText>
          </View>

          <TouchableOpacity
            onPress={pickImage}
            style={{
              padding: scale(8),
              marginBottom: scale(-8),
              marginLeft: scale(-8),
            }}>
            <IconCamera />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={pickImage}
          style={styles.contentImg}
          disabled={selectedImage.length > 0}>
          {selectedImage.length > 0 ? (
            <ImageDetail
              dataImg={selectedImage}
              styleWrapper={{flex: 1, backgroundColor: 'transparent'}}
            />
          ) : null}
        </TouchableOpacity>

        <CustomInput
          label={t('Link youtube')}
          placeholder={t('Link youtube')}
          styleTextLabel={styles.label}
          style={{...styles.textInput}}
        />

        <CustomInput
          label={t('Link tiktok')}
          placeholder={t('Link tiktok')}
          styleTextLabel={styles.label}
          style={{...styles.textInput}}
        />
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonCategories: {
    backgroundColor: 'white',
    borderRadius: scale(6),
    borderColor: '#F0B90B80',
    height: scale(50),
    justifyContent: 'space-between',
    marginTop: scale(20),
    paddingHorizontal: scale(20),
  },
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(20),
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
  label: {
    color: COLORS.black,
  },
  contentImg: {
    borderWidth: scale(2),
    borderColor: '#E3E3E3',
    borderRadius: scale(8),
    height: scale(250),
    backgroundColor: '#E3E3E3',
    marginBottom: scale(10),
    width: '100%',
    overflow: 'hidden',
  },
});
