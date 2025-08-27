import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, scale, SHADOW, SIZES} from '../../../../../assets/constants';
import {
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../../../../components';
import {IconPioneZero, IconWallet} from '../../../../../assets/icon/Icon';
import {
  IconContract,
  IconId,
  IconShield,
  IconShieldBolt,
} from '@tabler/icons-react-native';
import {showMess} from '../../../../../assets/constants/Helper';
import {useNavigation} from '@react-navigation/native';

export default function VerifyBlockchainScreen() {
  const getShortenedContent = (text, start = 6, end = 4) => {
    if (!text || text.length <= start + end) return text;
    return `${text.slice(0, start)}...${text.slice(-end)}`;
  };
  const {navigate} = useNavigation();
  const ViewRow = ({title, icon, content, isShort}) => {
    return (
      <View style={{rowGap: scale(10)}}>
        <CustomText size={SIZES.small} textType="semiBold">
          {title}
        </CustomText>
        <View
          style={{
            backgroundColor: COLORS.grey50,
            padding: scale(10),
            borderRadius: scale(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <CustomText
            size={SIZES.small}
            textType="medium"
            numberOfLines={1}
            style={{width: '85%'}}>
            {isShort ? getShortenedContent(content, 20, 10) : content}
          </CustomText>
          <View>{icon}</View>
        </View>
      </View>
    );
  };
  return (
    <MainWrapper
      styleContent={{
        paddingHorizontal: scale(20),
        paddingVertical: scale(20),
        paddingBottom: scale(100),
      }}
      headerTitle={'Xác thực Blockchain'}>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(10),
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: scale(1),
              borderRadius: scale(10),
              borderColor: COLORS.white70,
              padding: scale(5),
              backgroundColor: COLORS.white,
            }}>
            <IconPioneZero />
          </View>
          <View>
            <CustomText size={SIZES.xMedium} textType="semiBold">
              Xác thực Blockchain Pione Zero
            </CustomText>
            <CustomText
              size={SIZES.small}
              textType="semiBold"
              color={COLORS.overlay}>
              Minh bạch mọi qui trình bất động sản
            </CustomText>
          </View>
        </View>
        <ViewRow
          icon={
            <IconWallet
              fill={COLORS.overlay}
              stroke={COLORS.grey}
              size={scale(20)}
            />
          }
          isShort
          title={'Địa chỉ ví blockchain'}
          content={'0xd49Bc8371c10e30E3b7fe2c368456d15263E172b'}
        />
        <ViewRow
          icon={
            <IconShield
              fill={'transparent'}
              size={scale(20)}
              stroke={COLORS.overlay}
            />
          }
          title={'Thao tác xác thực'}
          content={'Cập nhật tiến trình xây dựng'}
        />
        <ViewRow
          icon={
            <IconId
              fill={'transparent'}
              size={scale(20)}
              stroke={COLORS.overlay}
            />
          }
          isShort
          title={'ID bất động sản'}
          content={'236'}
        />
        <ViewRow
          icon={
            <IconContract
              fill={'transparent'}
              size={scale(20)}
              stroke={COLORS.overlay}
            />
          }
          isShort
          title={'Smart contract'}
          content={'0xeE1d4Fd92674E760aE82F38EE31622cA4D6C6249'}
        />
        <CustomButton
          text={'Xác thực blockchain'}
          onPress={() => {
            showMess('Xác thực thành công');
            setTimeout(() => {
              navigate('SellManagementScreen');
            }, 1000);
          }}
          iconLeft={IconShieldBolt}
          styleIcon={{
            color: COLORS.white,
          }}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.pioBox,
    flex: 1,
    minHeight: scale(300),
    padding: scale(12),
    borderRadius: scale(9),
    ...SHADOW,
    rowGap: scale(10),
    paddingBottom: scale(20),
  },
  numText: {
    fontSize: SIZES.small,
    position: 'absolute',
    top: scale(-20),
    right: 0,
    color: COLORS.black,
  },
  line: {
    backgroundColor: COLORS.grey,
    height: 1,
    width: '100%',
  },
});
