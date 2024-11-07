import {StyleSheet, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {scale} from '~/utils/scale';
import {COLORS} from '~/assets/constants';

export default function ChatView() {
  const chatData = {
    greetings: {
      patterns: ['hello', 'hi', 'hey'],
      responses: [
        'Hello! How can I help you?',
        'Hi there! What can I do for you?',
      ],
    },
    goodbye: {
      patterns: ['bye', 'goodbye'],
      responses: ['Goodbye! Have a great day!', 'See you later!'],
    },
    default: {
      responses: ["Sorry, I don't understand. Could you try again?"],
    },
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I assist you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );

    const userMessage = newMessages[0].text.toLowerCase();
    const botResponse = getBotResponse(userMessage);
    sendBotMessage(botResponse);
  }, []);

  // Hàm xử lý để tìm câu trả lời từ chatData
  const getBotResponse = message => {
    for (let key in chatData) {
      const patterns = chatData[key]?.patterns; // Kiểm tra nếu patterns tồn tại
      if (patterns) {
        for (let pattern of patterns) {
          if (message.includes(pattern)) {
            const responses = chatData[key]?.responses; // Kiểm tra nếu responses tồn tại
            if (responses) {
              return responses[Math.floor(Math.random() * responses.length)];
            }
          }
        }
      }
    }
    // Trả về câu trả lời mặc định nếu không tìm thấy mẫu
    return chatData.default.responses[
      Math.floor(Math.random() * chatData.default.responses.length)
    ];
  };

  // Gửi tin nhắn của bot
  const sendBotMessage = text => {
    const botMessage = {
      _id: Math.random().toString(36).substr(2, 9),
      text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Chatbot',
      },
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, botMessage),
    );
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.input,
        height: scale(150),
        width: '90%',
        alignSelf: 'center',
        borderRadius: scale(10),
      }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
