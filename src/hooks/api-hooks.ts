import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ApiResponse, CompetitionRound, ISubmission, VerifySubmissionDto } from '../types';

const verifyPassword = async (submissionDto: VerifySubmissionDto) => {
  const res = await axios.post<ApiResponse<ISubmission>>('submissions', submissionDto, {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  return res.data.message;
};

export function useVerifySubmissionQuery(round: CompetitionRound) {
  return useMutation({
    mutationKey: ['verifyPassword', round],
    mutationFn: verifyPassword,
  });
}
