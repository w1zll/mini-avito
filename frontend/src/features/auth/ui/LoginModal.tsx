'use client';

import { SubmitEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../api/login';
import { loginSuccess } from '../authSlice';

interface Props {
  open: boolean;
  onClose: () => void;
}

function LoginModal({ open, onClose }: Props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!open) return null;

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const data = await login(email, password);

    dispatch(
      loginSuccess({
        accessToken: data.accessToken,
        user: { id: data.user.id, email: data.user.email },
      }),
    );
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'black',
          padding: '20px',
          borderRadius: '10px',
          width: '300px',
        }}
      >
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '10px',
            border: '1px solid #ccc',
            padding: 5,
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '10px',
            border: '1px solid #ccc',
            padding: 5,
          }}
        />
        <button
          type="submit"
          style={{ border: '1px solid #ccc', padding: '5px 10px' }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginModal;
