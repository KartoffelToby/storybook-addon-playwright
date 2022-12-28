import { mocked } from 'jest-mock';

export const useScreenshotUpdateState = jest.fn();

mocked(useScreenshotUpdateState).mockImplementation(() => ({
  handleClose: jest.fn(),
  handleLoadingDone: jest.fn(),
  runDiffTest: jest.fn(),
  updateInf: {},
}));
