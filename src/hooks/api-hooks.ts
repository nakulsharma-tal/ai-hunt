import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export type ApiResponse<T> = { status: 'Success'; data: T } | { status: 'Error'; message: string };

export type VerifyPasswordResponse = { verified: boolean };
export type FinalRoundResponse = { message: string };
export type VerifyPasswordRequest = { password: string; round: number };

const verifyPassword = async ({ password, round }: VerifyPasswordRequest) => {
  const res = await axios.post<ApiResponse<VerifyPasswordResponse>>(
    'ai/verify',
    { password, round },
    {
      baseURL: import.meta.env.VITE_API_BASE_URL,
    }
  );
  if (!(res.status === 200) || res.data.status !== 'Success') {
    throw new Error('Errored');
  }
  return res.data.data.verified;
};

export function useVerifyPassword(round: number) {
  return useMutation({
    mutationKey: ['verifyPassword', round],
    mutationFn: verifyPassword,
  });
}

export function useRecordFinalRound() {
  return useMutation({
    mutationKey: ['recordFinalRound'],
    mutationFn: async ({ solution, teamId }: { solution: string; teamId: string }) => {
      const res = await axios.post<ApiResponse<FinalRoundResponse>>(
        'ai/record-final-round',
        { solution, teamId },
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
        }
      );
      if (!(res.status === 200) || res.data.status !== 'Success') {
        throw new Error('Errored');
      }
      return res.data.data;
    },
  });
}
