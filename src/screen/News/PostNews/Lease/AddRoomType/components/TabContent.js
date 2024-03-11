import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomText from '../../../../../../components/CustomText';
import {
  IconCamera,
  IconCheckBox,
  IconCheckBoxWhite,
  IconDown,
  IconRight,
  IconUnCheckBox,
  IconUnCheckBoxWhite,
} from '../../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../../components';
import Button from '../../../../../Profile/components/Button';
import LinearGradient from 'react-native-linear-gradient';
import SelectService from './SelectService';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  requireField,
  validateMaxAmount,
} from '../../../../../../utils/validate';
import {useForm} from 'react-hook-form';
import ListImg from '../../../../../Explore/components/DetailAccommodation/ListImg';
import ImageDetail from '../../../../../Explore/components/DetailAccommodation/ImageDetail';
import {useLanguage} from '../../../../../../hooks/useLanguage';
const dataRoomType = [
  {id: '1', name: 'Single'},
  {id: '2', name: 'Double'},
  {id: '3', name: 'Twin'},
  {id: '4', name: 'Triple'},
  {id: '5', name: 'Standard'},
  {id: '6', name: 'Deluxe'},
  {id: '7', name: 'Executive'},
  {id: '8', name: 'Superior'},
];
const dataBedType = [
  {id: '1', name: 'Single'},
  {id: '2', name: 'Double'},
  {id: '3', name: 'Twin'},
  {id: '4', name: 'Queen'},
  {id: '5', name: 'King'},
  {id: '6', name: 'One Single Bed'},
  {id: '7', name: 'One Double Bed'},
  {id: '8', name: 'One Queen Bed'},
  {id: '9', name: 'One King Bed'},
];
const dataRoomLaundry = [
  {id: '1', name: 'Internet Access Wifi'},
  {id: '2', name: 'Hair Dryer'},
  {id: '3', name: 'Dishwasher'},
  {id: '4', name: 'In Room Safe'},
  {id: '5', name: 'Mosquito Net'},
  {id: '6', name: 'Clothes Dryer'},
  {id: '7', name: 'Air Conditioning'},
  {id: '8', name: 'Ironing Facilities'},
  {id: '9', name: 'Microwave'},
];
const dataFoodDrink = [
  {id: '1', name: 'Complimentary Bottled Water'},
  {id: '2', name: 'Mini Bar'},
  {id: '3', name: 'Refrigerator'},
  {id: '4', name: 'Coffee Tea Maker'},
  {id: '5', name: 'Breakfast'},
  {id: '6', name: 'Lunch'},
  {id: '7', name: 'Dinner'},
];
const dataEntertainment = [
  {id: '1', name: 'Daily Newspaper'},
  {id: '2', name: 'Inhouse Movies'},
  {id: '3', name: 'In Room Video Games'},
  {id: '4', name: 'Television'},
  {id: '5', name: 'Dvd Cd Player'},
];
export default function TabContent() {
  const {t} = useLanguage();
  const {control, watch, handleSubmit} = useForm();
  const navigation = useNavigation();
  const route = useRoute();
  const [roomImage, setRoomImage] = useState([]);
  const [showRoomType, setShowRoomType] = useState('');
  const [showBedType, setShowBedType] = useState('');
  const [showRoomLaundry, setShowRoomLaundry] = useState('');
  const [showFoodDrink, setShowFoodDrink] = useState('');
  const [showEntertainment, setShowEntertainment] = useState('');
  const [roomType, setSelectedRoomCheckBox] = useState('');
  const [bedType, setSelectedBedCheckBox] = useState('');
  const [laundry, setSelectedLaundryCheckBox] = useState([]);
  const [food, setSelectedFoodCheckBox] = useState([]);
  const [entertainment, setSelectedEntertainmentCheckBox] =
    useState([]);
  const viewShowRoomType = () => {
    setShowRoomType(prevshowRoomType => !prevshowRoomType);
  };
  const RoomTypeCheckBox = name => {
    setSelectedRoomCheckBox(roomType === name ? '' : name);
    setShowRoomType(false);
  };
  const viewShowBedType = () => {
    setShowBedType(prevshowBedType => !prevshowBedType);
  };

  const BedTypeCheckBox = name => {
    setSelectedBedCheckBox(bedType === name ? '' : name);
    setShowBedType(false);
  };
  const viewShowRoomLaundry = () => {
    setShowRoomLaundry(prevshowRoomLaundry => !prevshowRoomLaundry);
  };

  const RoomLaundryCheckBox = name => {
    if (laundry.includes(name)) {
      setSelectedLaundryCheckBox(
        laundry.filter(item => item !== name),
      );
    } else {
      setSelectedLaundryCheckBox([...laundry, name]);
    }
  };
  const viewShowFoodDrink = () => {
    setShowFoodDrink(prevshowFoodDrink => !prevshowFoodDrink);
  };

  const FoodDrinkCheckBox = name => {
    if (food.includes(name)) {
      setSelectedFoodCheckBox(
        food.filter(item => item !== name),
      );
    } else {
      setSelectedFoodCheckBox([...food, name]);
    }
  };
  const viewShowEntertainment = () => {
    setShowEntertainment(prevshowEntertainment => !prevshowEntertainment);
  };

  const EntertainmentCheckBox = name => {
    if (entertainment.includes(name)) {
      setSelectedEntertainmentCheckBox(
        entertainment.filter(item => item !== name),
      );
    } else {
      setSelectedEntertainmentCheckBox([
        ...entertainment,
        name,
      ]);
    }
  };
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);
  const [breakfast, setBreakfast] = useState('');
  const toggleYes = () => {
    setYesChecked(true);
    setNoChecked(false);
  };

  const toggleNo = () => {
    setNoChecked(true);
    setYesChecked(false);
  };
  
  useEffect(() => {
    const breakfastInclude = () => {
      yesChecked ? setBreakfast('YES') : setBreakfast('NO');
    }
    breakfastInclude();
  }, [yesChecked]);

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

  const [viewphoto, setViewphoto] = useState(false);
  const viewPhoto = () => {
    setViewphoto(prevViewphoto => !prevViewphoto);
  };
  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: scale(300),
      height: scale(400),
      multiple: true,
      maxFiles: 100,
    }).then(image => {
      if (image) {
        setRoomImage(image.map(img => img.path));
      }
    });
  };
  const maxCharacters = 1000;
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
  };

  const ok = value => {
    // Pass the roomDetails back to the previous screen
    navigation.goBack();
    route.params.onOk({...value, roomImage, bedType, roomType, laundry, entertainment, food, breakfast});
  };
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
          {t('Add room')}
        </CustomText>
      </View>
      {/* <View style={styles.button}>
        <Image
          source={images.lease}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          Lease
        </CustomText>
      </View> */}
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
            label={t('room_title')}
            control={control}
            name="RoomTypeTitle"
            maxLength={1000}
            multiline
            numberOfLines={4}
            placeholder={t('enter_room_type')}
            rules={{
              ...requireField(t('this_field_required')),
              ...validateMaxAmount(1000, '1000 characters limit'),
            }}
            style={styles.textArea}
            componentRight={
              <Text style={{...styles.text, color: COLORS.black}}>
                {watch('RoomTypeTitle')?.length || 0}/{maxCharacters}
              </Text>
            }
          />
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
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewDetail}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('Room detail')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewdetail && (
        <View style={styles.box}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              alignSelf: 'flex-start',
              // paddingHorizontal: scale(20),
              marginTop: scale(10),
            }}>
            {t('Room type')}
          </CustomText>
          <TouchableOpacity
            style={
              !showRoomType ? styles.buttonEstateType : styles.buttonEstateTypes
            }
            onPress={viewShowRoomType}>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                paddingHorizontal: scale(20),
              }}>
              {roomType !== ''
                ? t(roomType)
                : t('Room type')}
            </CustomText>
          </TouchableOpacity>
          {showRoomType && (
            <FlatList
              data={dataRoomType}
              contentContainerStyle={styles.listEstateType}
              scrollEnabled={true}
              style={{
                height: scale(200),
                borderBottomLeftRadius: scale(10),
                borderBottomEndRadius: scale(10),
                borderBottomRightRadius: scale(10),
                width: '100%',
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: scale(25),
                    paddingVertical: scale(10),
                  }}
                  onPress={() => RoomTypeCheckBox(item.name)}>
                  <CustomText
                    textType="medium"
                    style={{
                      ...styles.text,
                      color: '#979797',
                    }}>
                    {item.name}
                  </CustomText>
                  {roomType === item.name ? (
                    <IconCheckBox />
                  ) : (
                    <IconUnCheckBox />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          )}
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              alignSelf: 'flex-start',
              // paddingHorizontal: scale(20),
              marginTop: scale(10),
            }}>
            {t('Bed type')}
          </CustomText>
          <TouchableOpacity
            style={
              !showBedType ? styles.buttonEstateType : styles.buttonEstateTypes
            }
            onPress={viewShowBedType}>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                paddingHorizontal: scale(20),
              }}>
              {bedType !== ''
                ? t(bedType)
                : t('Bed type')}
            </CustomText>
          </TouchableOpacity>
          {showBedType && (
            <FlatList
              data={dataBedType}
              contentContainerStyle={styles.listEstateType}
              scrollEnabled={true}
              style={{
                height: scale(200),
                borderBottomLeftRadius: scale(10),
                borderBottomEndRadius: scale(10),
                borderBottomRightRadius: scale(10),
                width: '100%',
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: scale(25),
                    paddingVertical: scale(10),
                  }}
                  onPress={() => BedTypeCheckBox(item.name)}>
                  <CustomText
                    textType="medium"
                    style={{
                      ...styles.text,
                      color: '#979797',
                    }}>
                    {item.name}
                  </CustomText>

                  {bedType === item.name ? (
                    <IconCheckBox />
                  ) : (
                    <IconUnCheckBox />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          )}
          <CustomInput
            styleTextLabel={{
              ...styles.text1,
              color: COLORS.black,
              marginTop: scale(10),
            }}
            label={t('acreage') + '(m2)'}
            control={control}
            name="acreage"
            placeholder={t('enter_the_land_area')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            style={styles.textInput}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomInput
              styleTextLabel={{
                ...styles.text1,
                color: COLORS.black,
                marginTop: scale(10),
              }}
              label={t('Room rate')}
              control={control}
              name="price"
              placeholder={t('enter_price')}
              rules={{
                ...requireField(t('this_field_required')),
              }}
              style={{
                height: scale(40),
                backgroundColor: '#E3E3E3',
                borderRadius: scale(5),
                // borderWidth: scale(0),
                width: '100%',
              }}
            />
          </View>
        </View>
      )}

      {/* <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
          marginTop: scale(10),
          marginBottom: scale(10),
        }}>
        {t('select_service')}
      </CustomText>
      <SelectService /> */}
      <TouchableOpacity
        style={styles.buttonCategories}
        onPress={viewFacilities}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('Room facilities')}
        </CustomText>
        <IconRight />
      </TouchableOpacity>
      {viewfacilities && (
        <View style={styles.box}>
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              alignSelf: 'flex-start',
              // paddingHorizontal: scale(20),
              marginTop: scale(10),
            }}>
            {t('Room & Laundry')}
          </CustomText>
          <TouchableOpacity
            style={
              !showRoomLaundry
                ? styles.buttonEstateType
                : styles.buttonEstateTypes
            }
            onPress={viewShowRoomLaundry}>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                paddingHorizontal: scale(20),
              }}>
              {t('Room & Laundry')}
            </CustomText>
          </TouchableOpacity>
          {showRoomLaundry && (
            <FlatList
              data={dataRoomLaundry}
              contentContainerStyle={styles.listEstateType}
              scrollEnabled={true}
              style={{
                height: scale(200),
                borderBottomLeftRadius: scale(10),
                borderBottomEndRadius: scale(10),
                borderBottomRightRadius: scale(10),
                width: '100%',
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => RoomLaundryCheckBox(item.name)}
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
                    }}>
                    {item.name}
                  </CustomText>
                  {laundry.includes(item.name) ? (
                    <IconCheckBox />
                  ) : (
                    <IconUnCheckBox />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          )}
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              alignSelf: 'flex-start',
              // paddingHorizontal: scale(20),
              marginTop: scale(10),
            }}>
            {t('Food & drink')}
          </CustomText>
          <TouchableOpacity
            style={
              !showFoodDrink
                ? styles.buttonEstateType
                : styles.buttonEstateTypes
            }
            onPress={viewShowFoodDrink}>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                paddingHorizontal: scale(20),
              }}>
              {t('Food & drink')}
            </CustomText>
          </TouchableOpacity>
          {showFoodDrink && (
            <FlatList
              data={dataFoodDrink}
              contentContainerStyle={styles.listEstateType}
              scrollEnabled={true}
              style={{
                height: scale(200),
                borderBottomLeftRadius: scale(10),
                borderBottomEndRadius: scale(10),
                borderBottomRightRadius: scale(10),
                width: '100%',
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => FoodDrinkCheckBox(item.name)}
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
                    }}>
                    {item.name}
                  </CustomText>
                  {food.includes(item.name) ? (
                    <IconCheckBox />
                  ) : (
                    <IconUnCheckBox />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          )}
          <CustomText
            textType="medium"
            style={{
              ...styles.text1,
              color: COLORS.black,
              alignSelf: 'flex-start',
              // paddingHorizontal: scale(20),
              marginTop: scale(10),
            }}>
            {t('Entertainment')}
          </CustomText>
          <TouchableOpacity
            style={
              !showEntertainment
                ? styles.buttonEstateType
                : styles.buttonEstateTypes
            }
            onPress={viewShowEntertainment}>
            <CustomText
              textType="regular"
              style={{
                ...styles.text,
                color: COLORS.black,
                paddingHorizontal: scale(20),
              }}>
              {t('Entertainment')}
            </CustomText>
          </TouchableOpacity>
          {showEntertainment && (
            <FlatList
              data={dataEntertainment}
              contentContainerStyle={styles.listEstateType}
              scrollEnabled={true}
              style={{
                height: scale(200),
                borderBottomLeftRadius: scale(10),
                borderBottomEndRadius: scale(10),
                borderBottomRightRadius: scale(10),
                width: '100%',
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => EntertainmentCheckBox(item.name)}
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
                    }}>
                    {item.name}
                  </CustomText>
                  {entertainment.includes(item.name) ? (
                    <IconCheckBox />
                  ) : (
                    <IconUnCheckBox />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          )}
          <View
            style={{
              marginTop: scale(10),
              columnGap: scale(30),
              alignSelf: 'flex-start',
              // paddingHorizontal: scale(20),
            }}>
            <CustomText
              textType="medium"
              style={{
                ...styles.text1,
                color: COLORS.black,
              }}>
              {t('Breakfast included')}
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '50%',
                marginTop: scale(10),
              }}>
              <TouchableOpacity
                onPress={toggleYes}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText
                  textType="medium"
                  style={{
                    ...styles.text,
                    color: COLORS.black,
                    marginRight: scale(10),
                  }}>
                  {t('YES')}
                </CustomText>
                {yesChecked ? <IconCheckBox /> : <IconUnCheckBox />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleNo}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText
                  textType="medium"
                  style={{
                    ...styles.text,
                    color: COLORS.black,
                    marginRight: scale(10),
                  }}>
                  {t('NO')}
                </CustomText>
                {noChecked ? <IconCheckBox /> : <IconUnCheckBox />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.buttonCategories} onPress={viewPhoto}>
        <CustomText textType="medium" style={{...styles.text1}}>
          {t('Room photos')}
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
            {t('Room photos')}
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
            {roomImage.length > 0 ? (
              <ImageDetail
                dataImg={roomImage}
                styleWrapper={{flex: 1, backgroundColor: 'transparent'}}
              />
            ) : null}
          </TouchableOpacity>
        </View>
      )}

      {/* <ListImg  open dataImg={roomImage}/> */}
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
      {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      </View> */}
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
      <View
        style={{width: '100%', marginBottom: scale(30), marginTop: scale(40)}}>
        <Button title={t('confirm')} onPress={handleSubmit(ok)} />
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
  textInput: {
    backgroundColor: '#E3E3E3',
    marginTop: scale(10),
    borderRadius: scale(5),
    // borderWidth: scale(0),
    width: '100%',
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
  text: {
    fontSize: SIZES.small,
  },
  buttonAdd: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(30),
    width: '60%',
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
    flexDirection: 'row',
    columnGap: scale(30),
  },
  buttonBed: {
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    borderRadius: scale(10),
    width: '90%',
    height: scale(40),
    justifyContent: 'center',
  },
  buttonBeds: {
    borderTopLeftRadius: scale(10),
    borderTopEndRadius: scale(10),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    width: '90%',
    height: scale(40),
    justifyContent: 'center',
  },
  listBed: {
    borderBottomLeftRadius: scale(10),
    borderBottomEndRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
    backgroundColor: '#EEEEEE',
    // justifyContent: 'center',
    width: '90%',
    minHeight: scale(100),
  },
  text2: {
    fontSize: SIZES.medium,
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
    minHeight: scale(100),
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
});
