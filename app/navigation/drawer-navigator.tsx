import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen, InviteFriendsScreen, FavouritesScreen, RatingsScreen, AboutScreen, MeetingsScreen } from '@screens';
import { globalStyles } from '@global-styles';
import MeetingIcon from '../assets/icons/calendar.svg';
import ContactsIcon from '../assets/icons/person_add_alt.svg';
import FavouritesIcon from '../assets/icons/heart.svg';
import RatingsIcon from '../assets/icons/stars.svg';
import AboutIcon from '../assets/icons/document-information.svg';

export type SecondaryParamList = {
  meetings: undefined;
  contacts: undefined;
  favourites: undefined;
  ratings: undefined;
  about: undefined;
};

const Drawer = createDrawerNavigator<SecondaryParamList>();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: globalStyles.lwDarkThemeAccentColor.backgroundColor,
      }}
      drawerStyle={{
        backgroundColor: globalStyles.lwDarkThemeSecondaryColor.backgroundColor,
      }}
      drawerPosition="right">
      <Drawer.Screen
        name="meetings"
        component={MeetingsScreen}
        options={{
          title: 'Meetings',
          drawerIcon: ({ color }) => (
            <MeetingIcon height={40} width={40} fill={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="contacts"
        component={InviteFriendsScreen}
        options={{
          title: 'Contacts',
          drawerIcon: ({ color }) => (
            <ContactsIcon height={40} width={40} fill={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="favourites"
        component={FavouritesScreen}
        options={{
          title: 'Favourites',
          drawerIcon: ({ color }) => (
            <FavouritesIcon height={40} width={40} fill={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ratings"
        component={RatingsScreen}
        options={{
          title: 'Ratings',
          drawerIcon: ({ color }) => (
            <RatingsIcon height={40} width={40} fill={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        component={AboutScreen}
        options={{
          title: 'About',
          drawerIcon: ({ color }) => (
            <AboutIcon height={40} width={40} fill={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
