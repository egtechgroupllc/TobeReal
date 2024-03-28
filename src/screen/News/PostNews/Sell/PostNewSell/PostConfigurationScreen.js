import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainWrapper from '../../../../../components/MainWrapper';
import CustomText from '../../../../../components/CustomText';
import {COLORS, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import {IconViewablePassword} from '../../../../../assets/icon/Icon';

export default function PostConfigurationScreen() {
  const [select, setSelect] = useState(0);
  return (
    <MainWrapper>
      <View
        style={{
          width: '100%',
        }}>
        <CustomText textType="semiBold">Chọn loại tin đăng</CustomText>
        <FlatList
          contentContainerStyle={{
            columnGap: scale(10),
            padding: scale(10),
          }}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 4, 3]}
          horizontal
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => setSelect(index)}
                activeOpacity={0.7}
                style={{
                  width: scale(400 / 2.7),
                  minHeight: scale(160),
                  borderWidth: 1,
                  borderColor: select === index ? COLORS.primary : '#ddd',
                  borderRadius: scale(6),
                  padding: scale(10),
                  rowGap: scale(10),
                  backgroundColor: '#fff',
                  alignItems: 'center',
                }}>
                <CustomText textType="semiBold">Tin thường</CustomText>
                <CustomText>
                  Từ <CustomText textType="semiBold">2.073 đ</CustomText>
                  /ngày
                </CustomText>

                <View
                  style={{
                    rowGap: scale(4),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(8),
                    }}>
                    <IconViewablePassword />
                    <CustomText textType="semiBold">X12</CustomText>
                  </View>
                  <CustomText textType="semiBold">lượt xem tin</CustomText>
                </View>
                <CustomButton
                  buttonType="normal"
                  text="Chọn"
                  outline={select !== index}
                  styleWrapper={{
                    marginTop: 'auto',
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
