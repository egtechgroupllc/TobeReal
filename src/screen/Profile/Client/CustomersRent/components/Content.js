import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import {CustomInput} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
export default function Content() {
  const data = [
    {
      id: 1,
      image: images.avatar,
      name: 'TobeReal',
      project: '2 bedroom apartment for rent',
      location: 'Ha Tien, Kieng Giang',
      content: 'abc',
    },
    {
      id: 2,
      image: images.avatar,
      name: 'TobeReal',
      project: '2 bedroom apartment for rent',
      location: 'Ha Tien, Kieng Giang',
      content: 'abc',
    },
    {
      id: 3,
      image: images.avatar,
      name: 'TobeReal',
      project: '2 bedroom apartment for rent',
      location: 'Ha Tien, Kieng Giang',
      content: 'abc',
    },
    {
      id: 4,
      image: images.avatar,
      name: 'TobeReal',
      project: '2 bedroom apartment for rent',
      location: 'Ha Tien, Kieng Giang',
      content: 'abc',
    },
  ];
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const notify = () => {};
  const Search = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={'Customers rent the project'}
        noti={true}
        onPress={goBack}
        notify={notify}></Header>
      <CustomText
        textType="semiBold"
        style={{
          ...styles.text,
          marginBottom: scale(10),
          marginTop: scale(60),
          color: COLORS.black,
        }}>
        Select Province/City:
      </CustomText>
      <CustomInput
        styleWrapper={{
          
          marginBottom: scale(25),
          height: scale(40),
          backgroundColor: '#E3E3E3',
        }}
      />
      <CustomText
        textType="medium"
        style={{...styles.text, marginBottom: scale(10), color: COLORS.black}}>
        Select District:
      </CustomText>
      <CustomInput
        styleWrapper={{
          
          marginBottom: scale(25),
          height: scale(40),
          backgroundColor: '#E3E3E3',
        }}
      />
      <Button title={'Search'} onPress={Search}/>
      <View style={{marginBottom: scale(50)}}>
        {data && data.length > 0 ? (
          <FlatList
            data={data}
            // horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View>
                <View
                  key={`${item?.id}`}
                  style={{
                    alignSelf:'center',
                    flexDirection: 'row',
                    marginTop: scale(20),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: scale(10),
                    width:'100%',
                    minHeight: scale(94),
                    borderWidth: scale(0.5),
                    borderColor: '#00000040',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 3,

                    elevation: 2,
                  }}>
                  {item?.image && (
                    <View
                      style={{
                        width: scale(50),
                        alignItems: 'center',
                        left: scale(10),
                      }}>
                      <Image
                        source={item?.image}
                        style={{width: scale(37), height: scale(37)}}></Image>
                    </View>
                  )}
                  <View>
                    {item?.name && (
                      <View
                        style={{
                          width: scale(100),
                        }}>
                        <CustomText textType="semiBold" style={styles.text2}>
                          {item?.name}
                        </CustomText>
                      </View>
                    )}
                    {item?.project && (
                      <View
                        style={{
                          width: scale(170),
                        }}>
                        <CustomText textType="semiBold" style={styles.text1}>
                          {item?.project}
                        </CustomText>
                      </View>
                    )}
                    {item?.location && (
                      <View
                        style={{
                          width: scale(170),
                        }}>
                        <CustomText textType="semiBold" style={styles.text1}>
                          Location: {item?.location}
                        </CustomText>
                      </View>
                    )}
                    {item?.content && (
                      <View
                        style={{
                          width: scale(100),
                        }}>
                        <CustomText textType="semiBold" style={styles.text1}>
                          Content: {item?.content}
                        </CustomText>
                      </View>
                    )}
                  </View>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        right: scale(15),
                        top: scale(10),
                      }}>
                      <LinearGradient
                        colors={['#F7E75A', '#FFC702']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={styles.button1}>
                        <CustomText
                          textType="bold"
                          style={{...styles.text2, color: COLORS.black}}>
                          Buy
                        </CustomText>
                      </LinearGradient>
                    </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: scale(150),
              width: scale(325),
            }}>
            <IconNodata />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    width:'90%'
  },
  text: {
    fontSize: SIZES.medium,
  },
  text1: {
    fontSize: SIZES.xSmall,
  },
  text2: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(40),
    width: scale(283),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button1: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(33),
    width: scale(74),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});
