import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';

import {COLORS, SIZES, scale} from '../../assets/constants';
import {IconCamera, IconError} from '../../assets/icon/Icon';
import CustomText from '../../components/CustomText';
import {arrayToObject} from '../../utils/arrayToObject';
import ImgItem from './ChooseImg/ImgItem';

export default function ChooseImgPicker({
  title,
  subHeading,
  control,
  rules,
  name,
  stylesHeader,
  styleContentImg,
  onSelect,
  onDelete,
  maxFiles = 24,
  isDescriptionImg = true,
  defaultValue,
  isAddMore = true,
  isAddWhenEmpty = false,
}) {
  const form = useForm();
  const [viewImg, setViewImg] = useState(false);

  const pickImage = async (onChange, value) => {
    await launchImageLibrary(
      {mediaType: 'photo', selectionLimit: maxFiles},
      response => {
        if (response.assets) {
          const dataImages = response.assets.map((item, index) => {
            const timeNu = new Date().getTime();
            return {
              name: timeNu + item.fileName,
              type: item.type,
              id: index + timeNu,
              description: '',
              uri:
                Platform.OS === 'ios'
                  ? item.uri.replace('file://', '')
                  : item.uri,
            };
          });

          onChange(isAddMore ? [...dataImages, ...value] : dataImages);
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
    onDelete && onDelete(idImg, dataImg);
    const result = dataImg.filter(item => item?.id !== idImg);
    onChange(result);
  };

  return (
    <Controller
      control={control || form?.control}
      rules={arrayToObject(rules)}
      name={name || ''}
      defaultValue={defaultValue}
      render={({field: {onChange, value = []}, fieldState: {error}}) => {
        const valueImg = value;
        const isShow = isAddWhenEmpty && valueImg.length <= 0;

        return (
          !isShow && (
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

                {title && (
                  <TouchableOpacity
                    onPress={() => pickImage(onChange, valueImg)}
                    style={styles.icon}>
                    <IconCamera />
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  width: '99.6%',
                  alignSelf: 'center',
                  rowGap: scale(8),
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => pickImage(onChange, valueImg)}
                  style={[
                    styles.contentImg,
                    (valueImg.length <= 0 || error) && styles.border,
                    valueImg.length <= 0 && {alignItems: 'center'},
                    styleContentImg,
                    error && {borderColor: '#f6465d'},
                  ]}
                  disabled={valueImg.length > 0}>
                  {valueImg.length > 0 && isAddMore && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => pickImage(onChange, valueImg)}
                      style={[styles.img, styles.border, styles.addImg]}>
                      <IconCamera
                        style={{
                          width: scale(50),
                          height: scale(50),
                        }}
                      />
                      <CustomText>Thêm ảnh</CustomText>
                    </TouchableOpacity>
                  )}

                  {valueImg.length > 0 ? (
                    valueImg.map((img, index) => {
                      return (
                        <ImgItem
                          isDescriptionImg={isDescriptionImg}
                          arrImg={valueImg}
                          data={img}
                          onViewImg={() => setViewImg(index)}
                          key={`key_${index}-${img?.id}`}
                          onDelete={() =>
                            handleDelete(img?.id, valueImg, onChange)
                          }
                          onChangeDescription={valueText =>
                            handleDescriptionChange(
                              index,
                              valueText,
                              valueImg,
                              onChange,
                            )
                          }
                        />
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
                          width: scale(90),
                          height: scale(90),
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

              {(viewImg || viewImg === 0) && (
                <ImageView
                  images={valueImg}
                  imageIndex={viewImg}
                  visible={!!viewImg || viewImg === 0}
                  onRequestClose={() => {
                    setViewImg(false);
                  }}
                  swipeToCloseEnabled={false}
                  FooterComponent={({imageIndex}) => {
                    const imgDetail = valueImg
                      ?.map((img, index) => ({...img, index}))
                      .find(item => item?.index === imageIndex);

                    return (
                      imgDetail?.description && (
                        <View style={styles.footer}>
                          <CustomText
                            style={{
                              color: COLORS.white,
                              fontSize: SIZES.medium,
                              flex: 1,
                            }}>
                            {imgDetail?.description}
                          </CustomText>
                        </View>
                      )
                    );
                  }}
                />
              )}
            </View>
          )
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
  border: {
    borderWidth: scale(1),
    borderStyle: 'dashed',
    borderColor: '#E3E3E3',
  },
  contentImg: {
    borderRadius: scale(8),
    minHeight: scale(220),
    backgroundColor: '#fff',
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: scale(6),
    paddingVertical: scale(6),
  },
  img: {
    height: scale(170),
    borderRadius: scale(5),
    overflow: 'hidden',
  },
  addImg: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: scale(6),
  },

  footer: {
    backgroundColor: COLORS.overlay,
    padding: scale(10),
    borderRadius: scale(10),
    marginBottom: scale(80),
    marginHorizontal: scale(20),
    alignSelf: 'flex-start',
  },
});
