/**
 * Main entry point of the application.
 * Sets up the React root, Redux store provider, router, and layout components.
 */

// React and ReactDOM for app rendering
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// React Router for navigation
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Redux store provider
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Global styles
import './utils/style/globalStyle.css';

// Page and component imports
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';

import { Header } from './components/Header/Header';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
