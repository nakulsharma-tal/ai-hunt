import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { AppRoutes } from "../../app-routes";

export function Congratulations() {
  const navigate = useNavigate({ from: AppRoutes.CONGRATULATIONS });

  const goBack = useCallback(async () => {
    navigate({
      to: AppRoutes.LAST_STAND,
    });
  }, [navigate]);

  return (
    <div className="p-1">
      <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
      <h2 className="text-2xl">You have successfully traveled across the country to kill the AI!</h2>
      <p>You have completed. Hope you have saved humanity!</p>
      <p>Liberators will make sure that you will be rewarded well in the future if you are quick enough to stop the AI.</p>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}
