import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { API } from './api/Api';
import { backgroundColor } from './constants';
import { Button } from './components/button/Button';
import { TableView } from './components/table/TableView';
import { Tll } from './components/ttl/Ttl';


const App = (): React.JSX.Element => {
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundColor}
      />
      <Button
        label={'Clear AsyncStorage'}
        onPress={API.clearAsyncStorage}
      />
      <Tll />
      <TableView />
    </SafeAreaView>
  );
};

export { App };
