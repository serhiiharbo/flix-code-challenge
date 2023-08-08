import React from 'react';

import rootStore from './store';
import { App } from './App';
import { AppContext } from './context/AppContext';

function Root(): React.ReactNode {
  return (
    <AppContext.Provider value={rootStore}>
      <App />
    </AppContext.Provider>
  );
}

export { Root };
