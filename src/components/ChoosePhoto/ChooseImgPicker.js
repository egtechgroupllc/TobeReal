import React, {memo, useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';

import {arrayToObject} from '../../utils/arrayToObject';
import {useLanguage} from '~/hooks/useLanguage';
import CText from '../CText';
import {scale} from '~/utils/scale';
import {IconCamera, IconError} from '~/assets/icon/Icon';
import {COLORS, SIZES} from '~/assets/constants';
import ImgItem from './ImgItem';
import {useMutation} from '@tanstack/react-query';
import {postUploadFile} from '~/api/file';
import {showMess} from '~/assets/constants/Helper';
import {useLoading} from '~/hooks/useLoading';

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
  const [listImg, setListImg] = useState([]);
  const {stopLoading, setLoading} = useLoading();

  const {t} = useLanguage();
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
          // onSelect && onSelect(dataImages);
          // setListImg(isAddMore ? [...dataImages, ...value] : dataImages);

          handleUploadFile(isAddMore ? [...dataImages, ...value] : dataImages);
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
  const postUploadFileMutation = useMutation({
    mutationFn: postUploadFile,
  });

  const getFormData = (images = []) => {
    const formData = new FormData();

    images.forEach(image => {
      formData.append('files', image);
    });
    return formData;
  };
  const handleUploadFile = value => {
    const formData = getFormData(value);

    postUploadFileMutation.mutate(formData, {
      onSuccess: dataInside => {
        if (!dataInside?.error) {
          showMess(t(dataInside?.message), 'success');
          // navigate('HomeExploreScreen');

          onSelect && onSelect(dataInside?.data);
          stopLoading();
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    });
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
                    <CText
                      textType="medium"
                      style={{
                        ...styles.text,
                        color: COLORS.White,
                      }}>
                      {title}
                    </CText>
                  )}
                  {/* {subHeading && (
                    <CText textType="regular" style={styles.text}>
                      {subHeading}
                    </CText>
                  )} */}
                </View>

                {title && (
                  <TouchableOpacity
                    onPress={() => pickImage(onChange, valueImg)}
                    style={styles.icon}>
                    <IconCamera fill={COLORS.White} />
                  </TouchableOpacity>
                )}
              </View>

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
                          style={{
                            width: scale(50),
                            height: scale(50),
                          }}
                        />
                        <CText style={{color: COLORS.White}}>
                          {t('add_images')}
                        </CText>
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
                        alignItems: 'center',
                        paddingHorizontal: scale(20),
                      }}>
                      <IconCamera
                        style={{
                          width: sizeIcon || scale(90),
                          height: sizeIcon || scale(90),
                        }}
                      />
                      <CText style={{color: COLORS.White}}>
                        {descContent || t('click_to_select')}
                      </CText>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              {error && (
                <View style={styles.errorBox}>
                  <IconError fill="#f0334b" />
                  <CText
                    style={{
                      color: '#f0334b',
                      flex: 1,
                    }}>
                    {error.message}
                  </CText>
                </View>
              )}
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
                          <CText
                            style={{
                              color: COLORS.White,
                              fontSize: SIZES.medium,
                              flex: 1,
                            }}>
                            {imgDetail?.description}
                          </CText>
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
    backgroundColor: COLORS.input,
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
