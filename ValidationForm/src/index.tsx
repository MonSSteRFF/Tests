import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const root = document.getElementById('root') as HTMLElement;

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.scss';

createRoot(root).render(<App />);
