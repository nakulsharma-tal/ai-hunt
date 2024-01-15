import { useNavigate } from '@tanstack/react-router';
import React from 'react';

export function TimeMachine() {
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate({ from: '/time-machine' });

  const handleSubmit = React.useCallback(() => {
    if (password !== '2100') {
      alert('Wrong password');
      return;
    }
    navigate({
      to: '/location',
    });
  }, [navigate, password]);

  return (
    <div className='p-1'>
      <h3>Welcome to TimeMachine !</h3>
      <h2>
        Your Destination is set to year <b>2100</b>
      </h2>
      <p>Enter your password for the destination</p>
      <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Submit Password</button>
    </div>
  );
}
