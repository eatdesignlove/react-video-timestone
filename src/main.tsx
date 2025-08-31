import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DemoApp from './demo-app.tsx';
import './reset.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoApp />
  </StrictMode>
);
