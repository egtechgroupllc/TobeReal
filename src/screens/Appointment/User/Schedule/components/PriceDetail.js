import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {Button, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {useLanguage} from '~/hooks/useLanguage';
import BottomSheet from '~/components/BottomSheet';
import {formatPrice} from '~/utils/format';
import {BottomSheetView} from '@gorhom/bottom-sheet';

export default function PriceDetail({data}) {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <CText
        style={{fontSize: SIZES.xMedium, color: COLORS.White}}
        textType="semiBold">
        {t('price')}: {formatPrice(data?.examination_price[0]?.price)}
      </CText>
      <Button.Text
        title={t('detail')}
        color={COLORS.blue}
        onPress={() => bottomSheetRef.current.open()}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['50%', '80%']}
        titleIndicator={t('price_detail')}
        handleStyle={{color: COLORS.White}}
        // onDismiss={!apply && reset}
        backgroundStyle={{
          backgroundColor: COLORS.blueView,
        }}
        fill={COLORS.White}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        <View style={{rowGap: scale(10)}}>
          {data?.examination_price?.map(item => {
            return (
              <View style={{rowGap: scale(10)}}>
                <CText style={{fontSize: SIZES.large, color: COLORS.White}}>
                  {item?.specialty?.name}
                </CText>
                <View
                  style={{
                    width: '100%',
                    borderRadius: scale(10),
                    borderWidth: 1,
                    borderColor: COLORS.input,
                    padding: scale(10),
                    rowGap: scale(5),
                    paddingVertical: scale(20),
                  }}>
                  <CText
                    style={{fontSize: SIZES.medium, color: COLORS.White}}
                    textType="semiBold">
                    {t('examination_price')}
                  </CText>

                  <View
                    style={{
                      backgroundColor: COLORS.input,
                      padding: scale(10),
                      borderRadius: scale(5),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <CText
                        numberOfLines={1}
                        textType="semiBold"
                        style={{
                          fontSize: SIZES.medium,
                          color: COLORS.White,
                          flex: 1,
                        }}>
                        {item?.name}
                      </CText>
                      <CText
                        numberOfLines={1}
                        textType="semiBold"
                        style={{
                          fontSize: SIZES.medium,
                          color: COLORS.White,
                          flex: 1,
                          textAlign: 'right',
                        }}>
                        {formatPrice(item?.price)}
                      </CText>
                    </View>
                    <CText
                      style={{fontSize: SIZES.xMedium, color: COLORS.grey}}
                      numberOfLines={3}>
                      {item?.description}
                    </CText>
                  </View>
                  {item?.parent?.length > 0 && (
                    <CText
                      textType="semiBold"
                      style={{fontSize: SIZES.medium, color: COLORS.White}}>
                      {t('related_service_price')}
                    </CText>
                  )}
                  {item?.parent?.map(item => {
                    return (
                      <View
                        style={{
                          width: '100%',
                          borderRadius: scale(10),
                        }}>
                        <View
                          style={{
                            backgroundColor: COLORS.input,
                            padding: scale(10),
                            borderRadius: scale(5),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <CText
                              numberOfLines={1}
                              textType="semiBold"
                              style={{
                                fontSize: SIZES.medium,
                                color: COLORS.White,
                                flex: 1,
                              }}>
                              {item?.name}
                            </CText>
                            <CText
                              numberOfLines={1}
                              textType="semiBold"
                              style={{
                                fontSize: SIZES.medium,
                                color: COLORS.White,
                                flex: 1,
                                textAlign: 'right',
                              }}>
                              {formatPrice(item?.price)}
                            </CText>
                          </View>
                          <CText style={{color: COLORS.White}}>
                            {item?.description}
                          </CText>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({});
