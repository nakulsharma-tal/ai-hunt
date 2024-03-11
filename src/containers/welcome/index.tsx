import { useNavigate } from '@tanstack/react-router';
import { useCallback, useState } from 'react';

export function Welcome() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate({ from: '/welcome' });

  const handleSubmit = useCallback(async () => {
    if (password.trim().toLowerCase() !== import.meta.env.VITE_ACCEPT_MISSION_KEY.trim().toLowerCase())
      return alert('Wrong Key! The key is in the text! Look for it');
    navigate({
      to: '/time-machine',
    });
  }, [navigate, password]);

  return (
    <div className='p-1'>
      <h1 className='text-4xl font-bold mb-4'>Liberators Welcome you!!!</h1>
      <p className='mt-4 text-lg'> Enter the key from Cracked Prophesy to accept the mission </p>
      <div className='flex flex-col'>
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mt-2 p-2 border border-gray-300 rounded'
          maxLength={6}
        />
        <button onClick={handleSubmit} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Submit Key
        </button>
      </div>
    </div>
  );
}
