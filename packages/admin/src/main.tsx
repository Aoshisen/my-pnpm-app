import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router';

const rootNode = document.getElementById("root")!;
const root = createRoot(rootNode);
const queryClient = new QueryClient()


root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ReactQueryDevtools />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
