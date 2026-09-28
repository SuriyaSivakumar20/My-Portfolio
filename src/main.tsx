import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/* type: Archivo Black for the display voice, Archivo for everything read */
import '@fontsource/archivo-black/latin-400.css';
import '@fontsource/archivo/latin-400.css';
import '@fontsource/archivo/latin-500.css';
import '@fontsource/archivo/latin-600.css';
import '@fontsource/archivo/latin-700.css';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
