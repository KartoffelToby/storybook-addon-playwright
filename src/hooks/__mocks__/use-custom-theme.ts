import { createTheme } from '@material-ui/core';
import { mocked } from 'jest-mock';

export const useCustomTheme = jest.fn();

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});

mocked(useCustomTheme).mockImplementation(() => ({
  theme,
}));
