import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {getListTypeEstateSell} from '../../../../../../Model/api/common';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../../utils/validate';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from '../../../../../../components/CheckBox';
import CustomText from '../../../../../../components/CustomText';

export default function TicketDetail({
  maxCharacters,
  control,
  setValue,
  watch,
  errors,
}) {
  const richTextRef = useRef(null);
  const {t} = useLanguage();
  const listSort = [
    {
      id: 1,
      name: t('tour_guide'),
    },
    {
      id: 2,
      name: t('meal'),
    },
    {
      id: 3,
      name: t('transport'),
    },
    {
      id: 4,
      name: t('other_service'),
    },
    {
      id: 5,
      name: t('price_not_included'),
    },
  ];
  const [isView, setView] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const [arraySelect, setArraySelect] = useState([]);

  const viewGeneral = () => {
    setView(prev => !prev);
  };

  const handleSelectOption = value => {
    setArraySelect(prev => {
      const check = prev.includes(value);

      if (check) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const arrKeywords = useRef([
    'name',
    'description',
    'quantity',
    'price',
  ]).current;

  return (
    <View style={{marginTop: scale(-10)}}>
      <ButtonTabValidate
        title={t('ticket_detail')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />

      <InViewPort noLoading={true}>
        <Collapsible collapsed={!isView} style={styles.box}>
          <CustomText textType="medium" style={{...styles.text2}}>
            {t('price_included')}:
          </CustomText>
          {listSort.map((item, index) => (
            <View key={index}>
              {listSort.length - 1 === index && (
                <CustomText
                  textType="medium"
                  style={{...styles.text2, paddingBottom: scale(10)}}>
                  {t('price_not_included')}:
                </CustomText>
              )}
              <CheckBox
                textLeft
                style={{
                  height: scale(40),
                  justifyContent: 'space-between',
                  borderWidth: scale(1),
                  borderColor: '#EEEEEE',
                  paddingHorizontal: scale(10),
                  backgroundColor: COLORS.white,
                  borderTopLeftRadius: arraySelect.includes(index)
                    ? scale(10)
                    : scale(0),
                  borderTopRightRadius: arraySelect.includes(index)
                    ? scale(10)
                    : scale(0),
                  paddingVertical: scale(5),
                }}
                defaultValue={arraySelect === index}
                text={<CustomText>{item.name}</CustomText>}
                checked={arraySelect === index}
                onPress={() => handleSelectOption(index)}
              />

              {arraySelect.includes(index) && (
                <>
                  <View
                    style={{
                      backgroundColor: '#EEEEEE',
                      borderWidth: scale(1),
                      borderColor: '#EEEEEE',
                      marginBottom: scale(10),
                      minHeight: scale(150),
                    }}>
                    <RichEditor
                      initialFocus
                      editorStyle={{backgroundColor: '#EEEEEE'}}
                      initialContentHTML={'<ul><li></li><ul/>'}
                      ref={richTextRef}
                      onChange={descriptionText => {
                        console.log(
                          `descriptionText:_${index}`,
                          descriptionText,
                        );
                      }}
                    />
                  </View>
                  <RichToolbar
                    selectedIconTint={COLORS.primary}
                    style={{
                      marginTop: scale(-10),
                      borderTopWidth: scale(1),
                      borderColor: COLORS.grey,
                      borderBottomLeftRadius: scale(10),
                      borderBottomRightRadius: scale(10),
                    }}
                    editor={richTextRef}
                    actions={[
                      actions.setBold,
                      actions.setItalic,
                      actions.setUnderline,
                      actions.removeFormat,
                      actions.insertBulletsList,
                      actions.insertOrderedList,
                      actions.insertLink,
                      'customAction',
                    ]}
                  />
                </>
              )}
            </View>
          ))}
        </Collapsible>
      </InViewPort>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.xMedium,
    color: COLORS.black,
  },
  text2: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    // alignItems: 'center',
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
