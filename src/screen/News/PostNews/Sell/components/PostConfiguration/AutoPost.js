/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Switch, TouchableOpacity, View} from 'react-native';

import {SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {IconEditProfile, IconReset} from '../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../components';
import BottomSheet from '../../../../../../components/BottomSheet';
import CustomText from '../../../../../../components/CustomText';
import {formatDate} from '../../../../../../utils/format';
import AutoPostTop from './AutoPostTop';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function AutoPost({setValue, date, params, unregister}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [count, setCount] = useState(0);
  const {t} = useLanguage();

  const bottomSheetRef = useRef();
  const dateEnd = useMemo(
    () =>
      formatDate(date?.date, {
        addDays: date?.number_day * count?.count,
        dateStyle: 'yyyy-MM-dd',
      }),
    [date, count],
  );

  useEffect(() => {
    if (isConfirm) {
      setValue('package_post_item_id_repost', date?.id);
      setValue('package_post_item_number_repost', count?.count);
    }
  }, [count, date, isConfirm]);

  useEffect(() => {
    if (params?.package_post_item_id_repost) {
      setCount({count: params?.package_post_item_number_repost});
      setIsConfirm(true);
      setIsEnabled(true);
    } else {
      unregister('package_post_item_id_repost');
      unregister('package_post_item_number_repost');
    }
  }, [params?.package_post_item_id_repost]);

  return (
    <View style={styles.wrapper}>
      <CustomText
        textType="semiBold"
        style={{
          fontSize: SIZES.medium,
        }}>
        {t('utilities')}
      </CustomText>

      <View style={styles.content}>
        <View style={styles.boxIcon}>
          <IconReset
            style={{
              width: scale(16),
              height: scale(16),
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            rowGap: scale(3),
          }}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
            }}>
            {t('auto_repost')}
          </CustomText>
          {isConfirm ? (
            <View>
              <CustomText>
                - {t('auto_repost')} {count.count} {t('time')}
              </CustomText>
              <CustomText>
                - {t('last_post_on_date')} {dateEnd}
              </CustomText>
            </View>
          ) : (
            <CustomText>{t('news_will_be_repost')}</CustomText>
          )}
        </View>
        {isConfirm && (
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current.open();
            }}
            activeOpacity={1}
            style={styles.boxIconEdit}>
            <IconEditProfile
              style={{
                width: scale(12),
                height: scale(12),
              }}
            />
          </TouchableOpacity>
        )}

        <Switch
          trackColor={{false: '#ddd', true: '#05c56e'}}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          ios_backgroundColor="#ddd"
          value={isEnabled}
          onValueChange={value => {
            value && bottomSheetRef.current.open();

            if (!value) {
              setIsConfirm(false);
              unregister('package_post_item_id_repost');
              unregister('package_post_item_number_repost');
            }
            setIsEnabled(value);
          }}
        />

        <BottomSheet
          titleIndicator={t('auto_repost')}
          snapPoints={['40%']}
          ref={bottomSheetRef}
          onDismiss={() => !isConfirm && setIsEnabled(false)}
          styleContent={{
            paddingHorizontal: scale(18),
            rowGap: scale(10),
          }}>
          <AutoPostTop
            date={date}
            setValue={setValue}
            onCount={setCount}
            countNum={count?.count}
          />

          <View>
            <CustomText>- {t('news_will_repost')}.</CustomText>
            <CustomText>- {t('time_reposting')}.</CustomText>
            <CustomText>- {t('each_time_post')}.</CustomText>
          </View>

          <CustomButton
            text={t('submit')}
            onPress={() => {
              setIsConfirm(true);
              bottomSheetRef.current.close();
            }}
          />
        </BottomSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(12),
    backgroundColor: '#fff',
    padding: scale(10),
    ...SHADOW,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
  },
  boxIcon: {
    rowGap: scale(3),
    backgroundColor: '#fff0e9',
    padding: scale(8),
    borderRadius: scale(6),
  },
  boxIconEdit: {
    borderRadius: scale(3),
    borderWidth: 1,
    padding: scale(5),
    borderColor: '#ccc',
  },
});
