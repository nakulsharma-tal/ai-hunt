import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Outlet,
  Route,
  Router,
  RouterProvider,
  redirect,
  rootRouteWithContext,
  useNavigate,
} from '@tanstack/react-router';
import { FutureLocation } from './containers/future';
import { TimeMachine } from './containers/time-machine';
import { Crossword } from './containers/future/crossword';
import { LastStand } from './containers/last-stand';
import { Congratulations } from './containers/congratulations';

function Root() {
  const navigate = useNavigate({ from: '/' });
  navigate({ to: '/time-machine' });
  return <Outlet />;
}

const rootRoute = rootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Root,
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
      mutationKey: ['verifyPassword', 1],
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
      mutationKey: ['verifyPassword', 1],
    })?.state.data as boolean;
    if (!data) {
      throw redirect({ to: '/time-machine' });
    }
  },
  component: Crossword,
});

const lastStandRoute = new Route({
  getParentRoute: () => rootRoute,
  beforeLoad: ({ context: { queryClient } }) => {
    const mutationCache = queryClient.getMutationCache();
    const data = mutationCache.find({
      exact: true,
      mutationKey: ['verifyPassword', 2],
    })?.state.data as boolean;
    if (!data) {
      throw redirect({ to: '/crossword' });
    }
  },
  path: '/last-stand',
  component: LastStand,
});

const congratulationsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/congratulations',
  beforeLoad: ({ context: { queryClient } }) => {
    const mutationCache = queryClient.getMutationCache();
    const data = mutationCache.find({
      exact: true,
      mutationKey: ['verifyPassword', 2],
    })?.state.data as boolean;
    if (!data) {
      throw redirect({ to: '/crossword' });
    }
  },
  component: Congratulations,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const routeTree = rootRoute.addChildren([
  timeMachineRoute,
  locationRoute,
  crosswordRoute,
  lastStandRoute,
  congratulationsRoute,
]);

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
