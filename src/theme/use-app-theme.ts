import { useColorScheme } from 'react-native';

import { darkColors, lightColors } from '@/theme/colors';

export const useAppTheme = () => {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';

  return {
    colorScheme,
    colors: colorScheme === 'dark' ? darkColors : lightColors,
  };
};
