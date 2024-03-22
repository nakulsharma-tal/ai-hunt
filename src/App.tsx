import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, RouterProvider } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer newestOnTop limit={4} pauseOnHover autoClose={10000} closeOnClick={false} />
      </QueryClientProvider>
    </div>
  );
};
