import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import Collapsible from 'react-native-collapsible';
import Input from '~/components/Input';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {useNavigation} from '@react-navigation/native';
import {Button, CText} from '~/components';
import RenderHTML from 'react-native-render-html';
import {preprocessHtml} from '~/utils/preprocessHtml';

export default function Service({errors, watch, onGoBack, data, setValue}) {
  const {t} = useLanguage();
  const [isView, setView] = useState(false);
  const [dataGoBack, setDataGoBack] = useState('');
  const {navigate} = useNavigation();
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const {width} = useWindowDimensions();

  const arrKeywords = useRef(['service']).current;
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  useEffect(() => {
    onGoBack && onGoBack(dataGoBack);
  }, [dataGoBack, onGoBack]);
  useEffect(() => {
    dataSpecialty?.length > 0 && setValue('array_specialty_id', dataSpecialty);
  }, [dataSpecialty]);
  return (
    <View>
      <ButtonTabValidate
        title={t('specializes_in_medical_examination')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <Collapsible collapsed={!isView} style={styles.box}>
        <View>
          <Button
            title={
              dataSpecialty?.length > 0
                ? `${t('selected')} ${dataSpecialty?.length} ${t(
                    'specialties',
                  )}`
                : t('choose_specialty')
            }
            backgroundColor={
              dataSpecialty?.length > 0 ? COLORS.bluecyan : COLORS.input
            }
            sizeButton="normal"
            onPress={() => {
              navigate('NoBottomTab', {
                screen: 'ListSpecialtyScreen',
                params: {
                  onGoBack: value => {
                    setDataSpecialty(value);
                  },
                  dataSpecialty,
                },
              });
            }}
          />
        </View>
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
              service: true,
              title: t('medical_examination_services'),
              dataExist: dataGoBack,
              onGoBack: value => {
                setDataGoBack(value);
              },
            });
          }}>
          <View style={{height: '100%', overflow: 'hidden'}}>
            {data ? (
              <RenderHTML
                contentWidth={width}
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
                {t('enter_medical_examination_services')}
              </CText>
            )}
          </View>
        </TouchableOpacity>
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
