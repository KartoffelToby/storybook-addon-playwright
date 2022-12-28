import { mocked } from 'jest-mock';

export const testScreenshots = jest.fn();

mocked(testScreenshots).mockImplementation(() => {
  return new Promise((resolve) => {
    resolve([
      {
        pass: true,
      },
    ]);
  });
});
