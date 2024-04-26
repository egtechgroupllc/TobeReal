import {useQuery} from '@tanstack/react-query';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {
  getListTypeBed,
  getListTypeRoom,
} from '../../../../../../Model/api/apiAccom';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import CheckBox from '../../../../../../components/CheckBox';
import CustomText from '../../../../../../components/CustomText';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../../utils/validate';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';
import TimeCheckIn from '../../../Lease/components/PostNewLease/EstateDetail/TimeCheckIn';

export default function EstateDetail({control, errors, watch, setValue}) {
  const {t} = useLanguage();

  const [viewDetail, setViewDetail] = useState(false);

  const {data, isLoading, isError} = useQuery({
    queryKey: ['accommodation', 'room', 'list-type'],
    queryFn: getListTypeRoom,
  });

  const listBedType = useQuery({
    queryKey: ['accommodation', 'room', 'list-bed-type'],
    queryFn: getListTypeBed,
  });

  const arrKeywords = useRef(['currency_id', 'size', 'price']).current;

  return (
    <View>
      <ButtonTabValidate
        title={t('Chi tiếc Tour')}
        onPress={() => setViewDetail(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <InViewPort noLoading={true}>
        <Collapsible collapsed={!viewDetail} style={styles.box}>
          {/* <TimeCheckIn
            title={'Đón khách'}
            onChange={value => {
              setValue('check_in_time_start', value?.timeCheckStart);
              setValue('check_in_time_end', value?.timeCheckEnd);
            }}
          />

          <View style={styles.line} /> */}

          <CustomInput
            styleTextLabel={styles.label}
            label={t('Lịch trình tour')}
            control={control}
            name="description"
            maxLength={5000}
            multiline
            placeholder={t('enter_a_description')}
            rules={[
              requireField(t('this_field_required')),
              validateMaxLengthText(`${5000} characters limit`, 5000),
            ]}
            style={[
              styles.textInput,
              {
                minHeight: scale(130),
                maxHeight: scale(500),
              },
            ]}
            componentRight={
              <CustomText style={styles.numText}>
                {watch('description')?.length || 0}/{5000}
              </CustomText>
            }
          />

          <CheckBox
            text="Free cancellation"
            styleWrapper={{
              width: '100%',
            }}
          />
        </Collapsible>
      </InViewPort>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },

  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(10),

    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  line: {
    borderWidth: 0.5,
    width: '100%',
    marginTop: scale(10),
    borderColor: '#F0B90B',
  },

  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  buttonStyle: {
    flex: 1,
  },
  numText: {
    position: 'absolute',
    top: scale(-20),
    right: 0,
  },
});
