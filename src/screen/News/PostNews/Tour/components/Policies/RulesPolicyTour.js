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
import {requireField} from '../../../../../../utils/validate';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function RulesPolicyTour({setValue, control, unregister}) {
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
      setValue('refund_number_day', 1);
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
          <CustomInput
            control={isSelect !== list.length - 1 && control}
            name="refund_fee"
            defaultValue="10"
            placeholder="%"
            style={styles.textInput}
            maxLength={2}
            styleText={{
              color: COLORS.black,
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
          <CustomText style={{color: COLORS.black}}>
            {t('cancelation_fee_after_tour')}
          </CustomText>

          <View style={styles.note}>
            <View style={styles.arrowTop} />
            <CustomText style={{color: COLORS.black}}>
              {t('cancelation_fee_tour')}
            </CustomText>
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
