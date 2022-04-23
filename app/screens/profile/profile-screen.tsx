import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, ActivityIndicator } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Screen, IconField, Text, CallToActionButton } from '@components';
import RNPickerSelect from 'react-native-picker-select';
import { useQuery, useMutation } from '@apollo/client';
import {
  FetchUserDocument,
  UpdateUserDocument,
  GetAllCountriesDocument,
  GetTimeZoneByCountryDocument,
} from '@generated/graphql';
import UserIcon from '../../assets/icons/user.svg';
import NameIcon from '../../assets/icons/name.svg';
import EmailIcon from '../../assets/icons/email.svg';
import PhoneIcon from '../../assets/icons/phone.svg';
import CountryIcon from '../../assets/icons/globe.svg';
import TimezoneIcon from '../../assets/icons/clock.svg';
import Toast from 'react-native-simple-toast';

export const ProfileScreen = () => {
  const [country, setCountry] = useState(0);
  const [timezone, setTimezone] = useState(0);
  const { control, handleSubmit } = useForm();

  const { data, loading } = useQuery(FetchUserDocument);
  const { data: countryData } = useQuery(GetAllCountriesDocument);
  const { data: timezonesData } = useQuery(GetTimeZoneByCountryDocument, {
    variables: { country_id: country },
  });

  const onSubmit = (data) => {
    updateCurrentUser(data);
  };

  const [updateUser, { loading: updateLoading }] = useMutation(
    UpdateUserDocument,
    {
      onCompleted: (data) => {
        console.log('Account updated');
        Toast.show('Account updated!');
      },
      onError: (error) => {
        console.log('Error updating account', error);
        Toast.show('Problem updating your account!');
      },
    },
  );

  let timezones = [];
  let countries = [];

  if (countryData) {
    countryData.getAllCountries.map((country) => {
      countries.push({ label: country?.name, value: country?.id });
    });
  }

  if (country) {
    timezonesData?.timezonesByCountry?.map((timezone) => {
      timezones.push({ label: timezone?.timezone, value: timezone?.id });
    });
  }

  const updateCurrentUser = (data) => {
    updateUser({
      variables: {
        name: data.name,
        phone_number: data.phone_number,
        country: parseInt(country, 10),
        timezone: parseInt(timezone, 10),
      },
      refetchQueries: [{ query: FetchUserDocument }],
    });
  };

  return (
    <Screen
      style={tailwind('p-6')}
      preset="scroll"
      backgroundColor={getColor('lasswho-main')}>
      <View
        style={tailwind(
          'flex w-24 h-24 bg-lasswho-secondary self-center items-center mt-2 mb-6 rounded-full',
        )}>
        {data ? (
          <UserIcon
            width={75}
            height={75}
            fill="white"
            style={tailwind('self-center top-2')}
          />
        ) : null}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={getColor('lasswho-accent')} />
      ) : (
        <View>
          <Text style={tailwind('text-center text-xl text-gray-200 mb-6')}>
            Welcome {data?.me?.name.split(' ')[0]}
          </Text>

          <View style={tailwind('flex border-b mb-10')}>
            <Text style={tailwind('text-lg text-lasswho-accent mb-2')}>
              Personal information
            </Text>

            <IconField
              svgIcon={
                <NameIcon
                  width={26}
                  height={26}
                  fill="white"
                  style={tailwind('self-center mr-4 mb-4')}
                />
              }
              control={control}
              placeholder="Full name"
              name="name"
              defaultValue={data?.me?.name || ''}
            />

            <View style={tailwind('flex-row')}>
              <EmailIcon
                width={26}
                height={26}
                fill="white"
                style={tailwind('self-center mr-4 mb-4')}
              />
              <Text
                style={[
                  tailwind(
                    'text-lg text-gray-400 p-2 rounded-lg mb-6 w-3/4 border-b border-gray-300 rounded-none',
                  ),
                  { lineHeight: 20 },
                ]}
              >
                {data?.me?.email || 'example@example.com'}
              </Text>

            </View>

            <IconField
              svgIcon={
                <PhoneIcon
                  width={26}
                  height={26}
                  fill="white"
                  style={tailwind('self-center mr-4 mb-4')}
                />
              }
              control={control}
              placeholder="Phone number"
              name="phone_number"
              defaultValue={data?.me?.phone_number || ''}
            />

            <View style={tailwind('flex-row ')}>
              <CountryIcon
                width={28}
                height={28}
                fill="white"
                style={tailwind('self-center mr-4')}
              />
              <View style={tailwind('border-b border-white w-3/4')}>
                <RNPickerSelect
                  placeholder={{
                    label:
                      data?.me?.country.name || 'Please select your country',
                  }}
                  items={countries}
                  onValueChange={(value) => {
                    console.log(value);
                    setCountry(value);
                    setTimezone(null);
                  }}
                  style={{ ...selectStyles }}
                  value={country}
                />
              </View>
            </View>
            <View style={tailwind('flex-row mt-6 mb-6')}>
              <TimezoneIcon
                width={28}
                height={28}
                fill="white"
                style={tailwind('self-center mr-4')}
              />
              <View style={tailwind('border-b border-white w-3/4')}>
                <RNPickerSelect
                  placeholder={{
                    label:
                      data?.me?.timezone.timezone ||
                      'Please choose your timezone',
                  }}
                  items={timezones}
                  onValueChange={(value) => {
                    setTimezone(value);
                    console.log(timezone);
                  }}
                  style={{ ...selectStyles }}
                  value={timezone}
                />
              </View>
            </View>

            <CallToActionButton
              text="Save"
              loading={updateLoading}
              onPressHandler={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      )}
    </Screen>
  );
};

const selectStyles = {
  inputIOS: {
    ...tailwind('px-2 py-2 text-white text-lg  mr-4 w-60'),
    lineHeight: 22,
  },
  inputAndroid: {
    ...tailwind('px-2 py-2 text-white text-lg mr-4 w-60'),
  },
};
