import React, { ReactChild } from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { getColor, tailwind } from '@tailwind';

interface Props {
  placeholder: string;
  name: string;
  control: Control<Record<string, any>> | undefined;
  svgIcon?: ReactChild;
  isPassword?: boolean;
  defaultValue: string;
}

export const IconField = ({
  placeholder,
  name,
  control,
  svgIcon,
  isPassword,
  defaultValue,
}: Props) => {
  return (
    <View style={tailwind('flex-row')}>
      {svgIcon}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              tailwind(
                'text-lg text-white p-2 rounded-lg mb-6 w-full border-b border-gray-300 rounded-none w-3/4',
              ),
              { lineHeight: 20 },
            ]}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={getColor('gray-300')}
            secureTextEntry={isPassword}
          />
        )}
        name={name}
        defaultValue={defaultValue}
      />
    </View>
  );
};
