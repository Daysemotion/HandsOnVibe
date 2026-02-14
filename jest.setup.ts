import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mockReanimated = require('react-native-reanimated/mock');
  mockReanimated.default.call = () => {};
  return mockReanimated;
});

jest.mock('@expo/vector-icons', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require('react-native');

  return {
    MaterialIcons: ({ name, ...props }: { name: string }) =>
      React.createElement(Text, props, name ?? 'icon'),
  };
});
