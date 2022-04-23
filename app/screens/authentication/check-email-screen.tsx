import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, Image, View } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Screen } from '@components';
import * as storage from '@utils/storage';
import CheckEmailImage from '../../assets/images/check-email.svg';

interface Props {}

export const CheckEmailScreen = (props: Props) => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    navigation.navigate('login');
  };

  return (
    <Screen
      style={tailwind('mt-2 p-6 flex')}
      preset="scroll"
      backgroundColor={getColor('lasswho-main')}>
      <Text style={tailwind('text-left text-gray-300 text-2xl mb-2')}>Check your email!</Text>
      <Text style={tailwind('text-left text-xl text-red-300 mb-6')}>
        We've sent you the instructions to reset your password
      </Text>

      <View style={[tailwind('flex self-center')]}>
        <CheckEmailImage width={250} height={180} />
      </View>

      <Pressable
        style={tailwind('p-3 bg-red-600 rounded-lg mt-14')}
        onPress={handleSubmit(onSubmit)}>
        <Text style={tailwind('text-white text-2xl font-semibold text-center')}>
          Confirm
        </Text>
      </Pressable>
    </Screen>
  );
};
