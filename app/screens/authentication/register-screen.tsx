import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { useForm, Controller } from 'react-hook-form';
import { getColor, tailwind } from '@tailwind';
import { useMutation } from '@apollo/client';
import Toast from 'react-native-simple-toast';
import { CreateUserDocument } from '@generated/graphql';
import * as RNLocalize from 'react-native-localize';
import { Screen, Text, CallToActionButton } from '@components';
import { generatePageLink } from '@utils/in-app-browser-view';
import { config } from '@config';
let registerImage = {
  uri: 'https://lasswho.s3.eu-west-2.amazonaws.com/assets/mobile/signup-bg.jpg',
};
let Logo = '../../assets/icons/lw_logo.png';

const checkboxStyle: ViewStyle = {
  width: 20,
  height: 20,
};

type FormData = {
  name: string;
  email: string;
};

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const [toggleTerms, setToggleTerms] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [createUser, { loading }] = useMutation(CreateUserDocument, {
    onCompleted: (data) => {
      goToOnboardingScreen();
    },
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors) {
        graphQLErrors.map((error) => {
          Toast.show(error?.extensions?.reason);
        })
      }
    },
  });

  const onSubmit = (data: FormData) => {
    const countryCode = RNLocalize.getCountry();
    const timezone = RNLocalize.getTimeZone();
    createUser({
      variables: {
        input: {
          name: data.name,
          email: data.email,
          countryCode,
          timezone,
        },
      },
    });
  };

  const goToLoginScreen = () => navigation.navigate('login');
  const goToOnboardingScreen = () => {
    navigation.navigate('onboarding');
  };

  return (
    <Screen
      unsafe
      style={tailwind('flex')}
      backgroundColor={getColor('lasswho-main')}
    >
      <ImageBackground
        source={registerImage}
        style={tailwind('items-center justify-center px-8 h-full ')}
      >
        <Image source={require(Logo)} style={tailwind('mt-10 h-20 w-20')} />
        <View>
          <Text
            style={tailwind(
              'text-center tracking-wide text-2xl text-white mt-10 mb-4',
            )}
          >
            CREATE A NEW ACCOUNT
          </Text>
        </View>

        <View style={tailwind('w-full mb-6')}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={tailwind(
                  'text-lg text-white p-2 rounded-none leading-5 border-b border-gray-300',
                )}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Full name"
                placeholderTextColor="white"
              />
            )}
            name="name"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.name && (
            <Text
              style={tailwind('text-sm text-lasswho-accent self-start mt-2')}
            >
              Your name is missing.
            </Text>
          )}
        </View>

        <View style={tailwind('w-full mb-2')}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={tailwind(
                  'text-lg text-white p-2 rounded-none leading-5 border-b border-gray-300',
                )}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Email"
                placeholderTextColor="white"
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
              Please provide a valid email.
            </Text>
          )}
        </View>

        <View
          style={tailwind('flex flex-row self-start items-center mb-4')}
        >
          <CheckBox
            boxType="square"
            onFillColor={getColor('gray-200')}
            tintColor={getColor('white')}
            tintColors={{ true: getColor('red-700'), false: 'white' }}
            animationDuration={0}
            onValueChange={(termsChecked) => setToggleTerms(termsChecked)}
            style={checkboxStyle}
            value={toggleTerms}
          />
          <Text
            onPress={() => setToggleTerms(!toggleTerms)}
            style={tailwind('ml-3 text-white text-lg mt-7')}
          >
            I agree and accept the {''}
            <Text onPress={() => generatePageLink(`${config.WEB_URL}/terms-and-conditions`)} style={tailwind('text-lasswho-accent')}>
              Terms and Conditions {''}
            </Text>
            and {''}
            <Text onPress={() => generatePageLink(`${config.WEB_URL}/privacy-policy`)} style={tailwind('text-lasswho-accent')}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        <CallToActionButton
          text="SIGN UP"
          loading={loading}
          onPressHandler={handleSubmit(onSubmit)}
          isDisabled={!toggleTerms}
        />

        <View style={tailwind('mt-4')}>
          <Text onPress={() => { }} style={tailwind('text-xs text-gray-200')}>
            You can opt out of receiving marketing emails and notifications by replying
            to the notifications or contacting LassWho? as explained in the Privacy Policy
          </Text>
          <Pressable style={tailwind('pt-3')} onPress={goToLoginScreen}>
            <Text style={tailwind('text-white text-xl text-center')}>
              Already with us?{' '}
              <Text style={tailwind('text-lasswho-accent')}>Log In</Text>
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </Screen>
  );
};
