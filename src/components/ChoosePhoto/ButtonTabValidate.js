/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Button from '../Button';
import {COLORS} from '~/assets/constants';
import {IconDown, IconRight} from '~/assets/icon/Icon';
import {scale} from '~/utils/scale';

export default memo(function ButtonTabValidate({
  onPress,
  watch = () => {},
  arrKeywords,
  title,
  errors,
  style,
  disabled,
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
    <Button
      disabled={disabled}
      outline
      styleContent={[
        style || styles.buttonCategories,
        isValid && {borderColor: '#f6465d'},
      ]}
      title={title}
      // iconRight={() => <IconRight />}
      Icon={IconDown}
      iconRight
      onPress={onPress}
      styleText={{
        color: COLORS.White,
      }}
    />
  );
});
const styles = StyleSheet.create({
  buttonCategories: {
    backgroundColor: COLORS.input,
    borderRadius: scale(6),
    // borderColor: COLORS.input,
    height: scale(50),
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
});
