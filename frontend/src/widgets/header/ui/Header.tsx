'use client';

import { logout } from '@/features/auth/authSlice';
import { logout as logoutApi } from '@/features/auth/api/logout';
import LoginModal from '@/features/auth/ui/LoginModal';
import { RootState } from '@/shared/store/store';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/shared/ui/Button';
import { useQueryClient } from '@tanstack/react-query';

function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logoutApi();
    dispatch(logout());
    queryClient.invalidateQueries(['ads'] as any);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-xl font-semibold text-white hover:text-zinc-300 transition"
          >
            Mini Avito
          </Link>

          {user && (
            <Link
              href="/create"
              className="hidden md:block rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700 transition"
            >
              Создать объявление
            </Link>
          )}

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-zinc-400">{user.email}</span>

                <Button onClick={handleLogout}>Выйти</Button>
              </>
            ) : (
              <Button onClick={() => setIsModalOpen(true)}>Войти</Button>
            )}
          </div>
        </div>
      </header>

      <LoginModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Header;
