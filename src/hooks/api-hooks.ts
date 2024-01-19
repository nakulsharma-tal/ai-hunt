import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export type ApiResponse<T> = { status: 'Success'; data: T } | { status: 'Error'; message: string };

export type VerifyPasswordResponse = { verified: boolean };
export type VerifyPasswordRequest = { password: string };

const verifyPassword = async ({ password }: VerifyPasswordRequest) => {
  const res = await axios.post<ApiResponse<VerifyPasswordResponse>>(
    'ai/time_machine/verify',
    { password },
    {
      baseURL: import.meta.env.VITE_API_BASE_URL,
    }
  );
  if (!(res.status === 200) || res.data.status !== 'Success') {
    throw new Error('Errored');
  }
  return res.data.data.verified;
};

export function useVerifyPassword() {
  return useMutation({
    mutationKey: ['verifyPassword'],
    mutationFn: verifyPassword,
  });
}
