import { formatDate } from '../../utils/date';

describe('formatDate function', () => {
  it('should format a timestamp correctly', () => {
    const date = 1672531199000;
    const result = formatDate(date);

    expect(result).toBe('31 Dec 2022');
  });
});
