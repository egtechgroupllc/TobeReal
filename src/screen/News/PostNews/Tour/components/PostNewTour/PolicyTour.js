import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import RulesPolicy1 from '../../../Lease/components/AddPolicy/RulesPolicy1';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import InViewPort from '../../../../../../components/InViewport';
import Collapsible from 'react-native-collapsible';
import RulesPolicyTour from '../Policies/RulesPolicyTour';

export default function PolicyTour({
  setValue,
  control,
  unregister,
  watch,
  errors,
}) {
  const {t} = useLanguage();

  const {navigate, setOptions} = useNavigation();
  const [isView, setView] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const viewGeneral = () => {
    setView(prev => !prev);
  };
  const arrKeywords = useRef([
    'refund_fee',
    'refund_number_day',
    'refund_time',
  ]).current;
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('tour_policies'),
      headerTitleStyle: {
        textAlign: 'center',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <ButtonTabValidate
        title={t('tour_policies')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <InViewPort
        noLoading={true}
        onChange={render => render && setIsRender(render)}>
        {isRender && (
          <Collapsible
            collapsed={!isView}
            style={{...styles.box, alignItems: 'flex-start'}}>
            <Box title={t('which_policy_tour')} num="1">
              <RulesPolicyTour
                setValue={setValue}
                control={control}
                unregister={unregister}
              />
            </Box>
          </Collapsible>
        )}
      </InViewPort>
    </View>
  );
}
const Box = ({title, num, children}) => {
  return (
    <View
      style={{
        rowGap: scale(12),
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            padding: scale(6),
            backgroundColor: '#ddd',
            borderRadius: scale(6),
          }}>
          <CustomText textType="bold" style={{color: COLORS.black}}>
            {num}
          </CustomText>
        </View>

        <CustomText
          textType="bold"
          size={SIZES.xMedium}
          style={{flex: 1, color: COLORS.black}}>
          {title}
        </CustomText>
      </View>

      {children}
    </View>
  );
};
const styles = StyleSheet.create({
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
});
