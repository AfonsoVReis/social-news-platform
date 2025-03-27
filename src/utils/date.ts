export const formatDate = (dateString: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  const date = new Date(dateString);

  return date.toLocaleDateString('en-GB', options);
};
