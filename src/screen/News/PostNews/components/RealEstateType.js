import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {getListTypeRent} from '../../../../api/common';
import {COLORS, scale} from '../../../../assets/constants';
import {IconDown} from '../../../../assets/icon/Icon';
import {CustomInput} from '../../../../components';
import CheckBox from '../../../../components/CheckBox';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField} from '../../../../utils/validate';

export default function RealEstateType({onChange, control}) {
  const {t} = useLanguage();

  const [showRealEstateType, setShowRealEstateType] = useState('');
  const [selectedEstateCheckBox, setSelectedEstateCheckBox] = useState();

  const {data, isLoading, isError} = useQuery({
    queryKey: ['common', 'accommodation', 'list-type'],
    queryFn: getListTypeRent,
  });

  const estateTypeCheckBox = value => {
    setSelectedEstateCheckBox(value);
    setShowRealEstateType(false);
  };

  useEffect(() => {
    onChange(selectedEstateCheckBox);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEstateCheckBox]);

  useEffect(() => {
    data?.data && setSelectedEstateCheckBox(data?.data[0]);
  }, [data?.data]);
  console.log(selectedEstateCheckBox);
  return (
    <View
      style={{
        width: '100%',
      }}>
      <CustomInput
        label={t('real_estate_type')}
        placeholder={t('real_estate_type')}
        value={selectedEstateCheckBox?.name}
        onPress={() => setShowRealEstateType(prev => !prev)}
        rules={requireField(t('this_field_required'))}
        control={control}
        style={styles.buttonEstateTypes}
        iconRight={() => <IconDown />}
        styleText={{color: COLORS.black}}
        styleTextLabel={{color: COLORS.black}}
      />

      <Collapsible collapsed={!showRealEstateType}>
        <View style={styles.listEstateType}>
          {!isLoading ? (
            <>
              {data?.data.map((item, index) => (
                <CheckBox
                  key={`key${item?.id}_${index}`}
                  text={item?.name}
                  textLeft
                  isRadio
                  onPress={() => estateTypeCheckBox(item)}
                  isChecked={selectedEstateCheckBox?.name === item?.name}
                  style={styles.checkBox}
                />
              ))}
            </>
          ) : (
            <ActivityIndicator size="large" color={COLORS.primary} />
          )}
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonEstateTypes: {
    borderRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
  },
  listEstateType: {
    borderRadius: scale(10),
    backgroundColor: '#EEEEEE',
    paddingVertical: scale(5),
    width: '100%',
    minHeight: scale(120),
    justifyContent: 'center',
  },
  checkBox: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    width: '100%',
  },
});
