import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, RouterProvider } from "@tanstack/react-router";

import { appRouteTree } from "./app-route-tree";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const router = new Router({ routeTree: appRouteTree, context: { queryClient } });

export const App = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
};
