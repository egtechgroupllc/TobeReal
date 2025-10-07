// ChooseImgPicker.js
import React, {memo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {IconCamera, IconError} from '../../assets/icon/Icon';
import CustomText from '../../components/CustomText';
import {arrayToObject} from '../../utils/arrayToObject';
import ImgItem from './ChooseImg/ImgItem';
import {useLanguage} from '../../hooks/useLanguage';
import {UseUploadImages} from './UseUploadImage';

export default memo(function ChooseImgPicker({
  title,
  subHeading,
  control,
  rules,
  name,
  stylesHeader,
  styleContentImg,
  styleContent,
  sizeIcon,
  onSelect,
  onDelete,
  maxFiles = 24,
  isDescriptionImg = true,
  defaultValue,
  isAddMore = true,
  isAddWhenEmpty = false,
  descContent,
}) {
  const form = useForm();
  const [viewImg, setViewImg] = useState(false);
  const {t} = useLanguage();

  const pickImage = async (onChange, value) => {
    await launchImageLibrary(
      {mediaType: 'photo', selectionLimit: maxFiles},
      async response => {
        if (response.assets) {
          const dataImages = response.assets.map((item, index) => {
            const timeNu = new Date().getTime();
            return {
              name: timeNu + '_' + item.fileName,
              type: item.type,
              id: index + timeNu,
              description: '',
              uri:
                Platform.OS === 'ios'
                  ? item.uri.replace('file://', '')
                  : item.uri,
              file: item,
            };
          });

          const newValue = isAddMore ? [...dataImages, ...value] : dataImages;

          // gọi luôn upload
          try {
            const uploadedList = await UseUploadImages(newValue);

            // map lại: giữ object local, thêm field src từ server
            const merged = newValue.map((f, i) => ({
              ...f,
              src: uploadedList?.[i]?.src,
            }));

            onChange(merged);
          } catch (error) {
            console.log('Upload error:', error);
          }
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
        const valueImg = Array.isArray(value) ? value : [];
        const isShow = isAddWhenEmpty && valueImg.length <= 0;

        return (
          !isShow && (
            <View style={{width: '100%', rowGap: scale(12)}}>
              {/* Header */}
              <View style={[styles.header, stylesHeader]}>
                <View style={{flex: 1, columnGap: scale(10)}}>
                  {title && (
                    <CustomText textType="medium" style={styles.text}>
                      {title}
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

              {/* Content */}
              <View
                style={[
                  styleContent,
                  {
                    minHeight: scale(170),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.white,
                  },
                  (valueImg.length <= 0 || error) && styles.border,
                  error && {borderColor: '#f6465d'},
                ]}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => pickImage(onChange, valueImg)}
                  style={[
                    styles.contentImg,
                    valueImg.length <= 0 && {alignItems: 'center'},
                    styleContentImg,
                  ]}
                  disabled={valueImg.length > 0}>
                  {valueImg.length > 0 &&
                    isAddMore &&
                    maxFiles > valueImg.length && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => pickImage(onChange, valueImg)}
                        style={[styles.img, styles.border, styles.addImg]}>
                        <IconCamera
                          style={{width: scale(50), height: scale(50)}}
                        />
                        <CustomText>{t('add_images')}</CustomText>
                      </TouchableOpacity>
                    )}

                  {valueImg?.length > 0 ? (
                    valueImg?.map((img, index) => (
                      <ImgItem
                        // isDescriptionImg={isDescriptionImg}
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
                    ))
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        paddingHorizontal: scale(20),
                      }}>
                      <IconCamera
                        style={{
                          width: sizeIcon || scale(90),
                          height: sizeIcon || scale(90),
                        }}
                      />
                      <CustomText>
                        {descContent || t('click_to_select')}
                      </CustomText>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Error */}
              {error && (
                <View style={styles.errorBox}>
                  <IconError fill="#f0334b" />
                  <CustomText style={{color: '#f0334b', flex: 1}}>
                    {error.message}
                  </CustomText>
                </View>
              )}

              {/* Preview */}
              {(viewImg || viewImg === 0) && (
                <ImageView
                  images={valueImg.map(v => ({uri: v.uri}))}
                  imageIndex={viewImg}
                  visible={!!viewImg || viewImg === 0}
                  onRequestClose={() => setViewImg(false)}
                  swipeToCloseEnabled={false}
                />
              )}
            </View>
          )
        );
      }}
    />
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {color: COLORS.black, alignSelf: 'flex-start'},
  border: {
    borderWidth: scale(1),
    borderStyle: 'dashed',
    borderColor: '#E3E3E3',
    borderRadius: scale(8),
  },
  contentImg: {
    borderRadius: scale(8),
    backgroundColor: COLORS.white,
    ...SHADOW,
    borderWidth: scale(1),
    borderColor: COLORS.border,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: scale(6),
    paddingVertical: scale(6),
  },
  img: {height: scale(170), borderRadius: scale(5), overflow: 'hidden'},
  addImg: {width: '48%', alignItems: 'center', justifyContent: 'center'},
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: scale(5),
  },
});
