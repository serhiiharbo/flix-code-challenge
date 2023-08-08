import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../../context/AppContext';
import { backgroundColor } from '../../constants/assets.constants';
import { TRootStore } from '../../store';
import { TStyle } from '../../types/shared.types';

export const Tll: React.FunctionComponent<object> = observer(() => {
  const store: TRootStore = useContext(AppContext);

  // TTL will be set after loading users
  useEffect((): void => {
    if (store?.usersStore?.loading === false) {
      store?.ttlStore?.getTtl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.usersStore?.loading]);

  console.log('users from ttl comp', store.usersStore.errored, store.usersStore.users.length);

  return (
    <Text style={styles.text}>Cache expires at: {store?.ttlStore?.ttl}</Text>
  );
});

const styles: TStyle = StyleSheet.create<TStyle>({
  text: {
    minWidth: 250,
    height: 50,

    marginVertical: 20,
    paddingHorizontal: 20,

    alignSelf: 'center',

    textAlign: 'center',
    lineHeight: 50,

    borderColor: backgroundColor,
    borderBottomWidth: 1,
    borderRadius: 25,
  },
});
