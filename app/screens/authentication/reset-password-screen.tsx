import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, TextInput, Image, View } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Screen, Text } from '@components';
import * as storage from '@utils/storage';
import ResetPasswordImage from '../../assets/images/reset-password.svg';
interface Props {}

export const ResetPasswordScreen = (props: Props) => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    navigation.navigate('checkEmail');
  };

  return (
    <Screen
      style={tailwind('mt-2 p-6 flex')}
      preset="scroll"
      backgroundColor={getColor('lasswho-main')}
    >
      <Text style={tailwind('text-left text-gray-300 text-2xl mb-2')}>
        Forgot your password?
      </Text>
      <Text style={tailwind('text-left text-xl text-red-300 mb-6')}>
        Enter the email associated with your account and we'll send you an email
        with all the steps to reset it!
      </Text>

      <View style={[tailwind('flex self-center')]}>
        <ResetPasswordImage width={250} height={180} />
      </View>
      {/* <Image source={require('../../assets/forgot-red.png')} style={[tailwind('h-44 w-56 self-center'), { resizeMode: 'cover'}]}/> */}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tailwind(
              'text-lg text-gray-300 p-6 rounded-lg mb-4 border-b border-gray-300',
            )}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Email"
            placeholderTextColor={getColor('gray-300')}
          />
        )}
        name="email"
        defaultValue=""
      />

      <Pressable
        style={tailwind('p-3 bg-red-600 rounded-lg mt-14')}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={tailwind('text-white text-2xl font-semibold text-center')}>
          Send Email
        </Text>
      </Pressable>
    </Screen>
  );
};
