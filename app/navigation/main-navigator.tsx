/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React, { useEffect, useState } from 'react';
import { HomeScreen, ProfileScreen } from '@screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MenuNavigator } from './menu-navigator';
import { getColor } from '@tailwind';
import MenuIcon from '../assets/icons/menu.svg';
import LassWhoLogo from '../assets/images/lasswho-logo-outline-black.svg';
import AccountMenuIcon from '../assets/icons/person_outline.svg';
import { Platform } from 'react-native';
import * as storage from '@utils/storage';
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  home: undefined;
  profile: undefined;
  menu: undefined;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Tab = createBottomTabNavigator<PrimaryParamList>();

const tabsBarHeight = Platform.select({
  android: {
    height: 60,
  },
});

export function MainNavigator() {
  const [count, setCount] = useState(0);

  const getMeetingsCount = async () => {
    const meetingCount = await storage.loadString('upcomingMeetingsCount');
    await setCount(parseInt(meetingCount, 10));
  }

  useEffect(() => {
    getMeetingsCount();
  }, [getMeetingsCount])

  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: getColor('lasswho-accent'),
        inactiveTintColor: getColor('gray-500'),
        style: [
          {
            ...tabsBarHeight,
            // paddingTop: 8,
            backgroundColor: getColor('lasswho-main'),
          },
        ],
      }}
    >
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AccountMenuIcon height={36} width={36} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <LassWhoLogo height={36} width={36} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="menu"
        component={MenuNavigator}
        options={{
          tabBarBadgeStyle: { backgroundColor: getColor('lasswho-green') },
          tabBarBadge: count > 0 ? count : null,
          tabBarIcon: ({ color }) => (
            <MenuIcon height={36} width={36} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['home'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
