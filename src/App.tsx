import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, Route, Router, RouterProvider, redirect, rootRouteWithContext } from '@tanstack/react-router';
import { FutureLocation } from './containers/future';
import { TimeMachine } from './containers/time-machine';
import { Crossword } from './containers/future/crossword';

const rootRoute = rootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => <Outlet />,
});

const timeMachineRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/time-machine',
  component: TimeMachine,
});

const locationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/location',
  beforeLoad: ({ context: { queryClient } }) => {
    const mutationCache = queryClient.getMutationCache();
    const data = mutationCache.find({
      exact: true,
      mutationKey: ['verifyPassword'],
    })?.state.data as boolean;
    if (!data) {
      throw redirect({ to: '/time-machine' });
    }
  },
  component: FutureLocation,
});

const crosswordRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/crossword',
  beforeLoad: ({ context: { queryClient } }) => {
    const mutationCache = queryClient.getMutationCache();
    const data = mutationCache.find({
      exact: true,
      mutationKey: ['verifyPassword'],
    })?.state.data as boolean;
    if (!data) {
      throw redirect({ to: '/time-machine' });
    }
  },
  component: Crossword,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const routeTree = rootRoute.addChildren([timeMachineRoute, locationRoute, crosswordRoute]);

const router = new Router({ routeTree, context: { queryClient } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
};
