import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomButton, CustomInput} from '../../../../../../components';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../../utils/validate';
import ButtonTabValidate from '../ButtonTabValidate';
import InputLeaseMulti from '../PostNewLease/GeneralInformation/InputLeaseMulti';
import {useQuery} from '@tanstack/react-query';
import {getListPolicy} from '../../../../../../Model/api/apiAccom';
import CheckBox from '../../../../../../components/CheckBox';
import CustomText from '../../../../../../components/CustomText';
import {useNavigation} from '@react-navigation/native';

export default function GeneralInformation({
  maxCharacters = 100,
  control,
  setValue,
  watch,
  errors,
  accomId,
}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const [isView, setView] = useState(false);
  const [isViewPolicy, setIsViewPolicy] = useState(false);
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  const viewListPolicy = () => {
    setIsViewPolicy(prev => !prev);
  };

  const arrKeywords = useRef(['name', 'policy']).current;
  const [policy, setPolicy] = useState([]);

  const {data, isLoading, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-policy',
      {
        accommodation_id: accomId,
      },
    ],
    queryFn: () =>
      getListPolicy({
        accommodation_id: accomId,
      }),
  });
  const policiesCheckBox = useCallback(item => {
    setPolicy(prev => {
      const check = prev?.includes(item?.id);

      if (check) {
        return prev?.filter(id => id !== item?.id);
      }

      return [...prev, item?.id];
    });
  }, []);

  useEffect(() => {
    setValue('policy', policy);
  }, [policy, setValue]);
  return (
    <View>
      <ButtonTabValidate
        title={t('general_information')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <InViewPort noLoading={true}>
        <Collapsible collapsed={!isView} style={styles.box}>
          <InputLeaseMulti
            control={control}
            label={t('Room name')}
            maxLength={maxCharacters}
            placeholder={t('Room name')}
            name="name"
          />
          <ButtonTabValidate
            title={t('List policy')}
            onPress={viewListPolicy}
            errors={errors}
            watch={watch}
            arrKeywords={arrKeywords}
            style={{
              marginTop: scale(5),
              justifyContent: 'space-between',
              paddingHorizontal: scale(20),
              marginBottom: scale(-17),
            }}
          />
          {data?.data?.count !== 0 && data?.data?.count ? (
            <Collapsible collapsed={!isViewPolicy} style={{...styles.box}}>
              {data?.data?.rows?.map((item, index) => {
                return (
                  <>
                    <View>
                      <CheckBox
                        key={index}
                        textBold
                        isRadio
                        style={{width: scale(322), height: scale(20)}}
                        text={item?.name}
                        isChecked={policy?.includes(item?.id)}
                        onPress={() => policiesCheckBox(item)}
                        textStyle={{
                          fontSize: SIZES.xMedium,
                        }}
                      />
                    </View>
                  </>
                );
              })}
            </Collapsible>
          ) : (
            <Collapsible collapsed={!isViewPolicy} style={{...styles.box}}>
              <View
                style={{
                  width: scale(322),
                  height: scale(20),
                  alignItems: 'center',
                }}>
                <CustomText>
                  No policy exists, please add more policy!
                </CustomText>
                <CustomButton
                  text="Add policy"
                  styleWrapper={{
                    width: '50%',
                    marginTop: scale(10),
                  }}
                  onPress={() => navigate('AddPolicyScreen', {id: accomId})}
                />
              </View>
            </Collapsible>
          )}
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
    height: 0.5,
    width: '100%',
    backgroundColor: '#F0B90B',
  },

  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  numText: {
    fontSize: SIZES.small,
    position: 'absolute',
    top: scale(-20),
    right: 0,
    color: COLORS.black,
  },
});
