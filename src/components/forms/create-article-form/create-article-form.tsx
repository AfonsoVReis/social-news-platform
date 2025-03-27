'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { routes } from '@/constants/routes';
import { useArticles } from '@/hooks/use-articles';
import styles from './create-article-form.module.css';

type NewsFormInputs = {
  title: string;
  description: string;
  body: string;
  category: string;
  imageUrl: string;
  isDraft: boolean;
};

export const CreateArticleForm = () => {
  const { availableCategories, handleAddArticle } = useArticles();
  const { control, handleSubmit, reset } = useForm<NewsFormInputs>();
  const { user } = useUser();
  const router = useRouter();

  const [categories] = useState(availableCategories);

  const onSubmit = (data: NewsFormInputs) => {
    handleAddArticle({
      ...data,
      authorId: user?.email || 'anonymous',
      authorName: user?.name || user?.email || 'anonymous',
      date: Date.now(),
      id: Date.now().toString(),
    });

    reset();

    router.push(routes.feed);
  };

  return (
    <div className={styles.content}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContainer}>
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                fullWidth
                helperText={fieldState.error?.message}
                label="Title"
                margin="normal"
                rows={2}
              />
            )}
            rules={{ required: 'Title is required' }}
          />

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                fullWidth
                helperText={fieldState.error?.message}
                label="Short Description"
                multiline
                rows={2}
              />
            )}
            rules={{ required: 'Description is required' }}
          />

          <Controller
            control={control}
            name="body"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                fullWidth
                helperText={fieldState.error?.message}
                label="Body"
                multiline
                rows={6}
              />
            )}
            rules={{ required: 'Body is required' }}
          />

          <Controller
            control={control}
            name="imageUrl"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                fullWidth
                helperText={
                  fieldState.error?.message ||
                  'https://picsum.photos/seed/111/800/600.webp'
                }
                label="Image URL"
                margin="normal"
              />
            )}
            rules={{
              pattern: {
                message: 'Enter a valid image URL',
                value: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/,
              },
              required: 'Image URL is required',
            }}
          />

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Category"
                margin="normal"
                select
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            )}
            rules={{ required: 'Category is required' }}
          />

          <Controller
            control={control}
            defaultValue={false}
            name="isDraft"
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Save as Draft"
              />
            )}
          />

          <Button color="primary" type="submit">
            Submit Article
          </Button>
        </div>
      </form>
    </div>
  );
};
