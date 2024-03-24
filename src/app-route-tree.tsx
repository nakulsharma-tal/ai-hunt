import { QueryClient } from "@tanstack/react-query";
import { Route, createRootRouteWithContext, redirect } from "@tanstack/react-router";
import { HttpStatusCode } from "axios";

import { Congratulations } from "./containers/congratulations";
import { CrackTheCode } from "./containers/crack-the-code";
import { Crossword } from "./containers/future/crossword";
import { FutureLocation } from "./containers/future/future-location";
import { Home } from "./containers/home";
import { LastStand } from "./containers/last-stand";
import { Welcome } from "./containers/welcome";
import { VERIFY_SUBMISSION_MUTATION_KEY } from "./hooks/useVerifySubmissionQuery";
import { AppRoutes } from "./app-routes";
import { ApiResponse, CompetitionRound, ISubmission, ISubmissionWithTeam } from "./types";

const beforeLoad = (queryClient: QueryClient, mutationKey: Array<string>, redirectTo: string) => {
  const mutationCache = queryClient.getMutationCache();
  const latestCache = mutationCache
    .findAll({
      exact: true,
      mutationKey,
    })
    .sort((a, b) => b.state.submittedAt - a.state.submittedAt)[0];
  const error = latestCache?.state.error;
  const data = latestCache?.state.data as ApiResponse<ISubmission | ISubmissionWithTeam> | undefined;
  if (error || data?.statusCode !== HttpStatusCode.Ok) {
    throw redirect({ to: redirectTo });
  }
};

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
  beforeLoad: ({ context: { queryClient } }) => {
    beforeLoad(queryClient, [VERIFY_SUBMISSION_MUTATION_KEY, CompetitionRound.Zero], AppRoutes.WELCOME);
  },
  component: CrackTheCode,
});

const locationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: AppRoutes.LOCATION,
  beforeLoad: ({ context: { queryClient } }) => {
    beforeLoad(queryClient, [VERIFY_SUBMISSION_MUTATION_KEY, CompetitionRound.First], AppRoutes.TIME_MACHINE);
  },
  component: FutureLocation,
});

const crosswordRoute = new Route({
  getParentRoute: () => rootRoute,
  path: AppRoutes.CROSSWORD,
  beforeLoad: ({ context: { queryClient } }) => {
    beforeLoad(queryClient, [VERIFY_SUBMISSION_MUTATION_KEY, CompetitionRound.First], AppRoutes.TIME_MACHINE);
  },
  component: Crossword,
});

const lastStandRoute = new Route({
  getParentRoute: () => rootRoute,
  beforeLoad: ({ context: { queryClient } }) => {
    beforeLoad(queryClient, [VERIFY_SUBMISSION_MUTATION_KEY, CompetitionRound.Second], AppRoutes.CROSSWORD);
  },
  path: AppRoutes.LAST_STAND,
  component: LastStand,
});

const congratulationsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: AppRoutes.CONGRATULATIONS,
  beforeLoad: ({ context: { queryClient } }) => {
    beforeLoad(queryClient, [VERIFY_SUBMISSION_MUTATION_KEY, CompetitionRound.Third], AppRoutes.LAST_STAND);
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
