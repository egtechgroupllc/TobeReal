import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {Button, CImage, CText} from '~/components';
import {
  IconEditProfile,
  IconLocation,
  IconPhone,
  IconTrash,
} from '~/assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '~/hooks/useLanguage';

export default function FacilityItem({data, onPress}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const TextRow = ({title, icon}) => {
    return (
      <View
        style={{flexDirection: 'row', columnGap: scale(10), width: scale(185)}}>
        {icon}
        <CText style={{color: COLORS.White}} numberOfLines={2}>
          {title}
        </CText>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.input,
        borderRadius: scale(10),
        padding: scale(10),
        rowGap: scale(10),
        minHeight: scale(100),
        flexDirection: 'row',
        columnGap: scale(10),
      }}>
      <View
        style={{
          backgroundColor:
            data?.status === 'APPROVED'
              ? COLORS.green
              : data?.status === 'WAITING'
              ? COLORS.yellow
              : COLORS.error,
          padding: scale(5),
          borderRadius: scale(5),
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
        }}>
        <CText style={{color: COLORS.White}}>{data?.status}</CText>
      </View>
      <CImage
        source={{uri: data?.files}}
        style={{
          width: scale(120),
          height: scale(100),
          borderRadius: scale(10),
          backgroundColor: COLORS.input,
        }}
        resizeMode="contain"
      />
      <View style={{rowGap: scale(10)}}>
        <CText
          style={{
            color: COLORS.White,
            fontSize: SIZES.xMedium,
            width: '80%',
          }}
          textType="bold">
          {data?.name}
        </CText>
        <TextRow
          title={data?.phone}
          icon={<IconPhone fill={COLORS.White} width={12} height={12} />}
        />
        <TextRow
          title={data?.address}
          icon={<IconLocation fill={COLORS.White} width={15} height={15} />}
        />
        <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '50%'}}>
              <Button
                onPress={() => {
                  navigate('CreateMedicalFacilityScreen', {
                    ...data,
                    update: true,
                  });
                }}
                title={t('update')}
                sizeButton="small"
                Icon={IconEditProfile}
                iconProps={{
                  width: scale(12),
                  height: scale(12),
                }}
              />
            </View>
            <Button.Icon
              onPress={onPress}
              Icon={IconTrash}
              style={{backgroundColor: COLORS.White}}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
