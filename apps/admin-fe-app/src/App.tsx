import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  // Check user set theme mode...
  const isDefaultDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  // Create theme mode state...
  const [theme, setTheme] = useState(isDefaultDark ? 'dark' : 'light');

  const switchTheme = (theme: string) => {
    setTheme(theme);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout switchTheme={switchTheme} />,
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme || '');
  }, [theme]);
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
