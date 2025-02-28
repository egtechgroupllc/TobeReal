import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RichText, Toolbar, useEditorBridge} from '@10play/tentap-editor';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {CustomText} from '../../../../../../components';
import {COLORS, scale, SIZES} from '../../../../../../assets/constants';

export default function EditorScreen() {
  const {t} = useLanguage();
  const params = useRoute().params;
  const {goBack, setOptions} = useNavigation();

  // Khởi tạo nội dung ban đầu dựa theo ngày
  const initialContent = params?.dataExist?.editorContent || 'Start editing!';

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: initialContent,
  });

  const handleGetContent = async () => {
    const editorContent = await editor.getHTML();
    // Trả về cả nội dung và thông tin ngày
    params?.onGoBack({
      editorContent,
      day: params?.dataExist?.day,
    });
    goBack();
  };

  useLayoutEffect(() => {
    setOptions({
      headerTitle: `${t('description_day')} ${params?.dataExist?.day}`,
      headerRight: () => (
        <TouchableOpacity onPress={handleGetContent}>
          <CustomText style={{color: COLORS.white, fontSize: SIZES.medium}}>
            {t('confirm')}
          </CustomText>
        </TouchableOpacity>
      ),
    });
  }, [setOptions, handleGetContent, params]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.pioHeader}}>
      <View style={{flex: 1}}>
        <RichText editor={editor} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
        }}>
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
