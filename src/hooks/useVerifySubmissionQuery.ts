import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { ApiError, ApiResponse, CompetitionRound, ISubmission, ISubmissionWithTeam, VerifySubmissionDto } from "../types";
import {
  CHECKING_PASSKEY,
  CORRECT_PASSKEY,
  ERROR,
  RESPONSE_CAPTURE_SUCCESSFULLY,
  SUBMITTING_YOUR_RESPONSE,
} from "../user-message.constant";

const verifySubmission = async (verifySubmissionDto: VerifySubmissionDto) => {
  return axios
    .post<ApiResponse<ISubmission | ISubmissionWithTeam>>("submissions", verifySubmissionDto, {
      baseURL: import.meta.env.VITE_API_BASE_URL,
    })
    .then((response) => response.data);
};

export const VERIFY_SUBMISSION_MUTATION_KEY = "verifySubmission";

export function useVerifySubmissionQuery(round: CompetitionRound) {
  return useMutation({
    mutationKey: [VERIFY_SUBMISSION_MUTATION_KEY, round],
    mutationFn: verifySubmission,
    onSuccess: () => {
      toast.dismiss();
      toast.success(round === CompetitionRound.Third ? RESPONSE_CAPTURE_SUCCESSFULLY : CORRECT_PASSKEY);
    },
    onError: (error: AxiosError) => {
      toast.dismiss();
      toast.error((error.response?.data as ApiError | undefined)?.error || ERROR);
    },
    onMutate: () => {
      toast.info(round === CompetitionRound.Third ? SUBMITTING_YOUR_RESPONSE : CHECKING_PASSKEY, {
        autoClose: false,
      });
    },
  });
}
