import { QueryClient } from "@tanstack/react-query";
import { Route, createRootRouteWithContext, redirect } from "@tanstack/react-router";

import { Congratulations } from "./containers/congratulations";
import { CrackTheCode } from "./containers/crack-the-code";
import { Crossword } from "./containers/future/crossword";
import { FutureLocation } from "./containers/future/future-location";
import { Home } from "./containers/home";
import { LastStand } from "./containers/last-stand";
import { Welcome } from "./containers/welcome";
import { AppRoutes } from "./app-routes";
import { ApiResponse, CompetitionRound, ISubmission, ISubmissionWithTeam } from "./types";
import { VERIFY_SUBMISSION_MUTATION_KEY } from "./hooks/useVerifySubmissionQuery";
import { HttpStatusCode } from "axios";

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
      mutationKey: [VERIFY_SUBMISSION_MUTATION_KEY, CompetitionRound.First],
    })?.state.data as ApiResponse<ISubmission | ISubmissionWithTeam>;
    if (data.statusCode !== HttpStatusCode.Ok) {
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
      mutationKey: [VERIFY_SUBMISSION_MUTATION_KEY, CompetitionRound.First],
    })?.state.data as ApiResponse<ISubmission | ISubmissionWithTeam>;
    if (data.statusCode !== HttpStatusCode.Ok) {
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
      mutationKey: [VERIFY_SUBMISSION_MUTATION_KEY, CompetitionRound.Second],
    })?.state.data as ApiResponse<ISubmission | ISubmissionWithTeam>;
    if (data.statusCode !== HttpStatusCode.Ok) {
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
      mutationKey: [VERIFY_SUBMISSION_MUTATION_KEY, CompetitionRound.Third],
    })?.state.data as ApiResponse<ISubmission | ISubmissionWithTeam>;
    if (data.statusCode !== HttpStatusCode.Ok) {
      throw redirect({ to: AppRoutes.LAST_STAND });
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
