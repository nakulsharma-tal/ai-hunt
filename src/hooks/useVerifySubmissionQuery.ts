import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { ApiResponse, CompetitionRound, ISubmission, ISubmissionWithTeam, VerifySubmissionDto } from "../types";

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
  });
}
