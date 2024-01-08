import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomButton} from '.';
import {scale} from '../assets/constants';
import {IconBorderBottom} from '../assets/icon/Icon';

export default function TabSelectFind({data = [], onChange}) {
  const [tab, setTab] = useState(data[0]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: tab === data[0] ? 'flex-start' : 'flex-end',
      }}>
      {data.map((item, index) => (
        <View
          key={`key-${item}-${index}`}
          style={{width: '49%', alignItems: 'center'}}>
          <CustomButton
            key={`key-${item}-${index}`}
            text={item}
            buttonType="large"
            isShadow={tab === item}
            styleWrapper={{
              // flex: 0.5,
              width: '100%',
              borderRadius: 0,
              backgroundColor: tab === item ? '#fff' : '#e1e1e1',
            }}
            styleText={{
              color: '#000',
              textType: 'bold',
            }}
            onPress={() => {
              setTab(item);
              onChange(item);
            }}
          />
          {tab === item && (
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
  );
}
