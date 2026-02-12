import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/styles/index.css";
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/sonner';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
      <App />
    </AuthProvider>
  </StrictMode>,
);
