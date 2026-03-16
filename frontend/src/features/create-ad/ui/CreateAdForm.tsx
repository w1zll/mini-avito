'use client';

import { createAd } from '@/entities/ad/api/createAd';
import {
  CreateAdForm as TypeCreateAdForm,
  createAdSchema,
} from '@/entities/ad/model/createAdSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export default function CreateAdForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
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
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 bg-white/3 flex gap-4 flex-col max-w-100 mx-auto border border-gray-300 p-4 rounded-md"
    >
      <h2 className="border-b">Create Ad</h2>

      <input
        className="border p-2"
        type="text"
        placeholder="Title"
        {...register('title')}
      />
      {errors.title && <p>{errors.title.message}</p>}

      <input
        className="border p-2"
        type="number"
        placeholder="Price"
        {...register('price', { valueAsNumber: true })}
      />
      {errors.price && <p>{errors.price.message}</p>}

      <input
        className="border p-2"
        type="text"
        placeholder="Description"
        {...register('description')}
      />
      {errors.description && <p>{errors.description.message}</p>}

      <button
        className="border p-2 rounded-md hover:bg-white/5 cursor-pointer"
        type="submit"
      >
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
