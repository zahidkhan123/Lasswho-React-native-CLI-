import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Screen } from '@components';
import FacebookIcon from '../../assets/icons/fb_social.svg';
import EmailIcon from '../../assets/icons/email_social.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import { openComposer } from 'react-native-email-link';

interface Props {}

export const InviteFriendsScreen = () => {
  const refferalCode = 'LASSWHO78261';
  // Will be randomly generated hardcoded for now

  const copyToClipboard = () => {
    Clipboard.setString(refferalCode);
  };

  const shareToFacebook = () => {
    const url = 'https://www.facebook.com/sharer/sharer.php?';
    const messsage = `Hey, you should join me on this great app I found!
    Enter the code ${refferalCode} when you signup and both you and me will recieve a special discount voucher`;
    const fullUrl = `${url}u=${url}&quote=${encodeURI(messsage)}`;

    Linking.openURL(fullUrl)
      .then(() => {
        console.log('Facebook Opened');
      })
      .catch(() => {
        console.log('Something went wrong');
      });
  };

  const openEmail = () => {
    openComposer({
      title: 'Open mail app?',
      subject: 'Hey, come join me on this cool app I found!',
      body: `Here is your share code: ${refferalCode}`,
    });
  };

  return (
    <Screen style={tailwind('p-6')} preset="scroll" backgroundColor={getColor('lasswho-main')}>
      <Text style={tailwind('text-left text-gray-300 text-2xl mb-8 mt-4')}>
        Invite your friends!
      </Text>

      <View style={tailwind('flex mb-10')}>
        <TouchableOpacity
          style={tailwind(
            'text-lg p-6 rounded-lg mb-4 border-dotted border border-red-300 w-full',
          )}>
          <Text
            onPress={copyToClipboard}
            style={tailwind('text-xl text-lasswho-accent text-center')}>
            {refferalCode}
          </Text>
        </TouchableOpacity>

        <Text style={tailwind('text-left text-xl text-red-300 mb-6')}>
          Click to copy your code
        </Text>

        <View style={tailwind('flex flex-row justify-center')}>
          <TouchableOpacity onPress={shareToFacebook}>
            <FacebookIcon height={90} width={90} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openEmail}>
            <EmailIcon height={90} width={90} />
          </TouchableOpacity>
          {/* <TwitterIcon height={90} width={90} />
          <WhatsappIcon height={90} width={90} /> */}
        </View>

        <View style={tailwind('mt-10')}>
          <Text
            style={tailwind('text-left text-gray-300 text-2xl border-b border-red-200 mb-8')}>
            Your contacts
          </Text>
          <Text style={tailwind('text-center text-lg text-red-300')}>
            No contacts yet...
          </Text>
        </View>
      </View>
    </Screen>
  );
};
