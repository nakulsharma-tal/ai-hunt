import { useNavigate } from "@tanstack/react-router";
import { HttpStatusCode } from "axios";
import React from "react";
import { toast } from "react-toastify";

import { AppRoutes } from "../../app-routes";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { ApiError, CompetitionRound } from "../../types";
import { CORRECT_PASSKEY } from "../../user-message.constant";

export function TimeMachine() {
  const [passkey, setPassword] = React.useState("");

  const navigate = useNavigate({ from: AppRoutes.TIME_MACHINE });
  const { mutateAsync } = useVerifySubmissionQuery(CompetitionRound.First);

  const handleSubmit = React.useCallback(async () => {
    const data = await mutateAsync({ passkey, round: CompetitionRound.First });
    if (data?.statusCode === HttpStatusCode.Ok) {
      toast.success(CORRECT_PASSKEY);
    } else if ((data as ApiError).error) {
      toast.error((data as ApiError).error);
    } else {
      toast.error(data.message);
    }

    navigate({
      to: AppRoutes.LOCATION,
    });
  }, [mutateAsync, navigate, passkey]);

  return (
    <div className="p-1">
      <h1 className="text-4xl font-bold mb-4">Welcome to TimeMachine!</h1>

      <h2 className="text-2xl">
        Your Destination is set to year <b>2100</b>
      </h2>

      <p className="mt-4 text-lg">Enter your password for the destination</p>

      <div className="flex flex-col">
        <input
          type="text"
          value={passkey}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded"
        />

        <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit Password
        </button>
      </div>
    </div>
  );
}
