import { Outlet, RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router';
import { FutureComponent } from './containers/location';
import { TimeMachine } from './containers/time-machine';

export function Home() {
  return <div className='p-2'>Hello from Home!</div>;
}
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
  component: FutureComponent,
});

const routeTree = rootRoute.addChildren([timeMachineRoute, locationRoute]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return <RouterProvider router={router} />;
};
