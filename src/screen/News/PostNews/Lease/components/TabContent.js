import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../../../../components/CustomText';
import {
  IconAdd,
  IconCamera,
  IconCheckBox,
  IconCheckBoxWhite,
  IconDown,
  IconRight,
  IconUnCheckBox,
  IconUnCheckBoxWhite,
  IconX,
} from '../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../components';
import Button from '../../../../Profile/components/Button';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Map from '../../../../Explore/components/DetailAccommodation/Map';
import {requireField, validateMaxAmount} from '../../../../../utils/validate';
import {useForm} from 'react-hook-form';
import ImageDetail from '../../../../Explore/components/DetailAccommodation/ImageDetail';
import {useLanguage} from '../../../../../hooks/useLanguage';
const dataRealEstateType = [
  {id: '1', name: 'Hotel'},
  {id: '2', name: 'Hostel'},
  {id: '3', name: 'Villa'},
  {id: '4', name: 'Resort'},
  {id: '5', name: 'Apartment'},
  {id: '6', name: 'Homestay'},
];
const dataFacilities = [
  {
    id: '1',
    name: 'Common',
    include: [
      {title: 'Parking Area'},
      {title: 'Room Service'},
      {title: 'Safety Deposit Box'},
      {title: 'Coffee Shop'},
      {title: 'Restaurant'},
    ],
  },
  {
    id: '2',
    name: 'Accessibility',
    include: [
      {title: 'Accessible Bathroom'},
      {title: 'Accessible Parking'},
      {title: 'Roll In Shower'},
    ],
  },
  {
    id: '3',
    name: 'Business',
    include: [
      {title: 'Business Center'},
      {title: 'Meeting Facilities'},
      {title: 'Computer Station'},
    ],
  },
  {
    id: '4',
    name: 'Connectivity',
    include: [{title: 'Wifi Free'}, {title: 'Wifi Public Area Surcharge'}],
  },
  {
    id: '5',
    name: 'Facilities',
    include: [
      {title: 'Family Room'},
      {title: 'Smoking Area'},
      {title: 'Air Conditioning'},
    ],
  },
];
export default function TabContent() {
  const {t} = useLanguage();
  const {control, watch, handleSubmit} = useForm();

  const [selectedImage, setSelectedImage] = useState([]);
  const [openCheckin, setOpenCheckin] = useState(false);
  const [timeCheckin, setTimeCheckin] = useState(new Date());
  const [openCheckout, setOpenCheckout] = useState(false);
  const [timeCheckout, setTimeCheckout] = useState(new Date());
  const [roomTypes, setRoomTypes] = useState([]);
  const [showRealEstateType, setShowRealEstateType] = useState('');
  const [showFacilities, setshowFacilities] = useState('');
  const [showFacilitiesItem, setshowFacilitiesItem] = useState('');
  const [selectedEstateCheckBox, setSelectedEstateCheckBox] = useState('');
  const [selectedFaciCheckBox, setSelectedFaciCheckBox] = useState([]);
  const [dataEstateType, setDataEstateType] = useState(dataRealEstateType);
  const [dataFaci, setDataFaci] = useState(dataFacilities);

  const [viewgeneral, setViewgeneral] = useState(false);
  const viewGeneral = () => {
    setViewgeneral(prevViewgeneral => !prevViewgeneral);
  };

  const [viewdetail, setViewdetail] = useState(false);
  const viewDetail = () => {
    setViewdetail(prevViewdetail => !prevViewdetail);
  };

  const [viewfacilities, setViewfacilities] = useState(false);
  const viewFacilities = () => {
    setViewfacilities(prevViewfacilities => !prevViewfacilities);
  };

  const [viewcontactinfo, setViewcontactinfo] = useState(false);
  const viewContactinfo = () => {
    setViewcontactinfo(prevViewcontactinfo => !prevViewcontactinfo);
  };

  const [viewroom, setViewroom] = useState(false);
  const viewRoom = () => {
    setViewroom(prevViewroom => !prevViewroom);
  };

  const [viewphoto, setViewphoto] = useState(false);
  const viewPhoto = () => {
    setViewphoto(prevViewphoto => !prevViewphoto);
  };
  const [viewpayment, setViewpayment] = useState(false);
  const viewPayment = () => {
    setViewpayment(prevViewpayment => !prevViewpayment);
  };

  const estateTypeCheckBox = name => {
    setSelectedEstateCheckBox(selectedEstateCheckBox === name ? '' : name);
    setShowRealEstateType(false);
  };
  const facilitiesCheckBox = name => {
    if (selectedFaciCheckBox.includes(name)) {
      setSelectedFaciCheckBox(
        selectedFaciCheckBox.filter(item => item !== name),
      );
    } else {
      setSelectedFaciCheckBox([...selectedFaciCheckBox, name]);
    }
  };
  // console.log(selectedFaciCheckBox);
  const viewShowRealEstateType = () => {
    setShowRealEstateType(prevshowRealEstateType => !prevshowRealEstateType);
  };
  const viewShowFacilities = () => {
    setshowFacilities(prevshowRealEstateType => !prevshowRealEstateType);
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
  const maxCharacters = 1000;
  const navigation = useNavigation();
  const [check1, setCheck1] = useState(false);
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
  };
  const goContract = () => {
    navigation.navigate('ContractScreen');
  };
  const goAddRoom = () => {
    navigation.navigate('AddRoomTypeScreen', {onOk: handleOk});
  };
  const handleOk = receivedRoomDetails => {
    // Update the state by adding the new roomDetails to the existing array
    setRoomTypes(prevRoomTypes => [...prevRoomTypes, receivedRoomDetails]);
  };
  console.log(roomTypes);
  const removeRoomType = index => {
    setRoomTypes(prevRoomTypes => {
      const updatedRoomTypes = [...prevRoomTypes];
      updatedRoomTypes.splice(index, 1);
      return updatedRoomTypes;
    });
  };
  // const ok = value => {
  //   console.log(value);
  // };

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
          source={images.lease}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          {t('lease')}
        </CustomText>
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
            Real estate
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCheckBox1} style={styles.buttonSmall}>
          {check1 ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
          <CustomText
            textType="medium"
            style={{...styles.text1, color: COLORS.white}}>
            Land for sale
          </CustomText>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewGeneral}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('general_information')}
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
            label={t('real_estate_title')}
            control={control}
            name="RealEstateTitle"
            multiline
            numberOfLines={4}
            maxLength={1000}
            placeholder={t('enter_real_estate_title')}
            rules={{
              ...requireField(t('this_field_required')),
              ...validateMaxAmount(1000, '1000 characters limit'),
            }}
            style={styles.textArea}
            componentRight={
              <Text style={{...styles.text, color: COLORS.black}}>
                {watch('RealEstateTitle')?.length || 0}/{maxCharacters}
              </Text>
            }
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
            label={t('description_content')}
            control={control}
            name="Description"
            maxLength={1000}
            multiline
            numberOfLines={4}
            placeholder={t('enter_a_description')}
            rules={{
              ...requireField(t('this_field_required')),
              ...validateMaxAmount(1000, '1000 characters limit'),
            }}
            style={styles.textArea}
            componentRight={
              <Text style={{...styles.text, color: COLORS.black}}>
                {watch('Description')?.length || 0}/{maxCharacters}
              </Text>
            }
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
            label={t('address')}
            control={control}
            name="address"
            placeholder={t('address')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View style={{width: '110%'}}>
            <Map />
          </View>
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
                marginTop: scale(20),
                flex: 1,
              }}>
              {t('country')}
            </CustomText>
            <TouchableOpacity
              style={{
                height: scale(40),
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#E3E3E3',
                width: '40%',
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
                USA
              </CustomText>
              <IconDown />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              alignSelf: 'flex-start',
              // paddingHorizontal: scale(20),
              marginTop: scale(10),
            }}>
            {t('real_estate_type')}
          </CustomText>
          <TouchableOpacity
            style={
              !showRealEstateType
                ? styles.buttonEstateType
                : styles.buttonEstateTypes
            }
            onPress={viewShowRealEstateType}>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                paddingHorizontal: scale(20),
              }}>
              {selectedEstateCheckBox !== ''
                ? t(selectedEstateCheckBox)
                : t('real_estate_type')}
            </CustomText>
          </TouchableOpacity>
          {showRealEstateType && (
            <FlatList
              data={dataEstateType}
              contentContainerStyle={styles.listEstateType}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: scale(25),
                    paddingVertical: scale(10),
                  }}>
                  <CustomText
                    textType="medium"
                    style={{
                      ...styles.text,
                      color: '#979797',
                      width: '50%',
                    }}>
                    {item.name}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => estateTypeCheckBox(item.name)}
                    style={{width: '40%', alignItems: 'center'}}>
                    {selectedEstateCheckBox === item.name ? (
                      <IconCheckBox />
                    ) : (
                      <IconUnCheckBox />
                    )}
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewDetail}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('estate_detail')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewdetail && (
        <View style={styles.box}>
          <View style={{flexDirection: 'row'}}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(20),
                flex: 1,
              }}>
              {t('Main Currency')}
            </CustomText>
            <View
              style={{
                height: scale(40),
                flexDirection: 'row',
                justifyContent: 'center',
                // backgroundColor: '#E3E3E3',
                flex: 1,
                alignItems: 'center',
                // borderRadius: scale(5),
                marginTop: scale(10),
              }}>
              <CustomText
                textType="medium"
                style={{
                  ...styles.text,
                  color: '#979797',
                }}>
                Vietnam Dong (VND)
              </CustomText>
            </View>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
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
                marginTop: scale(20),
                // flex: 1,
              }}>
              {t('distance_to_city')}
            </CustomText>
            <View
              style={{
                height: scale(40),
                // flexDirection: 'row',
                justifyContent: 'center',
                // backgroundColor: '#E3E3E3',
                // flex: 1,
                alignItems: 'center',
                // borderRadius: scale(5),
                marginTop: scale(10),
                width: '100%',
              }}>
              <CustomInput
                styleTextLabel={{
                  ...styles.text1,
                  color: COLORS.black,
                  marginTop: scale(10),
                }}
                control={control}
                name="km"
                placeholder={t('KM')}
                rules={{
                  ...requireField(t('this_field_required')),
                }}
                style={{...styles.textInput}}
              />
            </View>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(20),
              borderColor: '#F0B90B',
            }}></View>
          <View>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(20),
                // flex: 1,
              }}>
              {t('number_of_floors')}
            </CustomText>
            <View
              style={{
                height: scale(40),
                // flexDirection: 'row',
                justifyContent: 'center',
                // backgroundColor: '#E3E3E3',
                // flex: 1,
                alignItems: 'center',
                // borderRadius: scale(5),
                marginTop: scale(10),
                width: '100%',
              }}>
              <CustomInput
                styleTextLabel={{
                  ...styles.text1,
                  color: COLORS.black,
                  marginTop: scale(10),
                }}
                control={control}
                name="floor"
                placeholder={t('floors')}
                rules={{
                  ...requireField(t('this_field_required')),
                }}
                style={{...styles.textInput}}
              />
            </View>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonCategories}
        onPress={viewFacilities}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('estate_facilities')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewfacilities && (
        <View style={styles.box}>
          <TouchableOpacity
            style={
              !showFacilities
                ? styles.buttonEstateType
                : styles.buttonEstateTypes
            }
            onPress={viewShowFacilities}>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                paddingHorizontal: scale(20),
              }}>
              {t('estate_facilities')}
            </CustomText>
          </TouchableOpacity>
          {showFacilities && (
            <FlatList
              data={dataFaci}
              contentContainerStyle={styles.listFacilities}
              scrollEnabled={false}
              renderItem={({item, index}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setshowFacilitiesItem(index);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: scale(25),
                        paddingVertical: scale(10),
                        backgroundColor: '#EEEEEE',
                        borderTopWidth: scale(index == 0 ? 0 : 1),
                      }}>
                      <CustomText
                        textType="medium"
                        style={{
                          ...styles.text,
                          color: '#979797',
                          width: '90%',
                        }}>
                        {item.name}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                  {index == showFacilitiesItem &&
                    item.include &&
                    item.include.length > 0 && (
                      <View
                        style={{
                          paddingHorizontal: scale(25),
                          paddingVertical: scale(5),
                        }}>
                        {item.include.map((nestedItem, index) => (
                          <TouchableOpacity
                            onPress={() => facilitiesCheckBox(nestedItem.title)}
                            style={{
                              paddingVertical: scale(5),
                              // backgroundColor: 'red',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              // paddingHorizontal: scale(10),
                              alignItems: 'center',
                            }}
                            key={index}>
                            <CustomText>{nestedItem.title}</CustomText>
                            {selectedFaciCheckBox.includes(nestedItem.title) ? (
                              <IconCheckBox />
                            ) : (
                              <IconUnCheckBox />
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                </View>
              )}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonCategories}
        onPress={viewContactinfo}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('estate_contact')}
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
            label={t('contact_info')}
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
            name="email"
            placeholder={t('email')}
            rules={{
              ...requireField('This field is required'),
            }}
            style={styles.textInput}
          />
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewRoom}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('rooms')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewroom && (
        <View style={styles.box}>
          {roomTypes.map((room, index) => (
            <View key={index} style={styles.roomBox}>
              <View style={{width: '10%'}}>
                <Image
                  source={images.lease}
                  style={{width: scale(25), height: scale(25)}}
                />
              </View>
              <View style={{width: '75%'}}>
                <CustomText key={index}>{room.RoomTypeTitle}</CustomText>
              </View>
              <TouchableOpacity onPress={() => removeRoomType(index)}>
                <IconX style={{width: scale(20), height: scale(20)}} />
              </TouchableOpacity>
            </View>
          ))}
          <View style={{width: '100%'}}>
            <TouchableOpacity onPress={goAddRoom}>
              <LinearGradient
                colors={['#F7E75A', '#FFC702']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.buttonAdd}>
                <IconAdd />
                <CustomText textType="semiBold" style={styles.text2}>
                  {t('add_room')}
                </CustomText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewPhoto}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('estate_photo')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewphoto && (
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
          <TouchableOpacity
            onPress={pickImage}
            style={{
              ...styles.textArea1,
              backgroundColor: '#E3E3E3',
              marginBottom: scale(10),
              width: '100%',
            }}>
            {/* <View></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedImage.map((image, index) => (
            <Image
              key={index}
              source={{uri: image.path}}
              style={{
                width: '100%',
                height: scale(200),
                marginBottom: scale(10),
                marginTop: scale(10),
              }}
            />
          ))}
        </ScrollView> */}
            {selectedImage.length > 0 ? (
              <ImageDetail
                dataImg={selectedImage}
                styleWrapper={{flex: 1, backgroundColor: 'transparent'}}
              />
            ) : null}
          </TouchableOpacity>
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
            label={t('Link youtube')}
            control={control}
            name="youtube"
            placeholder={t('Link youtube')}
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
            label={t('Link tiktok')}
            control={control}
            name="tiktok"
            placeholder={t('Link tiktok')}
            // rules={{
            //   ...requireField(t('this_field_required')),
            // }}
            style={styles.textInput}
          />
        </View>
      )}

      {/* <Image
        source={images.map}
        style={{
          height: scale(323),
          width: '90%',
          alignSelf: 'center',
          marginTop: scale(20),
        }}></Image> */}

      {/* <TouchableOpacity
        style={{
          marginTop: scale(10),
          flexDirection: 'row',
          alignSelf: 'flex-start',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text,
            color: COLORS.black,
            paddingHorizontal: scale(20),
            marginTop: scale(10),
          }}>
          Detailed information
        </CustomText>
        <IconDown />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewPayment}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('payment_information')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewpayment && (
        <View style={styles.box}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(20),
              alignSelf: 'flex-start',
            }}>
            {t('bank_name')}
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
              Select
            </CustomText>
            <IconDown />
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(10),
              borderColor: '#F0B90B',
            }}></View>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(20),
              alignSelf: 'flex-start',
            }}>
            {t('account_number')}
          </CustomText>
          <View
            style={{
              height: scale(40),
              // flexDirection: 'row',
              justifyContent: 'center',
              // backgroundColor: '#E3E3E3',
              // flex: 1,
              alignItems: 'center',
              // borderRadius: scale(5),
              marginTop: scale(10),
              width: '100%',
            }}>
            <CustomInput
              styleTextLabel={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
              }}
              control={control}
              name="AccountNumber"
              rules={{
                ...requireField(t('this_field_required')),
              }}
              style={{...styles.textInput}}
            />
          </View>
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              marginTop: scale(20),
              borderColor: '#F0B90B',
            }}></View>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(20),
              alignSelf: 'flex-start',
            }}>
            {t('account_holder')}
          </CustomText>
          <View
            style={{
              height: scale(40),
              // flexDirection: 'row',
              justifyContent: 'center',
              // backgroundColor: '#E3E3E3',
              // flex: 1,
              alignItems: 'center',
              // borderRadius: scale(5),
              marginTop: scale(10),
              width: '100%',
            }}>
            <CustomInput
              styleTextLabel={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
              }}
              control={control}
              name="AccountHolder"
              rules={{
                ...requireField(t('this_field_required')),
              }}
              style={{...styles.textInput}}
            />
          </View>
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
        <Button title={t('post')} onPress={handleSubmit(goContract)} />
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
  textInput: {
    backgroundColor: '#E3E3E3',
    marginTop: scale(10),
    borderRadius: scale(5),
    // borderWidth: scale(0),
    width: '100%',
  },
  text: {
    fontSize: SIZES.small,
  },
  buttonAdd: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(30),
    width: '100%',
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
    flexDirection: 'row',
    columnGap: scale(30),
  },
  text2: {
    fontSize: SIZES.medium,
  },
  roomBox: {
    width: '100%',
    borderRadius: scale(10),
    backgroundColor: '#EEEEEE',
    height: scale(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    marginTop: scale(10),
  },
  buttonEstateType: {
    marginTop: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    borderRadius: scale(10),
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    // backgroundColor:'#E3E3E3'
  },
  buttonEstateTypes: {
    marginTop: scale(20),
    borderTopLeftRadius: scale(10),
    borderTopEndRadius: scale(10),
    borderTopRightRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    // backgroundColor:'#E3E3E3'
  },
  listEstateType: {
    borderBottomLeftRadius: scale(10),
    borderBottomEndRadius: scale(10),
    borderBottomRightRadius: scale(10),
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    width: '120%',
    minHeight: scale(100),
  },
  listFacilities: {
    borderBottomLeftRadius: scale(10),
    borderBottomEndRadius: scale(10),
    borderBottomRightRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    width: '109%',
    minHeight: scale(100),
  },
});
