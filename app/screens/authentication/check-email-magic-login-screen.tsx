import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, View, Image, ImageBackground } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Screen, Text, Icon } from '@components';
const checkEmailImage = {
  uri: 'https://lasswho.s3.eu-west-2.amazonaws.com/assets/mobile/login-bg.jpg',
};
const Logo = '../../assets/icons/lw_logo.png';

export const CheckEmailMagicLoginScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen style={tailwind('flex')} backgroundColor={getColor('lasswho-main')}>
      <ImageBackground
        source={checkEmailImage}
        style={tailwind('items-center justify-center px-8 h-full')}
      >
        <Image source={require(Logo)} style={tailwind('h-20 w-20')} />
        <View>
          <Text
            style={tailwind(
              'text-center text-gray-300 text-2xl uppercase mt-10 mb-4',
            )}
          >
            Check your email
          </Text>
        </View>

        <Text style={tailwind('text-center text-sm text-white')}>
          Please check your email.
        </Text>
        <Text style={tailwind('text-center text-sm text-white mb-20')}>
          We’ve sent you a log in link.
        </Text>
        <Pressable
          style={tailwind('p-3 flex-row mb-10 items-center')}
          onPress={() => navigation.navigate('login')}
        >
          <Icon
            icon={'chevronBack'}
            fill={getColor('lasswho-accent')}
            height={26}
            width={26}
            style={tailwind('mr-1')}
          />
          <Text style={tailwind('text-lg text-lasswho-accent')}>Back </Text>
        </Pressable>
      </ImageBackground>
    </Screen>
  );
};
