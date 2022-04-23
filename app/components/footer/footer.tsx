import React from 'react';
import { Text, View } from 'react-native';
import { tailwind } from '@tailwind';

interface Props {}

export const Footer = ({}: Props) => {
  return (
    <View style={tailwind('px-3 pt-6 pb-8')}>
      <Text>Meetings</Text>
      <Text>No scheduled meetings</Text>
    </View>
  );
};

export default Footer;
