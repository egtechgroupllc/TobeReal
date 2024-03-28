import React, {useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import {COLORS, scale} from '../../assets/constants';
import {IconCamera, IconError, IconX} from '../../assets/icon/Icon';
import {CustomInput} from '../../components';
import CustomImage from '../../components/CustomImage';
import CustomText from '../../components/CustomText';
import {arrayToObject} from '../../utils/arrayToObject';

export default function ChooseImgPicker({
  title,
  subHeading,
  control,
  rules,
  name,
  stylesHeader,
  styleContentImg,
  onSelect,
  maxFiles = 24,
}) {
  const form = useForm();

  const pickImage = async (onChange, value) => {
    await launchImageLibrary(
      {mediaType: 'photo', selectionLimit: maxFiles},
      response => {
        if (response.assets) {
          const dataImages = response.assets.map((item, index) => {
            return {
              name: new Date().getTime() + item.fileName,
              type: item.type,
              id: item.fileName + new Date().getTime(),
              description: '',
              uri:
                Platform.OS === 'ios'
                  ? item.uri.replace('file://', '')
                  : item.uri,
            };
          });

          onChange(dataImages);
          onSelect && onSelect(dataImages);
        }
      },
    );
  };
  const timer = useRef(null);

  const handleDescriptionChange = (
    index,
    description = '',
    value,
    onChange,
  ) => {
    const updatedValue = [...value];

    updatedValue[index] = {
      ...updatedValue[index],
      description: description,
    };

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = null;
      onChange(updatedValue);
    }, 300);
  };

  const handleDelete = (idImg, dataImg, onChange) => {
    const result = dataImg.filter(item => item?.id !== idImg);
    onChange(result);
  };

  return (
    <Controller
      control={control || form?.control}
      rules={arrayToObject(rules)}
      name={name || ''}
      render={({field: {onChange, value = []}, fieldState: {error}}) => {
        // console.log({value});
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

            <View
              style={{
                width: '99.3%',
                alignSelf: 'center',
                rowGap: scale(8),
              }}>
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
                  value.map((img, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: value.length <= 1 ? '98%' : '47%',
                          maxWidth: value.length <= 1 ? '100%' : scale(220),
                          height: scale(220),
                          rowGap: scale(10),
                        }}>
                        <CustomImage source={img?.uri} style={styles.img} />
                        <TouchableOpacity
                          onPress={() => handleDelete(img?.id, value, onChange)}
                          activeOpacity={0.7}
                          style={styles.delete}>
                          <IconX
                            fill={'#fff'}
                            style={{
                              width: scale(18),
                              height: scale(18),
                            }}
                          />
                        </TouchableOpacity>
                        <CustomInput
                          placeholder="Thêm mô tả"
                          style={{
                            height: scale(32),
                            borderRadius: scale(5),
                          }}
                          maxLength={45}
                          onChangeText={valueText =>
                            handleDescriptionChange(
                              index,
                              valueText,
                              value,
                              onChange,
                            )
                          }
                        />
                      </View>
                    );
                  })
                ) : (
                  <View
                    style={{
                      marginTop: '30%',
                      alignItems: 'center',
                    }}>
                    <IconCamera
                      style={{
                        width: scale(100),
                        height: scale(100),
                      }}
                    />

                    <CustomText>Bấm để chọn ảnh cần tải lên</CustomText>
                  </View>
                )}
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
    borderWidth: scale(1),
    borderStyle: 'dashed',
    borderColor: '#E3E3E3',
    borderRadius: scale(8),
    minHeight: scale(230),
    backgroundColor: '#fff',
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    paddingVertical: scale(6),
  },
  img: {
    width: '100%',
    height: '80%',
    borderRadius: scale(5),
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
  delete: {
    position: 'absolute',
    right: 0,
    padding: scale(4),
    backgroundColor: COLORS.overlay,
    borderRadius: scale(5),
  },
});
