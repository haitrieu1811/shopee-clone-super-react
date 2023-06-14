import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, type waitForOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { ReactNode } from 'react';
import App from 'src/App';
import AppProvider, { getInitialAppContext } from 'src/contexts/app.context';

export const delay = (timeDelay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeDelay);
  });
};

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {};
  await delay(timeout);
  // await waitFor(
  //   async () => {
  //     expect(await delay(timeout - 100)).toBe(true);
  //   },
  //   {
  //     ...options,
  //     timeout
  //   }
  // );
  screen.debug(body, 99999999);
};

const createWrapper = () => {
  const queryclient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => null
    }
  });

  const Provider = ({ children }: { children: ReactNode }) => {
    return <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>;
  };

  return Provider;
};

const Provider = createWrapper();

export const renderWithRouter = ({ route = '/' } = {}) => {
  window.history.pushState({}, '', route);
  const defaultValue = getInitialAppContext();
  return {
    user: userEvent.setup(),
    ...render(
      <Provider>
        <AppProvider defaultValue={defaultValue}>
          <App />
        </AppProvider>
      </Provider>,
      { wrapper: BrowserRouter }
    )
  };
};
