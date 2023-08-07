import React from 'react';
import { AppContext } from './context/AppContext';
import { App } from './App';
import rootStore from './store/index';

function Root(): React.ReactNode {
  return (
    <AppContext.Provider value={rootStore}>
      <App />
    </AppContext.Provider>
  );
}

export { Root };
