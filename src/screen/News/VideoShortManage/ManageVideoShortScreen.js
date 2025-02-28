import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useRef} from 'react';
import {useLanguage} from '../../../hooks/useLanguage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CustomText, MainWrapper} from '../../../components';
import {
  COLORS,
  SIZES,
  WIDTH,
  animations,
  scale,
} from '../../../assets/constants';
import {IconAdd} from '../../../assets/icon/Icon';
import {useAuthentication} from '../../../hooks/useAuthentication';
import {getMyListVideoShort} from '../../../Model/api/common';
import {useQuery} from '@tanstack/react-query';
import Video from 'react-native-video';
import {ScrollView} from 'react-native-gesture-handler';
import EmptyData from '../../../components/EmptyData';
import AnimatedLottieView from 'lottie-react-native';

export default function ManageVideoShortScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  const params = useRoute().params;
  const {token} = useAuthentication();

  const model_name =
    params?.accommodation?.id || params?.accomId
      ? 'accommodation'
      : params?.estateId
      ? 'estate'
      : 'tour';

  const table_id =
    params?.accomId ||
    params?.accommodation?.id ||
    params?.estateId ||
    params?.tour?.id ||
    params?.tourId;

  const {data, isLoading, error} = useQuery({
    queryKey: [
      'common',
      'video-short',
      'my-list',
      {
        model_name: model_name,
        table_id: table_id,
      },
    ],
    queryFn: () =>
      getMyListVideoShort({
        model_name: model_name,
        table_id: table_id,
      }),
  });

  const videoRef = useRef();
  const [loadingVideos, setLoadingVideos] = React.useState({});

  const handleLoadStart = id => {
    setLoadingVideos(prev => ({...prev, [id]: true}));
  };

  const handleLoad = id => {
    setLoadingVideos(prev => ({...prev, [id]: false}));
  };

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('manage_video_short'),

      headerRight: () => (
        <>
          {params?.accomId || params?.estateId || params?.tourId ? (
            <TouchableOpacity
              onPress={() => {
                const navigateParams = params?.accomId
                  ? {
                      Accom: params?.Accom,
                      accomId: params?.accomId,
                    }
                  : params?.estateId
                  ? {
                      Estate: params?.Estate,
                      estateId: params?.estateId,
                    }
                  : {
                      Tour: params?.tour?.isTour,
                      tourId: params?.tourId,
                    };

                navigate('PostVideoShortScreen', navigateParams);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(5),
              }}>
              <View
                style={{
                  borderRadius: scale(10),
                  borderWidth: 1,
                  padding: scale(2),
                  borderColor: COLORS.white,
                }}>
                <IconAdd fill={COLORS.white} />
              </View>

              <CustomText
                textType="semiBold"
                style={{
                  color: '#fff',
                  fontSize: SIZES.xMedium,
                }}>
                {t('add')}
              </CustomText>
            </TouchableOpacity>
          ) : null}
        </>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainWrapper>
      <FlatList
        data={data?.data?.rows}
        numColumns={3}
        alwaysBounceVertical={false}
        directionalLockEnabled={true}
        keyExtractor={(item, index) => `$key_${item.id}-${index}`}
        columnWrapperStyle={{columnGap: scale(5)}}
        contentContainerStyle={{
          paddingHorizontal: scale(12),
          marginTop: scale(10),
          rowGap: scale(5),
        }}
        ListEmptyComponent={<EmptyData styleWrapper={{marginTop: '50%'}} />}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigate('DetailVideoShortScreen', {data, isLoading, index})
            }
            key={index}
            style={{
              height: scale(170),
              width: WIDTH.widthScreen / 3 - scale(5) - scale(6),
              backgroundColor: '#000',
            }}>
            <Video
              ref={videoRef}
              source={{uri: item?.url || item?.uri}}
              style={{
                height: '100%',
                width: '100%',
              }}
              repeat
              paused={true}
              resizeMode={'cover'}
              onLoadStart={() => handleLoadStart(item.id)}
              onLoad={() => handleLoad(item.id)}
            />
            {loadingVideos[item.id] && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                }}>
                <ActivityIndicator color={COLORS.white} />
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      {isLoading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            paddingTop: scale(200),
            alignSelf: 'center',
          }}>
          <AnimatedLottieView
            source={animations.pending}
            autoPlay
            loop
            style={{
              width: scale(150),
              height: scale(150),
            }}
          />
        </View>
      )}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
