import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, useState } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      // errorElement: <ErrorPage />,
      children: [],
    },
  ]);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });
  // Check user set theme mode...
  const isDefaultDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  // Create theme mode state...
  const appTheme = window.localStorage.getItem('theme');
  const theme = isDefaultDark ? 'dark' : appTheme;
  return (
    <div className="App" data-theme={theme}>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Suspense>
    </div>
  );
}

export default App;
