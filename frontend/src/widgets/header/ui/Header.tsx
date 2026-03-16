'use client';

import { logout } from '@/features/auth/authSlice';
import { logout as logoutApi } from '@/features/auth/api/logout';
import LoginModal from '@/features/auth/ui/LoginModal';
import { RootState } from '@/shared/store/store';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    logoutApi();
    dispatch(logout());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          borderBottom: '1px solid #ddd',
        }}
      >
        <h1>
          <Link href="/">Mini Avito</Link>
        </h1>
        {user && <Link href="/create">Create ad</Link>}
        {user ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <span>{user.email}</span>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
        ) : (
          <button onClick={() => setIsModalOpen(true)}>Login</button>
        )}
      </header>

      <LoginModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Header;
