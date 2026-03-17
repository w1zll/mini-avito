'use client';

import { createAd } from '@/entities/ad/api/createAd';
import {
  CreateAdForm as TypeCreateAdForm,
  createAdSchema,
} from '@/entities/ad/model/createAdSchema';
import Button from '@/shared/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CreateAdForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      reset();

      toast.success('Объявление успешно создано.', {
        position: 'top-center',
      });
    },
    onError: () => {
      toast.error('Не удалось создать объявление. Попробуйте ещё раз.', {
        position: 'top-center',
      });
    },
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeCreateAdForm>({
    resolver: zodResolver(createAdSchema),
  });

  const onSubmit = (data: TypeCreateAdForm) => {
    mutation.mutate(data);
    // reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
    >
      <h2 className="mb-6 text-lg font-semibold text-white">
        Создание объявления
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Название"
            {...register('title')}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white transition"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Цена"
            {...register('price', { valueAsNumber: true })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white transition"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Описание"
            {...register('description')}
            rows={3}
            className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white transition"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Создание...' : 'Создать объявление'}
        </Button>
      </div>
    </form>
  );
}
