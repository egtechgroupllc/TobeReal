import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomButton} from '../../components';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {IconBorderBottom} from '../../assets/icon/Icon';

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
  sizeText,
  transformText,
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
                      ? styleTabActive?.backgroundColor || COLORS.white
                      : styleTabDefault?.backgroundColor || COLORS.grey50,
                },
              ]}
              styleText={{
                color:
                  tab === index
                    ? styleTabActive?.color || COLORS.primary
                    : styleTabDefault?.color || COLORS.black,
                textType: 'bold',
                textTransform: transformText || 'uppercase',
                fontSize: sizeText || SIZES.xMedium,
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
        <View
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
        </View>
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
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: scale(16),
    rowGap: scale(14),
    borderWidth: 1,
    borderColor: COLORS.pioBox,
    ...SHADOW,
  },
  tab: {
    borderTopLeftRadius: scale(6),
    borderTopRightRadius: scale(6),
    // flex: 0.5,
    width: '100%',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
