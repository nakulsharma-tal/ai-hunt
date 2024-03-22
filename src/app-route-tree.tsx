import { QueryClient } from "@tanstack/react-query";
import { Route, createRootRouteWithContext, redirect } from "@tanstack/react-router";

import { Congratulations } from "./containers/congratulations";
import { CrackTheCode } from "./containers/crack-the-code";
import { Crossword } from "./containers/future/crossword";
import { FutureLocation } from "./containers/future/future-location";
import { LastStand } from "./containers/last-stand";
import { Welcome } from "./containers/welcome";
import { AppRoutes } from "./app-routes";
import { CompetitionRound } from "./types";
import { Home } from "./Home";

const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Home,
});

const welcomeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: AppRoutes.WELCOME,
  component: Welcome,
});

const crackTheCodeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: AppRoutes.TIME_MACHINE,
  component: CrackTheCode,
});

const locationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: AppRoutes.LOCATION,
  beforeLoad: ({ context: { queryClient } }) => {
    const mutationCache = queryClient.getMutationCache();
    const data = mutationCache.find({
      exact: true,
      mutationKey: ["verifyPassword", CompetitionRound.First],
    })?.state.data as boolean;
    if (!data) {
      throw redirect({ to: AppRoutes.TIME_MACHINE });
    }
  },
  component: FutureLocation,
});

const crosswordRoute = new Route({
  getParentRoute: () => rootRoute,
  path: AppRoutes.CROSSWORD,
  beforeLoad: ({ context: { queryClient } }) => {
    const mutationCache = queryClient.getMutationCache();
    const data = mutationCache.find({
      exact: true,
      mutationKey: ["verifyPassword", CompetitionRound.First],
    })?.state.data as boolean;
    if (!data) {
      throw redirect({ to: AppRoutes.TIME_MACHINE });
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
      mutationKey: ["verifyPassword", CompetitionRound.Second],
    })?.state.data as boolean;
    if (!data) {
      throw redirect({ to: AppRoutes.CROSSWORD });
    }
  },
  path: AppRoutes.LAST_STAND,
  component: LastStand,
});

const congratulationsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: AppRoutes.CONGRATULATIONS,
  beforeLoad: ({ context: { queryClient } }) => {
    const mutationCache = queryClient.getMutationCache();
    const data = mutationCache.find({
      exact: true,
      mutationKey: ["verifyPassword", CompetitionRound.Second],
    })?.state.data as boolean;
    if (!data) {
      throw redirect({ to: AppRoutes.CROSSWORD });
    }
  },
  component: Congratulations,
});

export const appRouteTree = rootRoute.addChildren([
  welcomeRoute,
  locationRoute,
  crosswordRoute,
  lastStandRoute,
  congratulationsRoute,
  crackTheCodeRoute,
]);
