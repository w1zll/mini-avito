'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

interface Props {
  title?: string;
  description?: string;
  price?: number;
  error?: string | null;
}

export const ClientPage = ({ title, price, description, error }: Props) => {
  useEffect(() => {
    if (error) {
      console.log('error', error);
      setTimeout(() => {
        toast.error(error, { position: 'top-center' });
      }, 100);
    }
  }, [error]);
  if (error || !title) return null;
  return (
    <div>
      <h3>{title}</h3>
      <p>{price} ₽</p>
      <p>{description}</p>
    </div>
  );
};
