'use client';

import { useAd } from '@/entities/ad/api/useAd';
import { useParams } from 'next/navigation';

export default function AdPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = useAd(id);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.price}</p>
      <p>{data.description}</p>
    </div>
  );
}
