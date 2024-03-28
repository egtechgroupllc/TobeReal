import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import ButtonTabValidate from '../ButtonTabValidate';
import TimeCheckIn from './EstateDetail/TimeCheckIn';
import TimeCheckOut from './EstateDetail/TimeCheckOut';

export default function EstateDetail({control, errors, watch, setValue}) {
  const {t} = useLanguage();

  const [viewDetail, setViewDetail] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const arrKeywords = useRef(['km_to_center']).current;

  return (
    <View>
      <ButtonTabValidate
        title={t('estate_detail')}
        onPress={() => setViewDetail(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <InViewPort
        noLoading={true}
        onChange={render => render && setIsRender(render)}>
        {isRender && (
          <Collapsible collapsed={!viewDetail} style={styles.box}>
            <View style={styles.line} />

            <TimeCheckIn
              onChange={value => {
                setValue('check_in_time_start', value?.timeCheckStart);
                setValue('check_in_time_end', value?.timeCheckEnd);
              }}
            />
            <TimeCheckOut
              onChange={value => {
                setValue('check_out_time_start', value?.timeCheckStart);
                setValue('check_out_time_end', value?.timeCheckEnd);
              }}
            />

            <View style={styles.line} />

            {/* <CustomInput
          label={t('distance_to_city')}
          styleTextLabel={styles.label}
          control={control}
          name="km_to_center"
          placeholder={t('KM')}
          rules={requireField(t('this_field_required'))}
          style={{...styles.textInput}}
        /> */}

            <View style={styles.line} />
          </Collapsible>
        )}
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
});
