import React from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

import { tailwind } from '@tailwind';
import IntroVideo from '../../assets/videos/intro_video.mp4';
import Logo from '../../assets/images/lasswho-logo.svg';
interface Props {}

export const IntroScreen = (props: Props) => {
  const navigation = useNavigation();

  const goToRegister = () => navigation.navigate('register');

  return (
    <View>      
      <View>
        <Video
          repeat
          source={IntroVideo}
          resizeMode="cover"
          style={tailwind('w-full h-full z-10')}
        />

        <View style={tailwind('absolute z-30 left-8 top-10 h-20 w-20')}>
          <Logo style={tailwind('w-full h-full')} />
        </View>

        <View style={tailwind('absolute z-30 inset-x-10 bottom-10')}>
          <Pressable
            onPress={goToRegister}
            style={[tailwind('rounded p-4'), { backgroundColor: '#bb0f0e' }]}>
            <Text style={tailwind('text-white text-2xl text-center')}>
              Let's get started
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
