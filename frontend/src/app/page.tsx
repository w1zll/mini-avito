import { getAds } from '@/entities/ad/api/getAds';
import { AdsList } from '@/entities/ad/ui/AdsList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['ads', { search: '', minPrice: undefined, maxPrice: undefined }],
    queryFn: () => getAds({ page: 1, limit: 10 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdsList />
    </HydrationBoundary>
  );
}
