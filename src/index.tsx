import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { Provider } from 'react-redux';
import { store as setupStore } from './store/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
