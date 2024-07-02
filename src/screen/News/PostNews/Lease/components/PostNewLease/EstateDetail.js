import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import ButtonTabValidate from '../ButtonTabValidate';
import TimeCheckIn from './EstateDetail/TimeCheckIn';
import TimeCheckOut from './EstateDetail/TimeCheckOut';
import {CustomInput} from '../../../../../../components';
import {requireField} from '../../../../../../utils/validate';
import RatingBox from '../../../../../Explore/components/ContentAccommodation/BoxPlaceItem/RatingBox';
import Star from '../../../../../../components/StarRating';
import CustomText from '../../../../../../components/CustomText';
import SetStartAccomo from './EstateDetail/SetStartAccomo';

export default function EstateDetail({control, errors, watch, setValue}) {
  const {t} = useLanguage();

  const [viewDetail, setViewDetail] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const arrKeywords = useRef([
    'km_to_center',
    'size_width',
    'size_length',
    'rating',
  ]).current;

  return (
    <View>
      <ButtonTabValidate
        title={t('estate_detail')}
        onPress={() => setViewDetail(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <InViewPort noLoading={true}>
        <Collapsible collapsed={!viewDetail} style={styles.box}>
          <Box title={t('how_many_star_accom')}>
            <SetStartAccomo onChange={value => setValue('rating', value)} />
          </Box>

          <Box title={t('what_are_property')}>
            <>
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
            </>
          </Box>

          {/* <View style={styles.line} /> */}

          <Box title={t('the_area_of_property')}>
            <View
              style={{
                flexDirection: 'row',
                columnGap: scale(30),
              }}>
              <CustomInput
                label={t('width')}
                placeholder={t('length')}
                name="size_width"
                rules={requireField(t('this_field_required'))}
                styleWrapper={{
                  flex: 1,
                }}
                control={control}
                styleTextLabel={styles.label}
                style={styles.textInput}
              />

              <CustomInput
                label={t('length')}
                placeholder={t('length')}
                name="size_length"
                control={control}
                rules={requireField(t('this_field_required'))}
                styleTextLabel={styles.label}
                styleWrapper={{
                  flex: 1,
                }}
                style={styles.textInput}
              />
            </View>
          </Box>
        </Collapsible>
      </InViewPort>
    </View>
  );
}

const Box = ({title, children}) => {
  return (
    <View
      style={{
        alignItems: 'flex-start',
        width: '100%',
        rowGap: scale(10),
      }}>
      <CustomText textType="semiBold" size={SIZES.xMedium}>
        {title}
      </CustomText>
      {children}
    </View>
  );
};

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
    rowGap: scale(20),
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
