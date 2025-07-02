import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './config/router/main/routeConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/global.scss';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <RouterProvider router={router()} />,
  </QueryClientProvider>,
);
