import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import Input from '~/components/Input';
import {useForm} from 'react-hook-form';
import {useLanguage} from '~/hooks/useLanguage';
import {requireField} from '~/utils/validate';
import {scale} from '~/utils/scale';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useAuthentication} from '~/hooks/useAuthentication';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '~/utils/format';
import SelectCountry from '~/components/Country/SelectCountry';
import {IconHome} from '~/assets/icon/Icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import General from './components/General';
import {
  getListRelationship,
  postCreateRelative,
  postUpdateRelative,
} from '~/api/relative';
import {showMess} from '~/assets/constants/Helper';
import ImageRelative from './components/ImageRelative';

export default function AddRelativeProfileScreen() {
  const {t} = useLanguage();
  const {token} = useAuthentication();
  const {goBack, navigate} = useNavigation();
  const {control, watch, handleSubmit, reset, setValue, errors} = useForm();
  const queryClient = useQueryClient();
  const params = useRoute().params;
  const createRelativeMutation = useMutation({
    mutationFn: postCreateRelative,
  });
  const updateRelativeMutation = useMutation({
    mutationFn: postUpdateRelative,
  });

  const handleCreateRelative = value => {
    const image_avatar = value?.image_avatars;
    delete value?.image_avatars;
    delete value?.image_avatar;
    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );

        if (!dataInside?.error) {
          queryClient.invalidateQueries([...getListRelationship.queryKey]);
          goBack();
        }
      },
      onError: err => console.log(err),
    };

    if (params?.relationship) {
      updateRelativeMutation.mutate(
        {
          data: {...value},
          id: params?.id,
        },
        mutationConfig,
      );
      return;
    } else {
      createRelativeMutation.mutate(
        {
          ...value,
          image_avatar,
        },
        mutationConfig,
      );
    }
  };
  useEffect(() => {
    if (params?.relationship) {
      reset();

      const entries = Object.entries(params);
      const arrKeyno = [
        'id',
        'userid',
        'created_at',
        'active',
        'country',
        'province',
      ];

      entries.map(item => {
        if (!arrKeyno.includes(item[0])) {
          const checkNum = typeof item[1] === 'number';
          setValue(item[0], checkNum ? String(item[1]) : item[1]);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      optionsHeader={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigate('BottomTab')}>
            <IconHome style={{width: scale(20)}} />
          </TouchableOpacity>
        ),
      }}
      styleContent={{paddingTop: 0}}
      headerTitle={
        !params?.relationship
          ? t('add_relative_profile')
          : t('update_relative_profile')
      }>
      <View style={styles.container}>
        <General control={control} setValue={setValue} params={params} />
        {!params?.relationship && (
          <ImageRelative
            control={control}
            setValue={setValue}
            watch={watch}
            errors={errors}
            arrImg={params?.images}
          />
        )}
        <Button
          title={t('ok')}
          onPress={handleSubmit(handleCreateRelative)}
          linearGradientProps={{colors: COLORS.linearButton}}
          buttonType="medium"
          style={styles.button}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(10),
    paddingTop: scale(20),
    rowGap: scale(16),
    paddingBottom: scale(100),
  },
  button: {
    width: '100%',
    marginTop: scale(30),
  },

  textInput: {
    backgroundColor: COLORS.grey,
    borderWidth: 0,
  },
  styleLabel: {
    fontSize: SIZES.xMedium,
  },
  radio: {
    height: scale(10),
    aspectRatio: 1,
    borderRadius: 99,
    alignItems: 'center',
    backgroundColor: COLORS.White,
    justifyContent: 'center',
  },
  dot: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 99,
    backgroundColor: COLORS.green,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(4),
    columnGap: scale(10),
  },
});
