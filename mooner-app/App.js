import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';
import {AuthNavigator} from './app/navigation/authNavigator';

// const {store} = stores();
const App = () => {
  return (
    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
};

export default App;
