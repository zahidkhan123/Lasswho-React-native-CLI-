/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */

import './utils/ignore-warnings';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, Button, DevSettings, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainerRef } from '@react-navigation/native';

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { AsyncStorageWrapper, CachePersistor } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from 'react-native-screens';
import { cache } from '@cache';
import * as storage from '@utils/storage';
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from './navigation';
import { getApolloClient } from './links';

enableScreens();

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

/**
 * This is the root component of our app.
 */
function App() {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] =
    useState<CachePersistor<NormalizedCacheObject>>();

  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const { initialNavigationState, onNavigationStateChange } =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  useEffect(() => {
    async function init() {
      let newPersistor = new CachePersistor({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
        debug: __DEV__,
        trigger: 'write',
      });
      await newPersistor.restore();
      setPersistor(newPersistor);
      setClient(getApolloClient());
    }

    init().finally(() => {
      RNBootSplash.hide({ fade: true });
    });
  }, []);

  const clearCache = useCallback(() => {
    if (!persistor) {
      return;
    }
    persistor.purge();
    storage.clear();
  }, [persistor]);

  const reload = useCallback(() => {
    DevSettings.reload();
  }, []);

  if (!client) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <>
          {/* <View
            style={{
              flexDirection: 'row',
              paddingBottom: 20,
              justifyContent: 'center',
              position: 'absolute',
              top: 40,
              left: 0,
              right: 0,
              zIndex: 2,
            }}
          >
            <Button title={'reload'} onPress={reload} />
            <Button title={'Clear cache and storage'} onPress={clearCache} />
          </View> */}

          <RootNavigator
            ref={navigationRef}
            initialState={__DEV__ ? undefined : initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;
