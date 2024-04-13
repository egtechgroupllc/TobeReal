/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {COLORS, scale} from '../../../../../assets/constants';
import {IconRight} from '../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../components';
import {TextStyle} from 'react-native';

export default memo(function ButtonTabValidate({
  onPress,
  watch = () => {},
  arrKeywords,
  title,
  errors,
  styleWrapper,
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
        styles.buttonCategories,
        styleWrapper,
        isValid && {borderWidth: 0},
      ]}
      text={title}
      iconRight={() => <IconRight />}
      onPress={onPress}
      styleText={{
        color: COLORS.white,
      }}
    />
  );
});
const styles = StyleSheet.create({
  buttonCategories: {
    backgroundColor: COLORS.transparentGrey,
    borderRadius: scale(6),
    borderWidth: 0,
    // borderColor: COLORS.primary,
    height: scale(50),
    justifyContent: 'space-between',
    marginTop: scale(20),
    paddingHorizontal: scale(20),
  },
});
