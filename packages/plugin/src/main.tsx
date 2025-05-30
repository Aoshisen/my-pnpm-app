import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import App from './App.tsx'

const rootNode = document.getElementById("root")!;
const root = createRoot(rootNode);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
