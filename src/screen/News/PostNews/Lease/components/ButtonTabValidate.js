/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {COLORS, scale} from '../../../../../assets/constants';
import {IconRight} from '../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../components';

export default memo(function ButtonTabValidate({
  onPress,
  watch = () => {},
  arrKeywords,
  title,
  errors,
  style,
}) {
  const [isValid, setIsValid] = useState(false);

  const checkObjectKeys = useCallback((obj, keys) => {
    for (let key of keys) {
      if (key in obj) {
        setIsValid(true);
        return true;
      }
    }
    setIsValid(false);
    return false;
  }, []);

  useEffect(() => {
    arrKeywords && errors && checkObjectKeys(errors, arrKeywords);
  }, [errors, watch(), arrKeywords]);

  return (
    <CustomButton
      outline
      style={[
        style || styles.buttonCategories,
        isValid && {borderColor: '#f6465d'},
      ]}
      text={title}
      iconRight={() => <IconRight />}
      onPress={onPress}
      styleText={{
        color: COLORS.text,
      }}
    />
  );
});
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
});
