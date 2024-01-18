import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { useVerifyPassword } from '../../hooks/api-hooks';

export function TimeMachine() {
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate({ from: '/time-machine' });
  const { mutateAsync } = useVerifyPassword();

  const handleSubmit = React.useCallback(async () => {
    const data = await mutateAsync({ password });
    if (!data) return alert('Wrong Password');

    navigate({
      to: '/location',
    });
  }, [mutateAsync, navigate, password]);

  return (
    <div className='p-1'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to TimeMachine!</h1>
      <h2 className='text-2xl'>
        Your Destination is set to year <b>2100</b>
      </h2>
      <p className='mt-4 text-lg'>Enter your password for the destination</p>
      <div className='flex flex-col'>
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mt-2 p-2 border border-gray-300 rounded'
        />
        <button onClick={handleSubmit} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Submit Password
        </button>
      </div>
    </div>
  );
}
