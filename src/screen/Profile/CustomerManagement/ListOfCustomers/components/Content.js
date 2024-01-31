import {FlatList, Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {SIZES, images, scale} from '../../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import CategoriesButton from '../../../components/CategoriesButton';
import Header from '../../../components/Header';
import CustomText from '../../../../../components/CustomText';
import {IconNodata} from '../../../../../assets/icon/Icon';

export default function Content() {
  const data = [
    {
      id: 1,
      image: images.avatar,
      name: 'shome',
      content: 'content',
      status: 'done',
    },
    {
      id: 2,
      image: images.avatar,
      name: 'shome',
      content: 'content',
      status: 'done',
    },
    {
      id: 3,
      image: images.avatar,
      name: 'shome',
      content: 'content',
      status: 'done',
    },
    {
      id: 4,
      image: images.avatar,
      name: 'shome',
      content: 'content',
      status: 'done',
    },
  ];
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const onPress = () => {};
  const notify = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={'List of customers'}
        noti={true}
        onPress={goBack}
        notify={notify}
      />
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
                  flexDirection: 'row',
                  marginTop: scale(20),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#FADD55',
                  borderRadius: scale(10),
                  width: '90%',
                  height: scale(63),
                  alignSelf: 'center',
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
                        alignItems: 'center',
                        right: 35,
                      }}>
                      <CustomText textType="semiBold" style={styles.text2}>
                        {item?.name}
                      </CustomText>
                    </View>
                  )}
                  {item?.content && (
                    <View
                      style={{
                        width: scale(100),
                        alignItems: 'center',
                        right: 35,
                      }}>
                      <CustomText textType="medium">{item?.content}</CustomText>
                    </View>
                  )}
                </View>

                {item?.status && (
                  <View
                    style={{width: scale(50), alignItems: 'center', right: 15}}>
                    <CustomText textType="medium">{item?.status}</CustomText>
                  </View>
                )}
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
  },
  text: {
    fontSize: SIZES.small,
  },
  text1: {
    fontSize: SIZES.small,
    color: '#F0B90B',
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
    marginTop: scale(20),
    alignSelf: 'center',
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});
