import React, { useContext, useEffect } from 'react';

import { API } from './api/Api';
import { Button } from './components/button/Button';
import { TableView } from './components/table/TableView';
import { Tll } from './components/ttl/Ttl';
import { observer } from 'mobx-react-lite';
import { TRootStore } from './store';
import { AppContext } from './context/AppContext';

const App: React.FunctionComponent = observer(() => {
  const store: TRootStore = useContext(AppContext);

  useEffect((): void => {
    store.usersStore.getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button
        label={'Clear AsyncStorage'}
        onPress={API.clearAsyncStorage}
      />

      <Tll />

      <TableView store={store} />

      {/** Uncomment next line to see TableView component re-usability */}
      <TableView store={store} />
    </>
  );
});

export { App };
