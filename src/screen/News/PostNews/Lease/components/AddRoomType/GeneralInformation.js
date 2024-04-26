import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../../utils/validate';
import ButtonTabValidate from '../ButtonTabValidate';

export default function GeneralInformation({
  maxCharacters,
  control,
  setValue,
  watch,
  errors,
}) {
  const {t} = useLanguage();

  const [isView, setView] = useState(false);

  const viewGeneral = () => {
    setView(prev => !prev);
  };
  const arrKeywords = useRef(['name']).current;

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
          <CustomInput
            styleTextLabel={styles.label}
            label={t('Room name')}
            control={control}
            name="name"
            multiline
            maxLength={maxCharacters}
            placeholder={t('Room name')}
            rules={[
              requireField(t('this_field_required')),
              validateMaxLengthText(
                `${maxCharacters} characters limit`,
                maxCharacters,
              ),
            ]}
            style={[
              styles.textInput,
              {
                height: scale(50),
              },
            ]}
            componentRight={
              <Text style={styles.numText}>
                {watch('name')?.length || 0}/{maxCharacters}
              </Text>
            }
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
