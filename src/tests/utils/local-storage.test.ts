import { updateLocalStorage } from '../../utils/local-storage';
import { mockArticles } from '../../mocks/articles';

describe('updateLocalStorage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        clear: jest.fn(),
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('should update localStorage with the correct data', () => {
    updateLocalStorage(mockArticles);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'articles',
      JSON.stringify(mockArticles),
    );
  });
});
