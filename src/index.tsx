import React from 'react';

import rootStore from './store';
import { App } from './App';
import { AppContext } from './context/AppContext';
import { backgroundColor } from './constants';
import { SafeAreaView, StatusBar } from 'react-native';

function Root(): React.ReactNode {
  return (
    <AppContext.Provider value={rootStore}>
      <SafeAreaView>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={backgroundColor}
        />
        <App />
      </SafeAreaView>
    </AppContext.Provider>
  );
}

export { Root };
