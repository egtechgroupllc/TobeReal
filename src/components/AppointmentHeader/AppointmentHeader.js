import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '~/assets/constants';
import {IconArrowLeft, IconHome, IconSearch} from '~/assets/icon/Icon';
import Button from '~/components/Button';
import CText from '~/components/CText';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import FilterMore from './components/FilterMore';
import TypeExamination from './components/TypeExamination';

export default function AppointmentHeader({
  onChangeText,
  title,
  backIcon,
  rightComponent,
  watch,
  setValue,
  search,
  filter,
  rightIcon,
  onPress,
  titleRight,
  styleText,
  onPressGoBack,
  Icon,
  fillIcon,
  colorIcon,
  doctor,
  isCount,
  count,
  styleCount,
  styleWrapper,
}) {
  const {t} = useLanguage();

  const {navigate, goBack} = useNavigation();

  return (
    <View
      style={{
        paddingVertical: scale(20),
        paddingHorizontal: scale(15),
        width: '100%',
        ...styleWrapper,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {backIcon ? (
          <Button.Icon
            padding={scale(0)}
            Icon={IconArrowLeft}
            fill={COLORS.White}
            onPress={() => {
              if (onPressGoBack) {
                onPressGoBack(); // Gọi onPressGoBack nếu có
              } else {
                goBack(); // Mặc định quay lại nếu không có onPressGoBack
              }
            }}
          />
        ) : (
          <View />
        )}
        {title && (
          <CText
            style={{
              color: COLORS.White,
              fontSize: SIZES.medium,
              textAlign: 'center',
            }}
            textType="semiBold">
            {title}
          </CText>
        )}
        {rightComponent ? (
          rightIcon ? (
            <Button.Icon
              Icon={Icon || IconHome}
              padding={scale(0)}
              onPress={onPress || (() => navigate('BottomTab'))}
              fill={fillIcon}
              color={colorIcon}
              isCount={isCount}
              count={count}
              styleCount={styleCount}
            />
          ) : (
            <Button.Text
              title={titleRight}
              padding={scale(0)}
              onPress={onPress}
              styleText={styleText}
            />
          )
        ) : (
          <View />
        )}
      </View>
      {search && (
        <Input
          styleContent={{
            ...styles.input,
            alignSelf: 'center',
            backgroundColor: COLORS.input,
            borderWidth: 0,
          }}
          sizeInput={'small'}
          placeholder={t('search')}
          placeholderTextColor={COLORS.grey}
          onChangeText={onChangeText}
          icon={IconSearch}
          propsIcon={{fill: COLORS.White}}
        />
      )}
      {filter && (
        <FilterMore
          onChangeText={onChangeText}
          watch={watch}
          setValue={setValue}
          doctor={doctor}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
