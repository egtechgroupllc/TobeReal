/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {formatTime} from '../../../../../../utils/format';
import RadioButton from '../../../../../components/RadioButton';
import Collapsible from 'react-native-collapsible';
import {CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import {
  requireField,
  validateMinMaxAmount,
} from '../../../../../../utils/validate';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function RulesPolicy1({setValue, control, unregister, watch}) {
  const {t} = useLanguage();

  const list = [
    {
      id: 1,
      title: t('cancel_before'),
    },
    {
      id: 2,
      title: t('flexible_advance'),
    },
    {
      id: 3,
      title: t('no_refund'),
    },
  ];
  const [isSelect, setIsSelect] = useState(1);
  const [openCheckStart, setOpenCheckStart] = useState(false);
  const [timeCheckStart, setTimeCheckStart] = useState(
    new Date('2024-01-01T6:00:00'),
  );
  useEffect(() => {
    if (isSelect === 1) {
      unregister('refund_time');
      setValue('refund_number_day', watch('refund_number_day'));
    } else if (isSelect === list.length - 1) {
      unregister(['refund_number_day', 'refund_time', 'refund_fee']);
    }
  }, [isSelect]);

  useEffect(() => {
    if (isSelect === 0) {
      setValue('refund_number_day', 0);
      setValue('refund_time', formatTime(timeCheckStart));
    }
  }, [isSelect, timeCheckStart]);

  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      {list.map((item, index) => {
        return (
          <RadioButton
            onPress={() => {
              setIsSelect(index);
              index === 0 && setOpenCheckStart(true);
            }}
            key={index}
            title={
              index === 0 && isSelect === 0
                ? `${t('flexible_cancel_advance')} ${formatTime(
                    timeCheckStart,
                  )} ${t('on_check')}`
                : index === 1 && isSelect === 1
                ? `${t('flexible_cancel_advance')} ${
                    +watch('refund_number_day') || 1
                  } ${t('day').toLowerCase()}`
                : item?.title
            }
            isCheck={isSelect === index}
          />
        );
      })}

      <DatePicker
        mode="time"
        title={t('select_hour')}
        modal
        open={openCheckStart}
        date={timeCheckStart}
        onConfirm={time => {
          setOpenCheckStart(false);
          setTimeCheckStart(time);
        }}
        onCancel={() => {
          setOpenCheckStart(false);
        }}
      />

      <Collapsible collapsed={isSelect === list.length - 1}>
        <View style={styles.boxCheckMeal}>
          {isSelect === 1 && (
            <CustomInput
              control={control}
              name="refund_number_day"
              defaultValue="1"
              placeholder={t('day').toLowerCase()}
              style={styles.textInput}
              styleText={{
                fontSize: SIZES.xMedium,
              }}
              maxLength={2}
              keyboardType="numeric"
              rules={[
                requireField(t('this_field_required')),
                validateMinMaxAmount(t('invalid_date'), 100),
              ]}
              componentRight={
                <View style={styles.componentRight}>
                  <CustomText textType="regular" size={SIZES.xMedium}>
                    {t('day').toLowerCase()}
                  </CustomText>
                </View>
              }
            />
          )}
          <CustomText>{t('cancellation_fee_after')}</CustomText>

          <CustomInput
            control={isSelect !== list.length - 1 && control}
            name="refund_fee"
            defaultValue="10"
            placeholder="%"
            style={styles.textInput}
            maxLength={2}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
            rules={requireField(t('this_field_required'))}
            componentRight={
              <View style={styles.componentRight}>
                <CustomText textType="semiBold" size={SIZES.xMedium}>
                  %
                </CustomText>
              </View>
            }
          />

          <View style={styles.note}>
            <View style={styles.arrowTop} />
            <CustomText>{t('cancellation_fee_customer_pay')}</CustomText>
          </View>
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  boxCheckMeal: {
    rowGap: scale(4),
    marginLeft: '7%',
  },
  textInput: {
    borderRadius: scale(6),
    width: '90%',
  },
  note: {
    marginTop: scale(4),
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    padding: scale(10),
    borderRadius: scale(6),
    alignItems: 'flex-start',
  },
  arrowTop: {
    borderWidth: scale(7),
    borderColor: '#00000000',
    borderBottomColor: '#E3E3E3',
    position: 'absolute',
    top: scale(-12),
    left: scale(10),
  },
  componentRight: {
    borderLeftWidth: 1,
    borderLeftColor: COLORS.grey,
    paddingLeft: scale(10),
  },
});
