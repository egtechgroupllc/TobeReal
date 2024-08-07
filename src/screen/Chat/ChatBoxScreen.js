import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  LogBox,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  LoadEarlier,
  Message,
  Send,
  SystemMessage,
  Time,
  Avatar,
} from 'react-native-gifted-chat';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  getListMessage,
  postCheckStatus,
  postSeenMessage,
  postSendChat,
} from '../../Model/api/common';
import {useSocket} from '../../Model/socket/socket';
import {COLORS, SIZES, images, scale} from '../../assets/constants';
import {
  IconAdd,
  IconArrowBottom,
  IconGoBack,
  IconHome,
  IconReceived,
  IconSend,
  IconSent,
} from '../../assets/icon/Icon';
import {useAuthentication} from '../../hooks/useAuthentication';
import {useLanguage} from '../../hooks/useLanguage';
import {useLoading} from '../../hooks/useLoading';
import ImageDetail from '../components/ImageDetail';
import {CustomText} from '../../components';

export default function ChatBoxScreen() {
  const {stopLoading, setLoading} = useLoading();
  const [messages, setMessages] = useState([]);

  const {t} = useLanguage();
  const {navigate, setOptions, goBack} = useNavigation();
  const params = useRoute().params;
  const queryClient = useQueryClient();
  const dataPro = queryClient.getQueryData(['user', 'profile'])?.data;
  const {token} = useAuthentication();
  const socket = useSocket();
  const chatGroupId = params?.chat_group_id;
  const otherUserId =
    params?.value?.chat_group__user?.userId || params?.data?.user_id;
  const chatRef = useRef(null);
  const {
    data: dataStatus,
    error,
    isError,
  } = useQuery({
    queryKey: ['chat', 'status', otherUserId],
    queryFn: () =>
      postCheckStatus({data: {user_id: otherUserId}, token: token}),
    enabled: !!token,
    refetchInterval: 5000,
  });
  const sendChatMutation = useMutation({
    mutationFn: postSendChat,
    onSuccess: data => {
      console.log('Message sent to API successfully:', data);
    },
    onError: error => {
      console.error('Error sending message to API:', error);
    },
  });
  const seenMessageMutation = useMutation({
    mutationFn: postSeenMessage,
  });
  useEffect(() => {
    stopLoading();
    return () => {
      return setLoading(true);
    };
  }, []);
  useLayoutEffect(() => {
    return setOptions({
      headerTitleComponent: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(5),
          }}>
          <CustomText
            numberOfLines={2}
            style={{
              fontSize: SIZES.medium,
              color: COLORS.white,
              maxWidth: scale(200),
            }}
            textType="semiBold">
            {params?.data?.contact_name || params?.value?.username}
          </CustomText>
          <View
            style={{
              height: scale(10),
              width: scale(10),
              backgroundColor: dataStatus?.data?.is_connected
                ? COLORS.green
                : COLORS.grey,
              borderRadius: scale(99),
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('Explore')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
      headerLeft: () =>
        params?.value?.username ? (
          <TouchableOpacity
            onPress={() => {
              queryClient.invalidateQueries([
                'chat',
                'my-list-chat-group',
                token,
              ]);
              goBack();
            }}>
            <IconGoBack style={{width: scale(20)}} fill={COLORS.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}>
            <IconGoBack style={{width: scale(20)}} fill={COLORS.white} />
          </TouchableOpacity>
        ),
    });
  }, [params, dataStatus?.data?.is_connected]);

  const insets = useSafeAreaInsets();
  const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useInfiniteQuery({
      queryKey: [
        'chat',
        'list-message',
        {
          chat_group_id: chatGroupId,
          token: token,
          limit: 15,
        },
      ],
      queryFn: ({pageParam = 1}) =>
        getListMessage({
          chat_group_id: chatGroupId,
          token: token,
          pageParam,
          limit: 15,
        }),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.data?.rows?.length < 10) return undefined;
        return allPages.length + 1;
      },
    });
  useEffect(() => {
    LogBox.ignoreLogs(['Encountered two children with the same key']);

    // Clean up
    return () => {
      LogBox.ignoreLogs([]);
    };
  }, []);
  useLayoutEffect(() => {
    if (data) {
      const allMessages = data.pages.flatMap(page => page.data.rows);

      setMessages(
        allMessages.map(msg => ({
          _id: msg.id,
          text: msg.content,
          createdAt: new Date(msg.createdAt),
          user: {
            _id: msg.user_id,
            name: `${dataPro?.username}`, // Adjust this to match your user data
          },
          sent: true,
          received: msg?.is_seen === true ? true : false,
          // // Mark the message as received, using two tick
          // received: true,
          // // Mark the message as pending with a clock loader
          // pending: true,
          images: msg.images || [], // Assuming the API returns image URLs in this field
        })),
      );
    }
  }, [data]);

  useEffect(() => {
    seenMessageMutation.mutate({
      data: {chat_group_id: chatGroupId},
      token,
    });
  }, []);

  const [first, setfirst] = useState(false);
  useEffect(() => {
    if (socket) {
      socket.on(`chat_group:${chatGroupId}`, value => {
        queryClient.invalidateQueries(['chat', 'my-list-chat-group', token]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('message', message => {
        const formattedMessage = {
          _id: message.id,
          text: message.content ? message.content : null,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.user_id,
            name: dataPro?.username, // Adjust this if you have the user's name
          },
          sent: true,
          received: false,
          images: message.images || [],
        };
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [formattedMessage]),
        );
        // Scroll to bottom when new message is received
        chatRef.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });

        // message.user_id !== dataPro?.id &&
        if (message.user_id !== dataPro?.id) {
          seenMessageMutation.mutate({
            data: {chat_group_id: chatGroupId},
            token,
          });
        }
      });
    }
  }, [socket, chatGroupId, first]);
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Tôi có thể giúp gì cho bạn?',
  //       createdAt: new Date(),
  //       user: {
  //         _id: params?.data?.user_id || otherUserId,
  //         name: params?.data?.user?.username,
  //       },

  //       // quickReplies: {
  //       //   type: 'radio', // hoặc 'checkbox' nếu muốn nhiều lựa chọn
  //       //   values: [
  //       //     {
  //       //       title: 'Tôi cần hỗ trợ đặt vé',
  //       //       value: 'ticket_support',
  //       //     },
  //       //     {
  //       //       title: 'Tôi cần liên hệ cộng tác viên',
  //       //       value: 'contact_agent',
  //       //     },
  //       //   ],
  //       // },
  //     },
  //     {
  //       _id: 2,
  //       text: 'Quý khách vui lòng không chuyển tiền hoặc giao dịch trực tuyến không thông qua app Saveloka, Saveloka sẽ không chịu trách nhiệm đối với những trường hợp mất mát tài sản không thông qua công ty Saveloka!',
  //       createdAt: new Date(),
  //       system: true,
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback(
    (messages = []) => {
      const message = messages[0];

      const formData = new FormData();
      formData.append('content', message.text);
      formData.append('chat_group_id', chatGroupId);

      sendChatMutation.mutate({
        data: formData,
        token,
      });
    },
    [chatGroupId, token, sendChatMutation],
  );
  const pickImages = () => {
    launchImageLibrary({selectionLimit: 0, mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.error) {
        const selectedImages = response.assets;

        const formData = new FormData();
        formData.append('chat_group_id', chatGroupId);
        selectedImages.forEach((img, index) => {
          formData.append('files', {
            uri: img.uri,
            type: img.type,
            name: img.fileName || `image${index}.jpg`,
          });
        });
        sendChatMutation.mutate({
          data: formData,
          token,
        });
      }
    });
  };
  const onQuickReply = useCallback((replies = []) => {
    const reply = replies[0];
    if (reply.value === 'ticket_support') {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random().toString(36).substring(7),
            text: 'Xin vui lòng cung cấp thông tin chuyến đi của bạn.',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Bot',
            },
          },
        ]),
      );
    } else if (reply.value === 'contact_agent') {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random().toString(36).substring(7),
            text: 'Chúng tôi sẽ kết nối bạn với một cộng tác viên sớm nhất.',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Bot',
            },
          },
        ]),
      );
    }
  }, []);
  const renderComposer = props => {
    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={pickImages}
          style={{borderWidth: 1, padding: scale(3), borderRadius: scale(10)}}>
          <IconAdd />
        </TouchableOpacity>
        <Composer {...props} textInputStyle={styles.textInput} />
      </View>
    );
  };
  const renderSend = props => {
    return (
      <Send {...props} containerStyle={{alignItems: 'center'}}>
        <View style={styles.sendContainer}>
          <IconSend fill={COLORS.primary} />
        </View>
      </Send>
    );
  };
  const renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          backgroundColor: '#f0f0f0',
          borderWidth: 1,
          borderColor: COLORS.grey,
          padding: scale(10),
          borderRadius: 5,
          marginBottom: 10,
          width: '90%',
          alignSelf: 'center',
        }}
        textStyle={{
          color: '#999',
          fontSize: 14,
        }}
      />
    );
  };

  const renderBubble = props => {
    const {currentMessage} = props;
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.primary,
          },
          left: {
            backgroundColor: COLORS.grey + '70',
            left: scale(10),
          },
        }}
        textStyle={{
          left: {
            color: '#000',
          },
          right: {
            color: '#fff',
          },
        }}
        renderCustomView={() => {
          if (currentMessage.images && currentMessage.images.length > 0) {
            return (
              <View
                style={{
                  ...styles.imagesContainer,
                  borderWidth: scale(1),
                  borderColor: COLORS.grey,
                }}>
                <ImageDetail
                  arrImg={currentMessage.images}
                  styleWrapper={{height: scale(150)}}
                />
              </View>
            );
          }
          return null;
        }}
        renderTicks={() => {
          return null;
        }}
      />
    );
  };
  const renderTicks = message => {
    return message?.user?._id === dataPro?.id ? (
      <View>{!message.received ? <IconSent /> : <IconReceived />}</View>
    ) : null;
  };

  const renderTime = props => {
    const {currentMessage} = props;
    return (
      <View
        style={{
          flexDirection: 'row',
          position: currentMessage.text ? 'relative' : 'absolute',
          top: currentMessage.text ? 0 : scale(-20),
          paddingRight: scale(10),
        }}>
        <Time
          {...props}
          timeTextStyle={{
            left: {color: COLORS.black, fontSize: 12},
            right: {color: COLORS.white, fontSize: 12},
          }}
        />
        {renderTicks(currentMessage)}
      </View>
    );
  };
  const renderMessage = props => {
    return (
      <View style={{marginBottom: 10}}>
        <Message {...props} renderAvatar={renderAvatar} />
      </View>
    );
  };

  const renderAvatar = props => {
    return (
      <View style={styles.avatarContainer}>
        <Image
          source={
            !(params?.value?.image_avatar || params?.data?.user?.image_avatar)
              ? images.avatar
              : {
                  uri:
                    params?.value?.url_image_avatar ||
                    params?.data?.user?.url_image_avatar,
                }
          }
          style={styles.avatar}
        />
      </View>
    );
  };
  const renderLoadEarlier = props => {
    return (
      <LoadEarlier
        {...props}
        containerStyle={{
          borderRadius: 10,
          padding: 10,
          paddingTop: scale(30),
        }}
        activityIndicatorColor={COLORS.primary}
        wrapperStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '0%',
          height: '0%',
          backgroundColor: 'red',
        }}
        isLoadingEarlier
        activityIndicatorSize={'large'}
      />
    );
  };

  const handleLoadMoreMessages = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <GiftedChat
          messageContainerRef={chatRef}
          isTyping
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: dataPro?.id,
          }}
          placeholder={t('enter_message')}
          // onQuickReply={onQuickReply}
          renderTime={renderTime}
          renderMessage={renderMessage}
          renderSystemMessage={renderSystemMessage}
          renderBubble={renderBubble}
          renderChatFooter={() => {
            return <View style={{paddingBottom: insets.bottom}} />;
          }}
          keyboardShouldPersistTaps="never"
          renderInputToolbar={props => {
            return (
              <InputToolbar
                {...props}
                primaryStyle={{
                  alignItems: 'center',
                }}
                containerStyle={{
                  borderTopColor: COLORS.primary,
                  borderTopWidth: 1,
                  paddingBottom: insets.bottom,
                  paddingHorizontal: scale(10), // Adjust padding as needed
                  alignItems: 'center', // Align items to center
                  flexDirection: 'row', // Make sure the row direction is set
                }}
                renderComposer={renderComposer}
                renderSend={renderSend}
              />
              // <InputChat/>
            );
          }}
          renderLoadEarlier={renderLoadEarlier}
          loadEarlier={hasNextPage}
          onLoadEarlier={handleLoadMoreMessages}
          isLoadingEarlier={isFetchingNextPage}
          renderLoading={() => (
            <ActivityIndicator style={{color: COLORS.primary}} />
          )}
          infiniteScroll
          scrollToBottom
          scrollToBottomComponent={() => {
            return (
              <View
                style={{
                  width: scale(50),
                  height: scale(50),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconArrowBottom
                  width={scale(20)}
                  height={scale(20)}
                  fill={COLORS.grey}
                />
              </View>
            );
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    columnGap: scale(10),
    flex: 1, // Ensure it takes up available space
  },
  textInput: {
    flex: 1,
    paddingTop: scale(8.5), // Adjust based on your needs
    paddingBottom: scale(8.5), // Adjust based on your needs
    paddingLeft: 0, // Remove extra padding
    marginLeft: 0, // Remove extra margin
    color: COLORS.black,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  systemMessageContainer: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  systemMessageText: {
    color: '#000',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    borderRadius: scale(10),
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  avatarContainer: {
    borderWidth: scale(2),
    borderColor: COLORS.white,
    borderRadius: scale(99),
  },
  avatar: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(99),
  },
});
