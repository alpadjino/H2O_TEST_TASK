import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router";

import store from './api/store';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
