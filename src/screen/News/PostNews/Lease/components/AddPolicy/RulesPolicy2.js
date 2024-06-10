import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import RadioButton from '../../../../../components/RadioButton';
import {COLORS, scale} from '../../../../../../assets/constants';
import CheckBox from '../../../../../../components/CheckBox';
import Collapsible from 'react-native-collapsible';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function RulesPolicy2({setValue, unregister}) {
  const {t} = useLanguage();

  const list = [
    {
      id: 1,
      title: t('no'),
    },
    {
      id: 2,
      title: t('more_meal'),
    },
  ];
  const listHasMeal = [
    {
      id: 1,
      title: t('BREAKFAST'),
    },
    {
      id: 2,
      title: t('lunch'),
    },
    {
      id: 3,
      title: t('dinner'),
    },
    {
      id: 4,
      title: t('include_all'),
    },
  ];
  const [isSelect, setIsSelect] = useState(0);
  const [arrFacilities, setArrFacilities] = useState([listHasMeal[0].title]);

  useEffect(() => {
    const checkAll = arrFacilities?.includes(listHasMeal[3].title);

    if (isSelect === 1) {
      setValue('features', arrFacilities);
      if (checkAll) {
        setValue('features', [listHasMeal[3].title]);
      } else {
        setValue('features', arrFacilities);
      }
    } else {
      unregister('features');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelect, arrFacilities]);

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
    const checkAll = arrFacilities?.includes(listHasMeal[3].title);
    if (checkAll) {
      setArrFacilities([listHasMeal[3].title]);
    }
  }, [isSelect]);

  return (
    <View>
      <View
        style={{
          rowGap: scale(10),
        }}>
        {list.map((item, index) => {
          return (
            <RadioButton
              onPress={() => setIsSelect(index)}
              key={index}
              title={item?.title}
              isCheck={isSelect === index}
            />
          );
        })}
      </View>
      <Collapsible collapsed={isSelect === 0}>
        <View style={styles.boxCheckMeal}>
          {listHasMeal.map((item, index) => {
            return (
              <CheckBox
                textStyle={{color: COLORS.black}}
                key={index}
                text={item?.title}
                isChecked={arrFacilities?.includes(item?.title)}
                onPress={evt => {
                  facilitiesCheckBox(item?.title);
                }}
              />
            );
          })}
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  boxCheckMeal: {
    rowGap: scale(10),
    marginLeft: '7%',
    marginTop: scale(12),
  },
});
