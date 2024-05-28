/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import {COLORS, scale} from '../../../../../../assets/constants';
import {IconDown} from '../../../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../../../components';
import CheckBox from '../../../../../../components/CheckBox';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {dataRoomFacilities} from '../../../../../../utils/dataRoomFacilities';
import ButtonTabValidate from '../ButtonTabValidate';

export default function EstateFacilities({
  control,
  setValue,
  errors,
  watch,
  update,
}) {
  const {t} = useLanguage();

  const [viewFacilities, setViewFacilities] = useState(false);
  const [showFacilitiesItem, setShowFacilitiesItem] = useState('');
  const [arrFacilities, setArrFacilities] = useState([]);

  const facilitiesCheckBox = useCallback(item => {
    setArrFacilities(prev => {
      const check = prev?.includes(item);

      if (check) {
        return prev?.filter(feature => feature !== item);
      }

      return [...prev, item];
    });
  }, []);

  useEffect(() => {
    if (!watch('features')) {
      setArrFacilities([]);
      setShowFacilitiesItem(-1);
    }
    // else {
    //   setArrFacilities(watch('features'));
    // }
  }, [watch('features')]);

  useEffect(() => {
    setValue('features', JSON.stringify(arrFacilities));
  }, [arrFacilities]);

  const arrKeywords = useRef(['features']).current;

  return (
    <View>
      <ButtonTabValidate
        title={t('Room Facilities')}
        onPress={() => setViewFacilities(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />

      <InViewPort noLoading={true} delay={50}>
        <Collapsible collapsed={!viewFacilities} style={styles.box}>
          <Accordion
            containerStyle={styles.content}
            activeSections={[showFacilitiesItem]}
            sections={dataRoomFacilities}
            renderHeader={(item, index, isActive) => {
              return (
                <CustomButton
                  style={{
                    ...styles.select,
                    borderTopWidth: scale(index === 0 ? 0 : 1),
                  }}
                  text={item?.name}
                  iconRight={() => (
                    <IconDown
                      style={
                        isActive && {
                          transform: [
                            {
                              rotate: '180deg',
                            },
                          ],
                        }
                      }
                    />
                  )}
                  onPress={() => setShowFacilitiesItem(isActive ? -1 : index)}
                  styleText={{
                    color: COLORS.text,
                    textType: 'medium',
                  }}
                />
              );
            }}
            renderSectionTitle={(item, index) => {
              return (
                index === 0 && (
                  <CustomInput
                    value={t('Room Facilities')}
                    style={{
                      borderWidth: 0,
                    }}
                    styleText={{color: COLORS.black}}
                    styleTextLabel={{color: COLORS.black}}
                    editable={false}
                  />
                )
              );
            }}
            renderContent={(itemCont, indexCont, isActive) => {
              return (
                <FlatList
                  key={indexCont}
                  data={Object.keys(itemCont?.include)}
                  style={{
                    maxHeight: scale(450),
                  }}
                  contentContainerStyle={{
                    paddingVertical: scale(10),
                  }}
                  renderItem={({item, index}) =>
                    isActive && (
                      <CheckBox
                        key={index}
                        text={item}
                        textLeft
                        isChecked={arrFacilities?.includes(item)}
                        onPress={evt => {
                          facilitiesCheckBox(item);
                        }}
                        style={styles.checkBox}
                        textStyle={{
                          flex: 1,
                          color: COLORS.black,
                        }}
                      />
                    )
                  }
                />
              );
            }}
          />
        </Collapsible>
      </InViewPort>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    paddingVertical: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    borderColor: COLORS.green,
    borderWidth: scale(1),
  },
  select: {
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
    borderRadius: 0,
    paddingHorizontal: scale(25),
    borderTopColor: '#ddd',
  },
  checkBox: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(7),
  },

  content: {
    borderWidth: scale(2),
    borderRadius: scale(6),
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    width: '100%',
    minHeight: scale(100),
  },
});
