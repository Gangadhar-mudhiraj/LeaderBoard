import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from './toastNotifications/Notifications';
import App from './App';
import './index.css';
import { UserProvider } from './context/ContextProvider';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <App />
      <ToastContainer />
    </UserProvider >
  </BrowserRouter>
);