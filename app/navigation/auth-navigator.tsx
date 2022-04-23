/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import {
  LoginScreen,
  RegisterScreen,
  OnboardingScreen,
  ResetPasswordScreen,
  CheckEmailMagicLoginScreen,
} from '@screens';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/MST-integration/
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

export type AuthParamList = {
  login: undefined;
  register: undefined;
  resetPassword: undefined;
  checkEmail: undefined;
  onboarding: undefined;
  checkEmailMagicLogin: undefined;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AuthParamList>();
export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="resetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="checkEmailMagicLogin"
        component={CheckEmailMagicLoginScreen}
      />
    </Stack.Navigator>
  );
}
