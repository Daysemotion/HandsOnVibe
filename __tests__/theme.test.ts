import { darkColors, lightColors } from '@/theme/colors';

describe('theme tokens', () => {
  it('contains required tone colors', () => {
    expect(lightColors.tone.success.bg).toBeTruthy();
    expect(lightColors.tone.warning.bg).toBeTruthy();
    expect(lightColors.tone.danger.bg).toBeTruthy();
  });

  it('has distinct light and dark base backgrounds', () => {
    expect(lightColors.bg).not.toBe(darkColors.bg);
  });
});
