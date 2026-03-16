import { getAds } from '@/entities/ad/api/getAds';
import { useAds } from '@/entities/ad/api/useAds';
import { AdsList } from '@/entities/ad/ui/AdsList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['ads', { page: 1, limit: 10 }],
    queryFn: () => getAds({ page: 1, limit: 10 }),
  });
  // const { data, isLoading } = useAds({
  //   page: 1,
  //   limit: 10,
  // });
  // if (isLoading) return <div>Loading...</div>;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1>Mini Avito</h1>
      <AdsList />
    </HydrationBoundary>
  );
}
