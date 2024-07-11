import React, {memo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';

import {COLORS, SIZES, scale} from '../../../assets/constants';
import {IconCamera, IconError} from '../../../assets/icon/Icon';
import CustomText from '../../../components/CustomText';
import {useLanguage} from '../../../hooks/useLanguage';
import {arrayToObject} from '../../../utils/arrayToObject';
import VideoItem from './VideoItem';
import Video from 'react-native-video';
export default memo(function ChooseVideoPicker({
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
  onPausedVideo,
}) {
  const form = useForm();
  const [viewImg, setViewImg] = useState(false);
  const {t} = useLanguage();

  const pickVideo = async (onChange, value) => {
    await launchImageLibrary(
      {
        mediaType: 'video',
        selectionLimit: 1,
        videoQuality: 'low',
        formatAsMp4: true,
      },
      response => {
        if (response.assets) {
          // const timeNu = new Date().getTime();
          // const dataImages = response.assets.map((item, index) => {
          //   return {
          //     name: timeNu + item.fileName,
          //     type: item.type,
          //     id: index + timeNu,
          //     description: '',
          //     uri:
          //       Platform.OS === 'ios'
          //         ? item.uri.replace('file://', '')
          //         : item.uri,
          //   };
          // });

          // onChange(isAddMore ? [...dataImages, ...value] : dataImages);
          onChange(response.assets);
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
            <View
              style={{
                width: '90%',
                rowGap: scale(12),
                alignSelf: 'center',
                marginTop: scale(20),
              }}>
              <View
                style={[
                  styleContent,
                  {
                    minHeight: scale(170),
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  (valueImg.length <= 0 || error) && styles.border,
                  error && {borderColor: '#f6465d'},
                ]}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => pickVideo(onChange, valueImg)}
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
                        onPress={() => pickVideo(onChange, valueImg)}
                        style={[styles.img, styles.border, styles.addImg]}>
                        <IconCamera
                          style={{
                            width: scale(50),
                            height: scale(50),
                          }}
                        />
                        <CustomText>{t('add_images')}</CustomText>
                      </TouchableOpacity>
                    )}

                  {valueImg.length > 0 ? (
                    valueImg.map((img, index) => {
                      return (
                        <VideoItem
                          isDescriptionImg={isDescriptionImg}
                          arrImg={valueImg}
                          data={img}
                          onViewVideo={() => setViewImg(index)}
                          key={`key_${index}-${img?.id}`}
                          onDelete={() =>
                            handleDelete(img?.id, valueImg, onChange)
                          }
                          onPausedVideo={onPausedVideo}
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
                        alignItems: 'center',
                      }}>
                      <IconCamera
                        style={{
                          width: sizeIcon || scale(90),
                          height: sizeIcon || scale(90),
                        }}
                      />
                      <CustomText>
                        {descContent || t('click_to_select_video')}
                      </CustomText>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
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
    borderRadius: scale(8),
  },
  contentImg: {
    borderRadius: scale(8),
    // backgroundColor: '#fff',
    borderWidth: scale(1),
    borderStyle: 'dashed',
    borderColor: '#E3E3E3',
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
    columnGap: scale(5),
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
