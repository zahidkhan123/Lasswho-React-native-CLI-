import React from 'react';
import { View } from 'react-native';
import { tailwind } from '@tailwind';
import { Text, Icon } from '@components';
import { EngagementRule } from 'operations/generated/graphql';

export const EngagementList = ({ rules = [] }: { rules: EngagementRule[] }) => {
  return (
    <View>
      {rules.map((rule, index) => (
        <View key={index} style={tailwind('flex-row justify-between mb-5')}>
          <Text style={tailwind('text-gray-300 pr-10')}>{rule.name}</Text>
          <View>
            {rule.selected ? (
              <Icon icon="checkGreen" />
            ) : (
              <Icon icon="crossRed" />
            )}
          </View>
        </View>
      ))}
    </View>
  );
};
