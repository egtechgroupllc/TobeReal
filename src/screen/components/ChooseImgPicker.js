import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

import {COLORS, scale} from '../../assets/constants';
import {IconCamera, IconError} from '../../assets/icon/Icon';
import CustomText from '../../components/CustomText';
import {arrayToObject} from '../../utils/arrayToObject';
import ImageDetail from './ImageDetail';
import {launchImageLibrary} from 'react-native-image-picker';

export default function ChooseImgPicker({
  title,
  subHeading,
  control,
  rules,
  name,
  stylesHeader,
  styleContentImg,
  onSelect,
  maxFiles = 10,
}) {
  const form = useForm();

  const pickImage = async (onChange, value) => {
    await launchImageLibrary(
      {mediaType: 'photo', selectionLimit: maxFiles},
      response => {
        if (response.assets) {
          const dataImages = response.assets.map(item => ({
            name: item.fileName,
            type: item.type,
            uri:
              Platform.OS === 'ios'
                ? item.uri.replace('file://', '')
                : item.uri,
          }));

          onChange(dataImages);
          onSelect && onSelect(dataImages);
        }
      },
    );
  };

  return (
    <Controller
      control={control || form?.control}
      rules={arrayToObject(rules)}
      name={name || ''}
      render={({field: {onChange, value = []}, fieldState: {error}}) => {
        return (
          <View style={{width: '100%', rowGap: scale(12)}}>
            <View style={[styles.header, stylesHeader]}>
              <View style={{flex: 1, columnGap: scale(10)}}>
                {title && (
                  <CustomText
                    textType="medium"
                    style={{
                      ...styles.text,
                      marginTop: scale(20),
                    }}>
                    {title}
                  </CustomText>
                )}
                {subHeading && (
                  <CustomText textType="regular" style={styles.text}>
                    {subHeading}
                  </CustomText>
                )}
              </View>

              <TouchableOpacity
                onPress={() => pickImage(onChange, value)}
                style={styles.icon}>
                <IconCamera />
              </TouchableOpacity>
            </View>

            <View style={{width: '100%'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => pickImage(onChange, value)}
                style={[
                  styles.contentImg,
                  styleContentImg,
                  error && {borderColor: '#f6465d'},
                ]}
                disabled={value.length > 0}>
                {value.length > 0 ? (
                  <ImageDetail
                    dataImg={value.map(item => item.uri)}
                    styleWrapper={{flex: 1, backgroundColor: 'transparent'}}
                  />
                ) : null}
              </TouchableOpacity>

              {error && (
                <View style={styles.errorBox}>
                  <IconError fill="#f0334b" />
                  <CustomText
                    style={{
                      color: '#f0334b',
                      flex: 1,
                    }}>
                    {error.message}
                  </CustomText>
                </View>
              )}
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },

  text: {
    color: COLORS.black,
    alignSelf: 'flex-start',
  },
  label: {
    color: COLORS.black,
  },
  contentImg: {
    borderWidth: scale(2),
    borderColor: '#E3E3E3',
    borderRadius: scale(8),
    height: scale(250),
    backgroundColor: '#E3E3E3',
    marginBottom: scale(10),
    width: '100%',
    overflow: 'hidden',
  },
  icon: {
    padding: scale(8),
    paddingHorizontal: scale(10),
    marginBottom: scale(-8),
    marginLeft: scale(-8),
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: scale(6),
  },
});
