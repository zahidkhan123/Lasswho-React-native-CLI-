import React, { useState } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Screen, Text } from '@components';
import FacebookIcon from '../../assets/icons/facebook.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import { useQuery } from '@apollo/client';
import { FetchUserDocument } from '@generated/graphql';
import * as storage from '@utils/storage';
import { config } from '@config';

export const ContactsScreen = () => {
  const { data } = useQuery(FetchUserDocument);
  const [inviteCode, setInviteCode] = useState('');

  if (data && !inviteCode) {
    setInviteCode(String(data?.me?.invite_code));
    storage.saveString('inviteCode', inviteCode);
  }

  const inviteUrl = `${config.API_DOMAIN}/api/invite/${inviteCode}`;

  const copyToClipboard = () => {
    Clipboard.setString(inviteUrl);
    Toast.show('Copied to clipboard!');
  };

  const shareToFacebook = () => {
    const url = 'https://www.facebook.com/sharer/sharer.php?';
    const message = `Check out LassWho - an app to live video-chat your heroes: ${inviteUrl}`;
    const fullUrl = `${url}u=${url}&quote=${encodeURI(message)}`;

    Linking.openURL(fullUrl)
      .then(() => {
        console.log('Facebook Opened');
      })
      .catch(() => {
        console.log('Something went wrong');
      });
  };

  return (
    <Screen
      style={tailwind('p-6')}
      preset="scroll"
      backgroundColor={getColor('lasswho-main')}
    >
      <Text
        style={tailwind(
          'text-center text-3xl text-gray-200 mb-6 border-b border-gray-200',
        )}
      >
        Invite friends
      </Text>
      <Text style={tailwind('text-center text-gray-200 text-lg')}>
        Invite your friends from Facebook
      </Text>
      <View style={tailwind('items-center')}>
        <TouchableOpacity onPress={shareToFacebook}>
          <FacebookIcon height={60} width={60} style={tailwind('m-2')} />
        </TouchableOpacity>
      </View>
      <Text style={tailwind('text-center text-lg text-gray-200 mb-6')}>
        or share your unique URL
      </Text>

      <View style={tailwind('flex mb-10')}>
        <TouchableOpacity
          style={tailwind(
            'p-2 rounded-lg mb-4 border-dotted border border-lasswho-accent w-full',
          )}
        >
          <Text
            onPress={copyToClipboard}
            style={tailwind('text-xs text-lasswho-accent text-center')}
          >
            {inviteUrl}
          </Text>
        </TouchableOpacity>

        <Text style={tailwind('text-center text-lg text-gray-200 mb-6')}>
          Click to copy
        </Text>

        <View style={tailwind('mt-10')}>
          <Text
            style={tailwind(
              'text-center text-gray-200 text-3xl border-b border-gray-200 mb-4 p-2',
            )}
          >
            My contacts
          </Text>
          <Text style={tailwind('text-center text-lg text-gray-400')}>
            No contacts yet
          </Text>
        </View>
      </View>
    </Screen>
  );
};
