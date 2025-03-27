'use client';
import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { routes } from '@/constants/routes';
import { useArticles } from '@/hooks/use-articles';
import { NewsFormInputs } from '@/types/forms';
import styles from './edit-article-form.module.css';

export const EditArticleForm = ({ articleId }: { articleId: string }) => {
  const { article, availableCategories, handleUpdateArticle } =
    useArticles(articleId);
  const router = useRouter();

  const { control, handleSubmit } = useForm<NewsFormInputs>({
    defaultValues: {
      body: article?.body,
      category: article?.category,
      description: article?.description,
      imageUrl: article?.imageUrl,
      isDraft: article?.isDraft,
      title: article?.title,
    },
  });

  const onSubmit = (data: NewsFormInputs) => {
    if (!article) {
      return;
    }

    handleUpdateArticle({
      ...article,
      ...data,
    });

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
                  fieldState.error?.message || 'Enter a valid image URL'
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
                {availableCategories.map((category) => (
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
            Update Article
          </Button>
        </div>
      </form>
    </div>
  );
};
