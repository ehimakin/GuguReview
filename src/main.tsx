import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles.css';

const Editor = import.meta.env.DEV
  ? lazy(() => import('../local-visual-editor/local-visual-editor').then(module => ({ default: module.LocalVisualEditor })))
  : null;
const local = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {Editor && local && <Suspense fallback={null}><Editor /></Suspense>}
  </React.StrictMode>,
);
