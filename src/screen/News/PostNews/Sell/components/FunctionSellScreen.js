import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import ButtonPost from '../../../components/ButtonPost';
import {COLORS, images, scale} from '../../../../../assets/constants';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {
  IconClipboardTextFilled,
  IconHammer,
  IconHomeDollar,
  IconHomeRibbon,
  IconTool,
  IconTransferIn,
} from '@tabler/icons-react-native';
import {MainWrapper} from '../../../../../components';
import {IconHome} from '../../../../../assets/icon/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function FunctionSellScreen() {
  const {t} = useLanguage();
  const {navigate, setOptions} = useNavigation();
  useLayoutEffect(() => {
    return setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <MainWrapper
      styleContent={{paddingHorizontal: scale(20)}}
      headerTitle={'Cập nhật tiến trình truy xuất'}>
      <ButtonPost
        icon={
          <IconClipboardTextFilled size={scale(25)} fill={COLORS.overlay} />
        }
        style={{width: '100%'}}
        title={'Cập nhật tiến trình pháp lý'}
        styleText={{fontSize: scale(12)}}
        // onPress={goSell}
      />
      <ButtonPost
        icon={
          <IconHomeDollar
            size={scale(25)}
            fill={COLORS.grey}
            stroke={COLORS.overlay}
          />
        }
        style={{width: '100%'}}
        title={'Cập nhật quản lý cho thuê'}
        styleText={{fontSize: scale(12)}}
        // onPress={goSell}
      />
      <ButtonPost
        // image={images.rentbuy}
        icon={
          <IconHammer
            size={scale(25)}
            fill={COLORS.overlay}
            stroke={'transparent'}
          />
        }
        style={{width: '100%'}}
        title={'Cập nhật tiến trình xây dựng'}
        styleText={{fontSize: scale(12)}}
        onPress={() => navigate('UpdateBuildScreen')}
      />
      <ButtonPost
        icon={
          <IconTransferIn
            size={scale(25)}
            fill={'transparent'}
            stroke={COLORS.overlay}
          />
        }
        style={{width: '100%'}}
        title={'Chuyển nhượng quyền sở hữu'}
        styleText={{fontSize: scale(12)}}
        // onPress={goLease}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
