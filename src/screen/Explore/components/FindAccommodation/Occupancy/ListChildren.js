import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {COLORS, FONTS, SIZES, scale} from '../../../../../assets/constants';
import {IconDown} from '../../../../../assets/icon/Icon';
import Counter from '../../../../../components/Counter';
import CustomText from '../../../../../components/CustomText';
import CustomSelectDropdown from '../../../../../components/CustomSelectDropdown';
const list = [...Array(18)].map((_, index) => (index === 0 ? '< 1' : index));
export default function ListChildren({onChange, quantity}) {
  const [listChild, setListChild] = useState(quantity || []);

  const handleAdd = () => {
    setListChild(prev => [...prev, 8]);
  };

  const handleDown = () => {
    const newArr = [...listChild];
    newArr.pop();
    setListChild(newArr);
  };

  const handleChildAgeChange = (selectedItem, index) => {
    setListChild(prevList => {
      prevList[index] = selectedItem;
      return [...prevList];
    });
  };

  useEffect(() => {
    if (onChange) {
      onChange(listChild);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listChild]);

  return (
    <View
      style={{
        rowGap: SIZES.xSmall,
      }}>
      <Counter
        heading="Children"
        subHeading={'Age (0 - 17)'}
        min={0}
        max={6}
        onAdd={handleAdd}
        onDown={handleDown}
        value={listChild.length}
      />

      {listChild.length > 0 && (
        <View style={styles.boxList}>
          <CustomText style={{color: COLORS.textSub}}>
            Please state the age of each child
          </CustomText>

          {listChild.map((item, index) => (
            <View
              key={`key-${index}`}
              style={{
                rowGap: scale(5),
              }}>
              <CustomText textType="semiBold">Child {index + 1} Age</CustomText>
              <CustomSelectDropdown
                data={list}
                defaultValueByIndex={8}
                defaultValue={item}
                onSelect={(selectedItem, i) => {
                  handleChildAgeChange(selectedItem, index);
                }}
                buttonStyle={styles.buttonStyle}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.xSmall,
    alignItems: 'center ',
  },
  buttonStyle: {
    width: scale(400 / 2.6),
  },
});
