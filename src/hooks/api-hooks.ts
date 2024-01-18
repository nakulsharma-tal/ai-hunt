import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export type ApiResponse<T> = { status: 'Success'; data: T } | { status: 'Error'; message: string };

export type VerifyPasswordResponse = { verified: boolean };
export type VerifyPasswordRequest = { password: string };

const verifyPassword = async ({ password }: VerifyPasswordRequest) => {
  const res = await axios.post<ApiResponse<VerifyPasswordResponse>>(
    '/api/verify-password',
    { password },
    {
      baseURL: 'http://localhost:3000',
    }
  );
  if (!(res.status === 200)) {
    throw new Error('Network response was not ok');
  }
  return res.data.status === 'Success' && res.data.data.verified;
};

export function useVerifyPassword() {
  return useMutation({
    mutationKey: ['verifyPassword'],
    mutationFn: verifyPassword,
  });
}
