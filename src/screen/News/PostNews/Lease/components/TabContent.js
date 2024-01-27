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
  IconAdd,
  IconCamera,
  IconCheckBoxWhite,
  IconDown,
  IconUnCheckBoxWhite,
} from '../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../components';
import Button from '../../../../Profile/components/Button';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Map from '../../../../Explore/components/DetailAccommodation/Map';
export default function TabContent() {
  const [selectedImage, setSelectedImage] = useState([]);
  const [openCheckin, setOpenCheckin] = useState(false);
  const [timeCheckin, setTimeCheckin] = useState(new Date());
  const [openCheckout, setOpenCheckout] = useState(false);
  const [timeCheckout, setTimeCheckout] = useState(new Date());
  const [roomTypes, setRoomTypes] = useState([]);
  const [description, setDescription] = useState('');
  const [realesate, setRealEsate] = useState('');
  // const [description, setDescription] = useState([]);
  // const [acreage, setAcreage] = useState([]);
  // const [price, setPrice] = useState([]);

  const handleDesciption = text => {
    setDescription(text);
  };
  const handleRealEsate = text => {
    setRealEsate(text);
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
          setSelectedImage(image);
          uploadImage(image.path);
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
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const toggleCheckBox = () => {
    setCheck(prevCheck => !prevCheck);
  };
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
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
          source={images.lease}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          Lease
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
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Real estate title
      </CustomText>
      <View style={styles.textArea}>
        <ScrollView>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Enter a desciption"
            value={realesate}
            onChangeText={handleRealEsate}
            style={{...styles.text, color: COLORS.black}}
          />
        </ScrollView>
        <Text style={{...styles.text, color: COLORS.black}}>
          {realesate.length}/{maxCharacters}
        </Text>
      </View>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Description content
      </CustomText>
      <View style={styles.textArea}>
        <ScrollView>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Enter a desciption"
            value={description}
            onChangeText={handleDesciption}
            style={{...styles.text, color: COLORS.black}}
          />
        </ScrollView>
        <Text style={{...styles.text, color: COLORS.black}}>
          {description.length}/{maxCharacters}
        </Text>
      </View>
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Contact Info
      </CustomText>
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
          width: '90%',
        }}
        placeholder="Full name"
      />
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
          width: '90%',
        }}
        placeholder="Phone"
      />
      <View style={{flexDirection: 'row'}}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text1,
            color: COLORS.black,
            marginTop: scale(20),
            width: '47%',
          }}>
          Country
        </CustomText>
        <TouchableOpacity
          style={{
            height: scale(40),
            paddingHorizontal: scale(15),
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#E3E3E3',
            width: '40%',
            alignItems: 'center',
            borderRadius: scale(5),
            marginTop: scale(10),
            marginLeft: scale(10),
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
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(10),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Address
      </CustomText>
      <CustomInput
        style={{
          height: scale(40),
          backgroundColor: '#E3E3E3',
          marginTop: scale(10),
          borderRadius: scale(5),
          borderWidth: scale(0),
          width: '90%',
        }}
        placeholder="Enter address"
      />
      {/* <Image
        source={images.map}
        style={{
          height: scale(323),
          width: '90%',
          alignSelf: 'center',
          marginTop: scale(20),
        }}></Image> */}
      <View style={{width: '100%', marginTop: scale(10)}}>
        <Map />
      </View>
      <View style={{flexDirection: 'row'}}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text1,
            color: COLORS.black,
            marginTop: scale(10),
            width: '45%',
          }}>
          Check in
        </CustomText>
        <CustomText
          textType="medium"
          style={{
            ...styles.text1,
            color: COLORS.black,
            marginTop: scale(10),
            width: '45%',
          }}>
          Check out
        </CustomText>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setOpenCheckin(true)}
          style={{
            marginTop: scale(10),
            width: '45%',
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
            width: '45%',
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
      <CustomText
        textType="medium"
        style={{
          ...styles.text1,
          color: COLORS.black,
          marginTop: scale(20),
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Real estate images
      </CustomText>
      <CustomText
        textType="regular"
        style={{
          ...styles.text3,
          color: COLORS.black,
          alignSelf: 'flex-start',
          paddingHorizontal: scale(20),
        }}>
        Update images to a maximum of two images
      </CustomText>
      <View
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: scale(20),
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
        }}>
        <View></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedImage.map(image => (
            <Image
              source={{uri: image.path}}
              style={{
                width: '100%',
                height: scale(200),
                marginBottom: scale(10),
                marginTop: scale(10),
              }}
            />
          ))}
        </ScrollView>
      </View>

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

      {roomTypes.map((room, index) => (
        <View key={index} style={styles.roomBox}>
          <View style={{width: '10%'}}>
            <Image
              source={images.sell}
              style={{width: scale(25), height: scale(25)}}
            />
          </View>
          <View style={{width: '80%'}}>
            <CustomText key={index}>{room.receivedRoomType}</CustomText>
          </View>
          <TouchableOpacity onPress={() => removeRoomType(index)}>
            <IconAdd />
          </TouchableOpacity>
        </View>
      ))}
      <View style={{width: '100%', marginBottom: scale(30)}}>
        <TouchableOpacity onPress={goAddRoom}>
          <LinearGradient
            colors={['#F7E75A', '#FFC702']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.buttonAdd}>
            <IconAdd />
            <CustomText textType="semiBold" style={styles.text2}>
              Add room type
            </CustomText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomText
          textType="medium"
          style={{
            ...styles.text3,
            color: COLORS.black,
            marginLeft: scale(-45),
            width: '70%',
            alignSelf: 'flex-start',
            marginTop: scale(10),
          }}>
          Do you want to deposit with the Vietnamese brokerage community of 10k
          people?
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
        <Button title={'Post'} onPress={ok} />
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
    fontSize: SIZES.medium,
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
    borderRadius: scale(5),
    height: scale(250),
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    marginTop: scale(10),
    width: '90%',
  },
  textArea: {
    flexDirection: 'row',
    borderWidth: scale(2),
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    width: '90%',
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
  text2: {
    fontSize: SIZES.medium,
  },
  roomBox: {
    width: '90%',
    borderRadius: scale(10),
    backgroundColor: '#EEEEEE',
    height: scale(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    marginBottom: scale(10),
  },
});
