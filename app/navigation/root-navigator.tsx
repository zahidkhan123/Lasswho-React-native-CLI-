/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React from 'react';
import {
  DarkTheme,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useReactiveVar } from '@apollo/client';
import { MainNavigator } from './main-navigator';
import { AuthNavigator } from './auth-navigator';
import { isLoggedInVar } from '@cache';
import { Text } from '@components';
import { AuthLoading } from '@screens';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

export type RootParamList = {
  mainStack: undefined;
  authStack: undefined;
  authLoading: {
    hash: string;
  };
};

const Stack = createStackNavigator<RootParamList>();

const RootStack = () => {
  const isUserLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isUserLoggedIn ? (
        <>
          <Stack.Screen name="mainStack" component={MainNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="authStack" component={AuthNavigator} />
          <Stack.Screen name="authLoading" component={AuthLoading} />
        </>
      )}
    </Stack.Navigator>
  );
};

const config = {
  screens: {
    authLoading: 'magicLogin/:hash',
  },
};

const linking = {
  prefixes: ['lasswho://'],
  config,
};

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer
      linking={linking}
      {...props}
      ref={ref}
      theme={DarkTheme}
      fallback={<Text>Loading...</Text>}
    >
      <RootStack />
    </NavigationContainer>
  );
});

RootNavigator.displayName = 'RootNavigator';
