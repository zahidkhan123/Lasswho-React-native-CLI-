import React from 'react';
import { getColor, tailwind } from '@tailwind';
import { Screen } from '@components';

export const AboutScreen = () => {
  return (
    <Screen
      unsafe
      preset="scroll"
      backgroundColor={getColor('lasswho-main')}
      style={tailwind('p-2')}>      
    </Screen>
  );
}
