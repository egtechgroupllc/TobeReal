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
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {IconHome} from '~/assets/icon/Icon';
import CText from '../CText';
import {useLanguage} from '~/hooks/useLanguage';

export default function EditorScreen() {
  const {t} = useLanguage();
  const params = useRoute().params;
  const {goBack, setOptions} = useNavigation();
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: params?.dataExist?.editorContent
      ? params?.dataExist?.editorContent
      : 'Start editing!',
  });

  const handleGetContent = async () => {
    const editorContent = await editor.getHTML();
    params?.onGoBack({editorContent, params});

    goBack();
  };

  useLayoutEffect(() => {
    setOptions({
      headerTitle: params?.title,
      headerRight: () => (
        <TouchableOpacity onPress={handleGetContent}>
          <CText style={{color: COLORS.White, fontSize: SIZES.medium}}>
            {t('done')}
          </CText>
        </TouchableOpacity>
      ),
    });
  }, [setOptions, handleGetContent, params]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <View style={{marginTop: scale(50), flex: 1}}>
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
