import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { MenuLink, Screen } from '@components';
import { useNavigation } from '@react-navigation/core';
import Logo from '../../assets/images/lasswho-outline-logo.svg';
import * as storage from '@utils/storage';
import { useApolloClient } from '@apollo/client';
import { generatePageLink } from '@utils/in-app-browser-view';
import { logout } from '@utils/logout';
import { useFocusEffect } from '@react-navigation/native';
import { config } from '@config';

export const MenuScreen = () => {
  const client = useApolloClient();

  const [meetingCount, setMeetingCount] = useState(0);

  const getMeetingsCount = async () => {
    const count = await storage.loadString('upcomingMeetingsCount');
    await setMeetingCount(parseInt(count, 10));
  }

  useFocusEffect(() => {
    getMeetingsCount();
  })

  const navigation = useNavigation();

  const openLogoutConfirmation = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Yes', onPress: () => logout(client) },
        { text: 'No', style: 'cancel' },
      ],
      {
        cancelable: true,
      },
    );
  };

  const goToMeetings = () => navigation.navigate('meetings');
  const goToContacts = () => navigation.navigate('contacts');
  const goToFavourites = () => navigation.navigate('favourites');
  const goToOnboarding = () => navigation.navigate('onboarding');
  const goToRatings = () => navigation.navigate('ratings');
  const goToAbout = () =>
    generatePageLink(`${config.API_DOMAIN}/api/about`);

  return (
    <Screen
      style={tailwind('flex flex-1 ')}
      preset="scroll"
      backgroundColor={getColor('lasswho-main')}
    >
      <View style={tailwind('flex justify-center h-44')}>
        <Logo style={tailwind('self-center')} height={70} width={70} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind(
          'flex border-t border-b border-lasswho-secondary',
        )}>
        <MenuLink onPress={goToMeetings} text={'MEETINGS'} badgeCount={meetingCount} />
        <MenuLink onPress={goToContacts} text={'CONTACTS'} />
        <MenuLink onPress={goToFavourites} text={'FAVOURITES'} />
        <MenuLink onPress={goToRatings} text={'RATINGS'} />
        <MenuLink onPress={goToOnboarding} text={'5 STEPS TUTORIAL'} />
        <MenuLink onPress={goToAbout} text={' HELP '} />
        <MenuLink onPress={openLogoutConfirmation} text={'LOG OUT'} />
      </ScrollView>
    </Screen>
  );
};
