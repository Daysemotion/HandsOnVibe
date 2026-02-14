import { unstable_settings } from '../app/(tabs)/_layout';

describe('tabs config', () => {
  it('uses chat as initial route', () => {
    expect(unstable_settings.initialRouteName).toBe('chat');
  });
});
