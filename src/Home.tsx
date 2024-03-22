import { Outlet, useNavigate } from "@tanstack/react-router";

import { AppRoutes } from "./app-routes";

export function Home() {
  const navigate = useNavigate({ from: AppRoutes.HOME });
  navigate({ to: AppRoutes.WELCOME });

  return <Outlet />;
}
