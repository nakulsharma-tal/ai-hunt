import { useNavigate } from "@tanstack/react-router";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { AppRoutes } from "../../app-routes";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { ApiError, CompetitionRound } from "../../types";
import { CORRECT_PASSKEY } from "../../user-message.constant";

export function Welcome() {
  const [passkey, setPasskey] = useState("");
  const navigate = useNavigate({ from: AppRoutes.WELCOME });
  const { mutateAsync } = useVerifySubmissionQuery(CompetitionRound.Zero);

  const handleSubmit = useCallback(async () => {
    const data = await mutateAsync({ passkey, round: CompetitionRound.Zero });
    if (data?.statusCode === HttpStatusCode.Ok) {
      toast.success(CORRECT_PASSKEY);
    } else if ((data as ApiError).error) {
      toast.error((data as ApiError).error);
    } else {
      toast.error(data.message);
    }

    navigate({
      to: AppRoutes.TIME_MACHINE,
    });
  }, [mutateAsync, navigate, passkey]);

  return (
    <div className="p-1">
      <h1 className="text-4xl font-bold mb-4">Liberators Welcome you!!!</h1>
      <p className="mt-4 text-lg"> Enter the key from Cracked Prophesy to accept the mission </p>
      <div className="flex flex-col">
        <input
          type="text"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded"
          maxLength={6}
        />
        <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit Key
        </button>
      </div>
    </div>
  );
}
