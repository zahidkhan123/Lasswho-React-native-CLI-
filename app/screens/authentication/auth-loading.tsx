import React, { useEffect } from 'react';
import { ActivityIndicator, Image, Pressable, View } from 'react-native';
import { RouteProp } from '@react-navigation/core';
import { useMutation } from '@apollo/client';
import { MagicLoginDocument } from '@generated/graphql';
import * as storage from '@utils/storage';
import { isLoggedInVar } from '@cache';
import { Icon, Screen, Text } from '@components';
import { getColor, tailwind } from '@tailwind';
import { RootParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';

type RootScreenRouteProp = RouteProp<RootParamList, 'authLoading'>;

interface Props {
  route: RootScreenRouteProp;
}

export const AuthLoading = ({ route }: Props) => {
  const navigation = useNavigation();
  const { hash } = route.params;
  const [magicLoginUser, { error }] = useMutation(MagicLoginDocument, {
    onCompleted: ({ magicLogin }) => {
      if (magicLogin) {
        storage.saveString('authToken', magicLogin);
        isLoggedInVar(true);
      }
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    magicLoginUser({
      variables: {
        hash,
      },
    });
  }, [hash, magicLoginUser]);

  return (
    <Screen style={tailwind('flex')} backgroundColor={getColor('lasswho-main')}>
      <View style={tailwind('items-center justify-center px-8 h-full')}>
        <Image
          source={require('../../assets/icons/lw_logo.png')}
          style={tailwind('h-20 w-20')}
        />

        {!error && (
          <>
            <Text
              style={tailwind('text-center text-lg text-white mt-10 mb-10')}
            >
              Logging In...
            </Text>

            <ActivityIndicator
              size="large"
              color={getColor('lasswho-accent')}
              style={tailwind('mt-2')}
            />
          </>
        )}

        {error && (
          <View style={tailwind('mt-8 flex items-center')}>
            <Text style={tailwind('text-lg text-lasswho-accent')}>
              Link is invalid or has already expired.
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
          </View>
        )}
      </View>
    </Screen>
  );
};
