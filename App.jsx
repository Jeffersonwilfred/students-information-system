// App.js
import React from 'react';
import { AppProvider } from './AppContext';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;
