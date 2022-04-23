import React, { useState, useCallback } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import { Control, Controller } from 'react-hook-form';
import { Icon } from '@components';
import debounce from 'lodash.debounce';

interface Props {
  placeholder: string;
  control: Control<Record<string, any>> | undefined;
  handleSearch: (searchTerm: string) => any;
}

export const SearchBar = ({ placeholder, control, handleSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debounceSearchTerm = useCallback(
    debounce((searchTermValue: string) => {
      handleSearch(searchTermValue);
    }, 1000),
    [],
  );

  const resetSearch = () => {
    if (searchTerm) {
      setSearchTerm('');
      handleSearch('');
    }
  };

  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur } }) => (
        <View style={tailwind('mt-4 px-2 justify-center')}>
          <View style={tailwind('absolute z-10 left-4')}>
            <Icon icon="search" fill={getColor('lasswho-accent')} />
          </View>
          <TextInput
            style={[
              tailwind(
                'text-sm text-white py-2 px-10 rounded-lg bg-lasswho-secondary',
              ),
            ]}
            underlineColorAndroid="transparent"
            onBlur={onBlur}
            onChangeText={(value) => {
              onChange(value);
              setSearchTerm(value);
              searchTerm ? debounceSearchTerm(value) : null;
            }}
            value={searchTerm}
            placeholder={placeholder}
            placeholderTextColor="#6C6C6C"
          />
          <Pressable
            style={tailwind('absolute z-10 right-4')}
            onPress={resetSearch}
          >
            <Icon icon="crossDefault" fill={getColor('gray-300')} />
          </Pressable>
        </View>
      )}
      name="Search"
      defaultValue=""
    />
  );
};
