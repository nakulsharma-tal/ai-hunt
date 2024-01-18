import { Outlet, RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router';
import { FutureLocation } from './containers/location';
import { TimeMachine } from './containers/time-machine';

const rootRoute = new RootRoute({
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
  component: FutureLocation,
});

const routeTree = rootRoute.addChildren([timeMachineRoute, locationRoute]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <RouterProvider router={router} />
    </div>
  );
};
