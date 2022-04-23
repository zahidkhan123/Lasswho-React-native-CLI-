import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import {
  Pressable,
  TextInput,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { tailwind, getColor } from '@tailwind';
import { Screen, Text, CallToActionButton } from '@components';
import { useMutation } from '@apollo/client';
import { SendMagicLinkDocument } from '@generated/graphql';
// Social Login Imports 
import { LoginManager,LoginButton, AccessToken } from 'react-native-fbsdk-next';
const loginImage = {
  uri: 'https://lasswho.s3.eu-west-2.amazonaws.com/assets/mobile/login-bg.jpg',
};
const Logo = '../../assets/icons/lw_logo.png';

type FormData = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [sendMagicLoginLink, { loading }] = useMutation(SendMagicLinkDocument, {
    onCompleted: ({ sendMagicLink }) => {
      if (!sendMagicLink?.success) {
        return Toast.show(
          'Email not recognised. Please correct or sign up for new account.',
        );
      }

      navigation.navigate('checkEmailMagicLogin');
    },
    onError: () => {
      Toast.show('Please use a valid email!');
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    sendMagicLoginLink({
      variables: {
        email: data.email,
      },
    });
  };

   const onFacebookButtonPress=async()=> {
     console.log('button pressed')
     LoginManager.logInWithPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  const goToRegisterScreen = () => navigation.navigate('register');

  return (
    <Screen
      unsafe
      style={tailwind('flex')}
      backgroundColor={getColor('lasswho-main')}
    >
      <ImageBackground
        source={loginImage}
        style={tailwind('items-center justify-center px-8 h-full')}
      >
        <Image source={require(Logo)} style={tailwind('h-20 w-20 mt-8')} />
        <View>
          <Text
            style={tailwind(
              'text-center tracking-wide text-2xl text-white mt-16 mb-4',
            )}
          >
            WELCOME BACK!
          </Text>
          <Text
            style={tailwind(
              'text-center tracking-wide text-2xl text-white mb-4',
            )}
          >
            LOG IN
          </Text>
        </View>

        <View style={tailwind('mb-6 w-full')}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={tailwind(
                  'text-lg text-white p-2 border-b border-gray-300 leading-5 rounded-none',
                )}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Email..."
                placeholderTextColor="white"
                autoCompleteType="email"
                autoCapitalize="none"
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.email && (
            <Text
              style={tailwind('text-sm text-lasswho-accent self-start mt-2')}
            >
              This is required.
            </Text>
          )}
        </View>

        <CallToActionButton
          text="LOG IN"
          loading={loading}
          isDisabled={loading}
          onPressHandler={handleSubmit(onSubmit)}
        />
        <Text style={tailwind('text-sm text-white my-2')}>OR</Text>
        <CallToActionButton
          text="LOG IN WITH FACEBOOK"
          loading={loading}
          isDisabled={loading}
          onPressHandler={() => onFacebookButtonPress}
          facebook
        />

        <Pressable style={tailwind('p-3 mt-16')} onPress={goToRegisterScreen}>
          <Text style={tailwind('text-white text-xl text-center')}>
            New here?{' '}
            <Text style={tailwind('text-lasswho-accent')}>Sign up.</Text>
          </Text>
        </Pressable>
      </ImageBackground>
    </Screen>
  );
};
