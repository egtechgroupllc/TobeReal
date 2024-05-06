import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import RadioButton from '../../../../../components/RadioButton';
import {scale} from '../../../../../../assets/constants';
import CheckBox from '../../../../../../components/CheckBox';
import Collapsible from 'react-native-collapsible';

const list = [
  {
    id: 1,
    title: 'Không',
  },
  {
    id: 2,
    title: 'Có, thêm lựa chọn bữa ăn',
  },
];
const listHasMeal = [
  {
    id: 1,
    title: 'Bữa sáng',
  },
  {
    id: 2,
    title: 'Bữa trưa',
  },
  {
    id: 3,
    title: 'Bữa tối',
  },
  {
    id: 4,
    title: 'Bao gồm tất cả',
  },
];
export default function RulesPolicy2({setValue, unregister}) {
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
