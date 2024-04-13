import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomButton} from '.';
import {COLORS, SHADOW, SIZES, scale} from '../assets/constants';
import {IconBorderBottom} from '../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';

const funcFallBlack = () => {};
export default function TabSelect({
  data = [],

  onChange = funcFallBlack,
  renderView,
  isShadow = true,
  styleWrapper,
  styleContainerTab,
  styleContent,
  styleTabActive,
  styleTabDefault,
  isLine,
  keyView = 'name',
  isObj,
}) {
  const [tab, setTab] = useState(0);

  if (data.length <= 0) return null;
  return (
    <View style={[styles.wrapper, styleWrapper]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: tab === data[0] ? 'flex-start' : 'flex-end',
          height: scale(48),
          alignItems: 'flex-end',
          ...styleContainerTab,
          width: '100%',
        }}>
        {data.map((item, index) => (
          <View
            key={`key-${index}`}
            style={[
              data[2]
                ? {
                    flex: 1,
                  }
                : {
                    width: renderView ? '49%' : '50%',
                  },
              {
                height:
                  tab === index
                    ? styleTabActive?.height || '100%'
                    : styleTabDefault?.height || '86%',
              },
            ]}>
            <CustomButton
              key={`key-${item}-${index}`}
              text={isObj ? item?.[keyView] : item}
              buttonType="large"
              isShadow={isShadow && tab === index}
              style={[
                styles.tab,
                tab === index ? styleTabActive : styleTabDefault,
                {
                  height: '100%',
                  backgroundColor:
                    tab === index
                      ? styleTabActive?.backgroundColor || COLORS.primary
                      : styleTabDefault?.backgroundColor ||
                        COLORS.transparentGrey,
                },
              ]}
              styleText={{
                color:
                  tab === index
                    ? styleTabActive?.color || COLORS.white
                    : styleTabDefault?.color || COLORS.white,
                textType: 'bold',
                fontSize: SIZES.xMedium,
              }}
              onPress={() => {
                setTab(index);
                onChange(item);
              }}
            />
            {tab === index && isLine && (
              <IconBorderBottom
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                }}
              />
            )}
          </View>
        ))}
      </View>

      {!!renderView && (
        <LinearGradient
          colors={['#502D9F66', '#99999966']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={[
            styles.content,
            styleContent,
            tab !== data[1] && {
              borderTopLeftRadius: 0,
            },
            tab !== data[0] && {
              borderTopRightRadius: 0,
            },
            data[2] && {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
            isShadow && SHADOW,
          ]}>
          {renderView(tab)}
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    width: '100%',
    minHeight: scale(200),
    borderRadius: 12,
    paddingVertical: scale(16),
    rowGap: scale(14),
  },
  tab: {
    borderTopLeftRadius: scale(6),
    borderTopRightRadius: scale(6),
    // flex: 0.5,
    width: '100%',
    borderRadius: 0,
  },
});
