import { ClientPage } from './ClientPage';

export const revalidate = 5 * 60;

export default async function AdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let data;
  let error = null;
  try {
    const result = await fetch(`http://localhost:4000/ads/${id}`, {
      next: { revalidate },
    });
    data = await result.json();
  } catch (err) {
    error = 'Ошибка загрузки объявления';
  }

  return (
    <ClientPage
      title={data?.title}
      description={data?.description}
      price={data?.price}
      error={error}
    />
  );
}
