import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../../../../components/CustomText';
import {
  IconCamera,
  IconCheckBox,
  IconCheckBoxWhite,
  IconDown,
  IconRight,
  IconUnCheckBox,
  IconUnCheckBoxWhite,
} from '../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../components';
import Button from '../../../../Profile/components/Button';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Map from '../../../../Explore/components/DetailAccommodation/Map';
import {requireField, validateMaxAmount} from '../../../../../utils/validate';
import {useForm} from 'react-hook-form';
import ImageDetail from '../../../../components/ImageDetail';
import {useLanguage} from '../../../../../hooks/useLanguage';
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
  const uploadSelfieImage = () => {
    ImageCropPicker.openPicker({
      width: scale(300),
      height: scale(400),
      multiple: true,
      maxFiles: 100,
    })
      .then(image => {
        if (image) {
          setSelfieIdImage(image.map(img => img.path));
          // uploadImage(image.path);
        }
      })
      .catch(error => {
        console.log('Error picking image:', error);
      });
  };
  const uploadImage = async imagePath => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imagePath,
        type: 'image/jpeg',
        name: 'uploaded_image.jpg',
      });

      const response = await axios.post('YOUR_SERVER_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the server response
      if (response.status === 200) {
        // Image uploaded successfully
        console.log('Image uploaded successfully');
      } else {
        // Handle error
        console.log('Error uploading image to server');
        Alert.alert('Error', 'Failed to upload image to the server');
      }
    } catch (error) {
      console.log('Error uploading image:', error);
      Alert.alert('Error', 'An error occurred while uploading image');
    }
  };
  const ok = () => {};
  return (
    <View
      style={{
        width: '90%',
        alignItems: 'center',
        marginTop: scale(30),
        alignSelf: 'center',
      }}>
      <View style={styles.button}>
        {/* <Image
          source={images.sell}
          style={{width: scale(47), height: scale(38)}}
        /> */}
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          {t('Contract')}
        </CustomText>
      </View>
      <CustomInput
        styleTextLabel={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
        }}
        label={t('full_name')}
        control={control}
        name="fullname"
        placeholder={t('full_name')}
        rules={{
          ...requireField(t('this_field_required')),
        }}
        style={styles.textInput}
      />
      <CustomInput
        styleTextLabel={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
        }}
        label={t('phone')}
        control={control}
        name="phone"
        placeholder={t('phone')}
        rules={{
          ...requireField('This field is required'),
        }}
        style={styles.textInput}
      />
      <CustomInput
        styleTextLabel={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
        }}
        control={control}
        label={t('email')}
        name="email"
        placeholder={t('email')}
        rules={{
          ...requireField('This field is required'),
        }}
        style={styles.textInput}
      />
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        {t('Upload ID Card image')}
      </CustomText>
      <View
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: scale(20),
        }}>
        <TouchableOpacity onPress={uploadIDCARD}>
          <IconCamera />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          ...styles.textArea1,
          backgroundColor: '#E3E3E3',
          marginBottom: scale(10),
          width: '90%',
        }}
        onPress={uploadIDCARD}>
        {idCardImage.length > 0 ? (
          <ImageDetail
            dataImg={idCardImage}
            styleWrapper={{flex: 1, backgroundColor: 'transparent'}}
          />
        ) : null}
      </TouchableOpacity>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        {t('Selfie with ID Card')}
      </CustomText>
      <View
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: scale(20),
        }}>
        <TouchableOpacity onPress={uploadSelfieImage}>
          <IconCamera />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          ...styles.textArea1,
          backgroundColor: '#E3E3E3',
          marginBottom: scale(10),
          width: '90%',
        }}
        onPress={uploadIDCARD}>
        {selfieIdImage.length > 0 ? (
          <ImageDetail
            dataImg={selfieIdImage}
            styleWrapper={{flex: 1, backgroundColor: 'transparent'}}
          />
        ) : null}
      </TouchableOpacity>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
          width: '80%',
        }}>
        {t('Add images to prove ownership of your Real Estate assets')}
      </CustomText>
      <View
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: scale(20),
        }}>
        <TouchableOpacity onPress={uploadProperty}>
          <IconCamera />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          ...styles.textArea1,
          backgroundColor: '#E3E3E3',
          marginBottom: scale(10),
          width: '90%',
        }}
        onPress={uploadProperty}>
        {propertyImage.length > 0 ? (
          <ImageDetail
            dataImg={propertyImage}
            styleWrapper={{flex: 1, backgroundColor: 'transparent'}}
          />
        ) : null}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          // alignItems: 'center',
          marginTop: scale(20),
        }}>
        <TouchableOpacity onPress={toggleCheckBox1}>
          {check1 ? <IconCheckBox /> : <IconUnCheckBox />}
        </TouchableOpacity>
        <CustomText
          textType="medium"
          style={{
            ...styles.text3,
            color: COLORS.black,
            width: '75%',
            // alignSelf: 'flex-start',
            // marginTop: scale(5),
            marginLeft: scale(30),
          }}>
          {t(
            'I represent and warrant that: (1) the Hotel has all valid licenses and permits in accordance with the applicable laws and regulations related to Hotel’s business activities; and (2) if the Hotel has not obtained a license or permit, the Hotel will obtain the license or permit as soon as possible and will submit it to Traveloka instantly upon Traveloka’s request.',
          )}
        </CustomText>
      </View>
      {/* <CustomText
        textType="medium"
        style={{
          ...styles.text3,
          color: COLORS.black,
          paddingHorizontal: scale(20),
          width: '100%',
          alignSelf: 'flex-start',
          marginTop: scale(10),
        }}>
        Note: TOBE REAL Real Estate does not allow properties to be posted that
        are not real or misleading to solicit customer information. If
        discovered, your account will be permanently banned.
      </CustomText> */}
      <View style={{width: '100%', marginBottom: scale(30)}}>
        <Button title={t('submit')} onPress={handleSubmit(ok)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: scale(16),
    rowGap: scale(14),
  },
  category: {
    rowGap: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  text2: {
    fontSize: SIZES.xLarge,
  },
  text1: {
    fontSize: SIZES.small,
  },
  text3: {
    fontSize: SIZES.xSmall,
  },
  button: {
    height: scale(63),
    width: '90%',
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#F0B90B40',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    shadowColor: '#F0B90B40',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  buttonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(5),
    backgroundColor: '#F0B90B',
    height: scale(36),
    width: '40%',
    borderRadius: scale(5),
  },
  textInput: {
    backgroundColor: '#E3E3E3',
    marginTop: scale(10),
    borderRadius: scale(5),
    // borderWidth: scale(0),
    width: '90%',
  },
  line: {
    height: scale(2),
    backgroundColor: COLORS.grey,
    width: '95%',
    alignSelf: 'center',
    marginTop: scale(10),
    marginBottom: scale(20),
  },
  textArea1: {
    borderWidth: scale(2),
    borderColor: '#E3E3E3',
    borderRadius: scale(8),
    height: scale(150),
    overflow: 'hidden',
    justifyContent: 'space-between',
    marginTop: scale(10),
    width: '90%',
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // borderWidth: scale(2),
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    width: '100%',
    borderRadius: scale(5),
    height: scale(71),
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    marginTop: scale(10),
  },
  buttonFurnitury: {
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    borderRadius: scale(10),
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
  },
  buttonFurniturys: {
    borderTopLeftRadius: scale(10),
    borderTopEndRadius: scale(10),
    borderTopRightRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
  },
  listBed: {
    borderBottomLeftRadius: scale(10),
    borderBottomEndRadius: scale(10),
    borderBottomRightRadius: scale(10),
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    width: '100%',
    minHeight: scale(100),
  },
  text: {
    fontSize: SIZES.small,
  },
  buttonCategories: {
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: '#F0B90B80',
    height: scale(50),
    width: '90%',
    justifyContent: 'space-between',
    marginTop: scale(20),
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  box: {
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: scale(5),
    borderBottomRightRadius: scale(5),
    borderBottomStartRadius: scale(5),
    borderBottomEndRadius: scale(5),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '90%',
    paddingBottom: scale(20),
  },
});
