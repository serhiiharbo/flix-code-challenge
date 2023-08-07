import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { TableView } from './components/TableView';

type HexColor = `#${string}`
const backgroundColor: HexColor = '#73d700';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundColor}
      />
      <TableView />
    </SafeAreaView>
  );
};

export { App };
