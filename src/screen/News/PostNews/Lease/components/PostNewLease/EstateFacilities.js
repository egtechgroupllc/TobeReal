import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import {COLORS, scale} from '../../../../../../assets/constants';
import {IconDown, IconRight} from '../../../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../../../components';
import CheckBox from '../../../../../../components/CheckBox';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import ButtonTabValidate from './ButtonTabValidate';
import InViewPort from '../../../../../../components/InViewport';
import {dataPropertyFacilities} from '../../../../../../utils/dataPropertyFacilities';

export default function EstateFacilities({control, setValue, errors, watch}) {
  const {t} = useLanguage();

  const [viewFacilities, setViewFacilities] = useState(false);
  const [showFacilitiesItem, setShowFacilitiesItem] = useState('');
  const [arrFacilities, setArrFacilities] = useState([]);
  const [isRender, setIsRender] = useState(false);

  const facilitiesCheckBox = item => {
    setArrFacilities(prev => {
      const check = prev?.includes(item);

      if (check) {
        return prev?.filter(feature => feature !== item);
      }

      return [...prev, item];
    });
  };

  useEffect(() => {
    setValue('features', JSON.stringify(arrFacilities));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrFacilities]);

  const arrKeywords = useRef(['features']).current;

  return (
    <View>
      <ButtonTabValidate
        title={t('property_facilities')}
        onPress={() => setViewFacilities(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <InViewPort
        noLoading={true}
        onChange={render => render && setIsRender(render)}
        delay={50}>
        {isRender && (
          <Collapsible collapsed={!viewFacilities} style={styles.box}>
            <Accordion
              containerStyle={styles.content}
              activeSections={[showFacilitiesItem]}
              sections={dataPropertyFacilities}
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
                      value={t('property_facilities')}
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
                          isChecked={arrFacilities.includes(item)}
                          onPress={evt => {
                            facilitiesCheckBox(item);
                          }}
                          style={styles.checkBox}
                          textStyle={{
                            flex: 1,
                          }}
                        />
                      )
                    }
                  />
                );
              }}
            />
          </Collapsible>
        )}
      </InViewPort>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonCategories: {
    backgroundColor: 'white',
    borderRadius: scale(6),
    borderColor: '#F0B90B80',
    height: scale(50),
    justifyContent: 'space-between',
    marginTop: scale(20),
    paddingHorizontal: scale(20),
  },

  box: {
    paddingVertical: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    borderColor: '#F0B90B80',
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
