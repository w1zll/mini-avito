'use client';

import { SubmitEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../api/login';
import { loginSuccess } from '../authSlice';
import Button from '@/shared/ui/Button';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  open: boolean;
  onClose: () => void;
}

function LoginModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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

    queryClient.invalidateQueries(['ads'] as any);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
      >
        <h3 className="mb-5 text-lg font-semibold text-white">Вход</h3>

        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white transition"
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white transition"
          />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Отмена
          </button>

          <Button type="submit">Войти</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginModal;
