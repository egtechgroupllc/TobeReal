import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
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
import {useLanguage} from '../../../../../hooks/useLanguage';
import {useForm} from 'react-hook-form';
import {requireField, validateMaxAmount} from '../../../../../utils/validate';
import ImageCropPicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import ImageDetail from '../../../../Explore/components/DetailAccommodation/ImageDetail';
export default function TabContent() {
  const [inputText, setInputText] = useState('');
  const [openCheckin, setOpenCheckin] = useState(false);
  const [timeCheckin, setTimeCheckin] = useState(new Date());
  const [openCheckout, setOpenCheckout] = useState(false);
  const [timeCheckout, setTimeCheckout] = useState(new Date());
  const {control, watch, handleSubmit} = useForm();
  const [selectedImage, setSelectedImage] = useState([]);
  const handleInputChange = text => {
    setInputText(text);
  };
  const [viewgeneral, setViewgeneral] = useState(false);
  const viewGeneral = () => {
    setViewgeneral(prevViewgeneral => !prevViewgeneral);
  };
  const [viewday, setViewday] = useState(false);
  const viewDay = () => {
    setViewday(prevViewday => !prevViewday);
  };
  const [viewlocation, setViewlocation] = useState(false);
  const viewLocation = () => {
    setViewlocation(prevViewlocation => !prevViewlocation);
  };
  const [viewpicture, setViewpicture] = useState(false);
  const viewPicture = () => {
    setViewpicture(prevViewpicture => !prevViewpicture);
  };
  const [viewprice, setViewprice] = useState(false);
  const viewPrice = () => {
    setViewprice(prevViewprice => !prevViewprice);
  };
  const [viewcontactinfo, setViewcontactinfo] = useState(false);
  const viewContactinfo = () => {
    setViewcontactinfo(prevViewcontactinfo => !prevViewcontactinfo);
  };

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

  const maxCharacters = 2000;
  const navigation = useNavigation();
  const {t} = useLanguage();
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const toggleCheckBox = () => {
    setCheck(prevCheck => !prevCheck);
  };
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
  };
  const goPostScreen = () => {
    navigation.navigate('PostNewsScreen');
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
        <Image
          source={images.rentbuy}
          style={{width: scale(47), height: scale(38)}}
        />
        <View>
          <CustomText
            textType="semiBold"
            style={{...styles.text1, marginLeft: scale(20)}}>
            {t('tour_post')}
          </CustomText>
        </View>
      </View>

      {/* <View
        style={{
          flexDirection: 'row',
          marginTop: scale(30),
          columnGap: scale(30),
        }}>
        <TouchableOpacity
          onPress={toggleCheckBox}
          style={{...styles.buttonSmall, paddingHorizontal: scale(10)}}>
          {check ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
          <CustomText
            textType="medium"
            style={{...styles.text1, color: COLORS.white}}>
            Need employ
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCheckBox1} style={styles.buttonSmall}>
          {check1 ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
          <CustomText
            textType="medium"
            style={{...styles.text1, color: COLORS.white}}>
            Need to buy
          </CustomText>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewGeneral}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('tour_information')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewgeneral && (
        <View style={styles.box}>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('title')}
            control={control}
            name="title"
            placeholder={t('title')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('provincial')}
            control={control}
            name="provincial"
            placeholder={t('Provincial links')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('tour_code')}
            control={control}
            name="code"
            placeholder={t('code')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
                alignSelf: 'flex-start',
              }}>
              {t('topic')}
            </CustomText>
            <TouchableOpacity
              style={{
                height: scale(40),
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#E3E3E3',
                width: '100%',
                alignItems: 'center',
                borderRadius: scale(5),
                marginTop: scale(10),
                paddingHorizontal: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text,
                  color: '#979797',
                }}>
                   {t('domestic')}
              </CustomText>
              <IconDown />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewDay}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('day')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewday && (
        <View style={styles.box}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              alignSelf: 'flex-start',
              marginTop: scale(10),
            }}>
            {t('tour_time')}
          </CustomText>
          <View style={{flexDirection: 'row'}}>
            <CustomInput
              styleTextLabel={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
              }}
              control={control}
              name="title"
              placeholder={t('day_time')}
              rules={{
                ...requireField(t('this_field_required')),
              }}
              style={styles.textInputs}
            />
            <View
              style={{
                backgroundColor: '#E3E3E3',
                marginTop: scale(10),
                borderTopRightRadius: scale(5),
                borderBottomRightRadius: scale(5),
                justifyContent: 'center',
                width: '30%',
              }}>
              <CustomText
                textType="medium"
                style={{...styles.text2, alignSelf: 'center'}}>
                {t('day')}
              </CustomText>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <CustomInput
              styleTextLabel={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
                marginLeft: scale(30),
              }}
              control={control}
              name="title"
              placeholder={t('night_time')}
              rules={{
                ...requireField(t('this_field_required')),
              }}
              style={{...styles.textInputs}}
            />
            <View
              style={{
                backgroundColor: '#E3E3E3',
                marginTop: scale(10),
                borderTopRightRadius: scale(5),
                borderBottomRightRadius: scale(5),
                justifyContent: 'center',
                width: '30%',
              }}>
              <CustomText
                textType="medium"
                style={{...styles.text2, alignSelf: 'center'}}>
                {t('night')}
              </CustomText>
            </View>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('maximum_seat')}
            control={control}
            name="provincial"
            // placeholder={t('Provincial links')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <View style={{flexDirection: 'row'}}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
                flex: 1,
              }}>
              {t('check_in')}
            </CustomText>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
                flex: 1,
              }}>
              {t('check_out')}
            </CustomText>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setOpenCheckin(true)}
              style={{
                marginTop: scale(10),
                flex: 1,
              }}>
              <View
                style={{
                  backgroundColor: '#E3E3E3',
                  height: scale(40),
                  justifyContent: 'center',
                  borderRadius: scale(5),
                  width: '70%',
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{
                    ...styles.text1,
                    color: COLORS.black,
                    borderWidth: scale(0),
                  }}>
                  {timeCheckin.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </CustomText>
              </View>
              <DatePicker
                mode="time"
                modal
                open={openCheckin}
                date={timeCheckin}
                onConfirm={timeCheckin => {
                  setOpenCheckin(false);
                  setTimeCheckin(timeCheckin);
                }}
                onCancel={() => {
                  setOpenCheckin(false);
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOpenCheckout(true)}
              style={{
                marginTop: scale(10),
                flex: 1,
              }}>
              <View
                style={{
                  backgroundColor: '#E3E3E3',
                  height: scale(40),
                  justifyContent: 'center',
                  borderRadius: scale(5),
                  width: '70%',
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{
                    ...styles.text1,
                    color: COLORS.black,
                    borderWidth: scale(0),
                  }}>
                  {timeCheckout.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </CustomText>
              </View>
              <DatePicker
                mode="time"
                modal
                open={openCheckout}
                date={timeCheckout}
                onConfirm={timeCheckout => {
                  setOpenCheckout(false);
                  setTimeCheckout(timeCheckout);
                }}
                onCancel={() => {
                  setOpenCheckout(false);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewLocation}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('location')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewlocation && (
        <View style={styles.box}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
              alignSelf: 'flex-start',
            }}>
            {t('starting_gate')}
          </CustomText>
          <TouchableOpacity
            style={{
              height: scale(40),
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#E3E3E3',
              width: '100%',
              alignItems: 'center',
              borderRadius: scale(5),
              marginTop: scale(10),
              paddingHorizontal: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              Viet Nam
            </CustomText>
            <IconDown />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: scale(40),
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#E3E3E3',
              width: '100%',
              alignItems: 'center',
              borderRadius: scale(5),
              marginTop: scale(10),
              paddingHorizontal: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              Hue
            </CustomText>
            <IconDown />
          </TouchableOpacity>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
              alignSelf: 'flex-start',
            }}>
            {t('destination')}
          </CustomText>
          <TouchableOpacity
            style={{
              height: scale(40),
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#E3E3E3',
              width: '100%',
              alignItems: 'center',
              borderRadius: scale(5),
              marginTop: scale(10),
              paddingHorizontal: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              Viet Nam
            </CustomText>
            <IconDown />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: scale(40),
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#E3E3E3',
              width: '100%',
              alignItems: 'center',
              borderRadius: scale(5),
              marginTop: scale(10),
              paddingHorizontal: scale(10),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text,
                color: '#979797',
              }}>
              Hue
            </CustomText>
            <IconDown />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewPicture}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('picture_video')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewpicture && (
        <View style={styles.box}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(20),
              alignSelf: 'flex-start',
              // paddingHorizontal: scale(20),
            }}>
            {t('real_estate_images')}
          </CustomText>
          <CustomText
            textType="regular"
            style={{
              ...styles.text3,
              color: COLORS.black,
              alignSelf: 'flex-start',
              // paddingHorizontal: scale(20),
            }}>
            {t('update_image_to_maximum')}
          </CustomText>
          <View
            style={{
              alignSelf: 'flex-end',
              // paddingHorizontal: scale(20),
            }}>
            <TouchableOpacity onPress={pickImage}>
              <IconCamera />
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.textArea1,
              backgroundColor: '#E3E3E3',
              marginBottom: scale(10),
              width: '100%',
            }}>
            {selectedImage.length > 0 ? (
              <ImageDetail
                dataImg={selectedImage}
                styleWrapper={{flex: 1, backgroundColor: 'transparent'}}
              />
            ) : null}
          </View>
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('link_youtube')}
            control={control}
            name="youtube"
            placeholder={t('link_youtube')}
            // rules={{
            //   ...requireField(t('this_field_required')),
            // }}
            style={styles.textInput}
          />
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('link_tiktok')}
            control={control}
            name="tiktok"
            placeholder={t('link_tiktok')}
            // rules={{
            //   ...requireField(t('this_field_required')),
            // }}
            style={styles.textInput}
          />
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewPrice}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('price')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewprice && (
        <View style={styles.box}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              alignSelf: 'flex-start',
              marginTop: scale(10),
            }}>
            {t('price')}
          </CustomText>
          <View style={{flexDirection: 'row'}}>
            <CustomInput
              styleTextLabel={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
              }}
              control={control}
              name="price"
              placeholder={t('0')}
              rules={{
                ...requireField(t('this_field_required')),
              }}
              style={styles.textInputs}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#E3E3E3',
                marginTop: scale(10),
                borderTopRightRadius: scale(5),
                borderBottomRightRadius: scale(5),
                justifyContent: 'space-between',
                paddingHorizontal: scale(15),
                width: '30%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CustomText textType="medium" style={{...styles.text2}}>
                {t('USD')}
              </CustomText>
              <IconDown />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonCategories}
        onPress={viewContactinfo}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('contact_info')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewcontactinfo && (
        <View style={styles.box}>
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('name')}
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
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: scale(20),
        }}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text3,
            color: COLORS.black,
            width: '80%',
            alignSelf: 'flex-start',
            marginTop: scale(5),
          }}>
          {t('do_you_agree')}
        </CustomText>
        <TouchableOpacity onPress={toggleCheckBox1}>
          {check1 ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', marginBottom: scale(30)}}>
        <Button title={'Post'} onPress={handleSubmit(ok)} />
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
    fontSize: SIZES.medium,
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
    height: scale(250),
    overflow: 'hidden',
    justifyContent: 'space-between',
    marginTop: scale(10),
    width: '90%',
  },
  textArea: {
    flexDirection: 'row',
    borderWidth: scale(2),
    borderColor: '#E3E3E3',
    backgroundColor: '#E3E3E3',
    width: '100%',
    borderRadius: scale(5),
    height: scale(71),
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    marginTop: scale(10),
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
  textInput: {
    backgroundColor: '#E3E3E3',
    marginTop: scale(10),
    borderRadius: scale(5),
    // borderWidth: scale(0),
    width: '100%',
  },
  textInputs: {
    // backgroundColor: '#E3E3E3',
    borderTopRightRadius: scale(0),
    borderBottomRightRadius: scale(0),
    marginTop: scale(10),
    borderRadius: scale(5),
    // borderWidth: scale(0),
    width: '70%',
  },
});
