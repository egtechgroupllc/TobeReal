import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {CImage, CText, MainWrapper} from '~/components';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import {useRoute} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import {IconLocation} from '~/assets/icon/Icon';
import {useLanguage} from '~/hooks/useLanguage';
import Category from '~/screens/Products/ListProduct/components/Category';
import General from './components/General';
import Appoint from './components/Appoint';
import RenderHTML from 'react-native-render-html';
import {preprocessHtml} from '~/utils/preprocessHtml';
import MedicalSpecialty from './components/MedicalSpecialty';
import {getDetailFacility} from '~/api/common';
import {useQuery} from '@tanstack/react-query';
import AnimatedLottieView from 'lottie-react-native';

export default function DetailFacilityScreen() {
  const params = useRoute().params;
  const width = useWindowDimensions().width;
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [sectionsLayout, setSectionsLayout] = useState([]);
  const {t} = useLanguage();

  const {data, isLoading, error} = useQuery({
    queryKey: [...getDetailFacility.queryKey, {id: params?.id}],
    queryFn: () => getDetailFacility({id: params?.id}),
  });

  // Hàm xử lý khi cuộn đến mục nào
  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      listener: event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        let newActiveIndex = activeNavIndex;

        sectionsLayout.forEach((layout, index) => {
          if (offsetY + 100 >= layout.top && offsetY < layout.bottom) {
            newActiveIndex = index;
          }
        });

        if (newActiveIndex !== activeNavIndex) {
          setActiveNavIndex(newActiveIndex);
        }
      },
    },
  );

  // Hàm xử lý scroll đến một section cụ thể
  const handleScrollTo = useCallback(
    index => {
      if (scrollViewRef.current && sectionsLayout[index]) {
        scrollViewRef.current.scrollTo({
          y: sectionsLayout[index].top,
          animated: true,
        });
      }
    },
    [sectionsLayout],
  );

  // Hàm lưu vị trí của mỗi section
  const onSectionLayout = (event, index) => {
    const layout = event.nativeEvent.layout;
    setSectionsLayout(prev => {
      const newLayouts = [...prev];
      newLayouts[index] = {top: layout.y, bottom: layout.y + layout.height};
      return newLayouts;
    });
  };
  const listNavBar = useMemo(
    () => [
      {name: t('general_information')},
      {name: t('medical_specialties')},
      {name: t('appointment')},
      {name: t('services')},
      {name: t('infrastructure')},
    ],
    [t],
  );

  const sections = [
    {title: t('general_information'), key: 'section1'},
    {title: t('medical_specialties'), key: 'section2'},
    {title: t('appointment'), key: 'section3'},
    {title: t('services'), key: 'section4'},
    {title: t('infrastructure'), key: 'section5'},
  ];
  const Section = ({
    title,
    onLayout,
    index,
    containerStyle,
    titleStyle,
    children,
  }) => {
    return (
      <View style={containerStyle} onLayout={onLayout}>
        <CText style={titleStyle} textType="bold">
          {title}
        </CText>
        {children}
      </View>
    );
  };
  const listContent = useMemo(() => {
    return [
      <General data={data?.data} />,
      <MedicalSpecialty data={data?.data?.specialties} isLoading={isLoading} />,
      <Appoint data={data?.data} isLoading={isLoading} />,
      <RenderHTML
        contentWidth={width}
        source={preprocessHtml(data?.data?.services)}
        baseStyle={{
          color: 'white',
        }}
        tagsStyles={{
          p: {
            marginVertical: 0,
          },
        }}
      />,
      <RenderHTML
        contentWidth={width}
        source={preprocessHtml(data?.data?.infrastructure)}
        baseStyle={{
          color: 'white',
        }}
        tagsStyles={{
          p: {
            marginVertical: 0,
          },
        }}
      />,
    ];
  }, [data?.data, isLoading]);
  const listView = useMemo(() => {
    return [
      <View
        style={{
          rowGap: scale(10),
          paddingBottom: scale(100),
          opacity: isLoading ? 0.2 : 1,
        }}>
        {sections.map((section, index) => (
          <Section
            key={section.key}
            title={section.title}
            containerStyle={styles.sectionContainer}
            titleStyle={styles.sectionTitle}
            onLayout={event => onSectionLayout(event, index)}>
            {listContent[index]}
          </Section>
        ))}
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
              source={animations.medicalLoading}
              autoPlay
              loop
              style={{
                width: scale(250),
                height: scale(250),
              }}
            />
          </View>
        )}
      </View>,
    ];
  }, [t, listContent]);

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      scrollEnabled={false}
      headerTitle={t('medical_facilities')}>
      <View style={styles.navBar}>
        <Category
          data={listNavBar}
          isObject
          onPress={(item, index) => handleScrollTo(index)}
          activeNavIndex={activeNavIndex}
          styleButton={{borderRadius: scale(5)}}
          styleWrapper={{paddingHorizontal: scale(10)}}
          styleContent={{paddingHorizontal: scale(10)}}
        />
      </View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}>
        {listView}
      </Animated.ScrollView>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: scale(15),
    borderBottomWidth: 1,
    borderColor: COLORS.input,
  },
  sectionContainer: {
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    rowGap: scale(20),
  },
  sectionTitle: {
    fontSize: SIZES.large,
    color: COLORS.White,
  },
  scrollViewContent: {
    paddingBottom: scale(100),
  },
});
