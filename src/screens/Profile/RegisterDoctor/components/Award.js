import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import Input from '~/components/Input';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import RenderHTML from 'react-native-render-html';
import {CText} from '~/components';
import {preprocessHtml} from '~/utils/preprocessHtml';

export default function Award({errors, watch, onGoBack, data}) {
  const {t} = useLanguage();
  const [isView, setView] = useState(false);
  const [dataGoBack, setDataGoBack] = useState('');
  const {navigate} = useNavigation();

  const arrKeywords = useRef(['awards']).current;
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  useEffect(() => {
    onGoBack && onGoBack(dataGoBack);
  }, [dataGoBack, onGoBack]);
  return (
    <View>
      <ButtonTabValidate
        title={t('award_in_medical_examination')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <Collapsible collapsed={!isView} style={styles.box}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.input,
            borderRadius: scale(10),
            padding: scale(10),
            height: scale(150),
            width: '100%',
          }}
          onPress={() => {
            navigate('EditorScreen', {
              dataExist: dataGoBack,
              awards: true,
              title: t('award_in_medical_examination'),
              onGoBack: value => {
                setDataGoBack(value);
              },
            });
          }}>
          <View style={{height: '100%', overflow: 'hidden'}}>
            {data ? (
              <RenderHTML
                contentWidth={400}
                source={preprocessHtml(data)}
                baseStyle={{
                  color: 'white',
                }}
                tagsStyles={{
                  p: {
                    marginVertical: 0,
                  },
                }}
              />
            ) : (
              <CText
                style={{fontSize: SIZES.xMedium, color: COLORS.White}}
                numberOfLines={5}>
                {t('enter_awards_in_medical_examination')}
              </CText>
            )}
          </View>
        </TouchableOpacity>
        {/* <Input
          styleContent={{
            backgroundColor: COLORS.input,
            borderWidth: 0,
          }}
          styleTextLabel={styles.styleLabel}
          style={{...styles.textInput}}
          placeholder="Enter awards in medical examination"
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          multiline
          scrollEnabled={false}
          editable={false}
          sizeInput="medium"
          value={data}
          onPress={() => {
            navigate('EditorScreen', {
              awards: true,
              title: 'Award in medical examination',
              onGoBack: data => {
                setDataGoBack(data);
              },
            });

            Keyboard.dismiss();
          }}
        /> */}
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: COLORS.input,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  textInput: {
    backgroundColor: COLORS.grey,
    borderWidth: 0,
  },
  styleLabel: {
    fontSize: SIZES.xMedium,
  },
});
