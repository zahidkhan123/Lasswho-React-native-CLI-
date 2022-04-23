import React, { useState, useEffect } from 'react';
import {
  MenuScreen,
  MeetingsScreen,
  ContactsScreen,
  FavouritesScreen,
  RatingsScreen,
  AboutScreen,
  OnboardingScreen,
} from '@screens';
import { createStackNavigator } from '@react-navigation/stack';

const MenuStack = createStackNavigator();

export const MenuNavigator = () => (
  <MenuStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <MenuStack.Screen name="menu" component={MenuScreen} />
    <MenuStack.Screen
      name="meetings"      
      component={MeetingsScreen}
    />
    <MenuStack.Screen
      name="contacts"
      component={ContactsScreen}
    />
    <MenuStack.Screen
      name="favourites"
      component={FavouritesScreen}
    />
    <MenuStack.Screen
      name="onboarding"
      component={OnboardingScreen}
    />
    <MenuStack.Screen
      name="ratings"
      component={RatingsScreen}
    />
    <MenuStack.Screen
      name="about"
      component={AboutScreen}
    />
  </MenuStack.Navigator>
);
