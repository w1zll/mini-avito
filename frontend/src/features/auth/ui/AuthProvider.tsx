'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../api/refresh';
import { loginSuccess, setLoading } from '../authSlice';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await refreshToken();

        dispatch(
          loginSuccess({
            accessToken: data.accessToken,
            user: data.user,
          }),
        );
      } catch (error) {}
      dispatch(setLoading(false));
    };
    initAuth();
  }, [dispatch]);
  return <>{children}</>;
}
