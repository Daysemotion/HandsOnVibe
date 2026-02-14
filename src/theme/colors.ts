export type Tone = 'success' | 'warning' | 'danger';

export type AppColors = {
  bg: string;
  surface: string;
  surfaceElevated: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  separator: string;
  accent: string;
  accentStrong: string;
  bubbleUser: string;
  bubbleAssistant: string;
  backdrop: string;
  tone: Record<Tone, { bg: string; text: string }>;
};

export const lightColors: AppColors = {
  bg: '#F6F7F8',
  surface: '#FFFFFF',
  surfaceElevated: '#F8FAFC',
  surfaceMuted: '#F1F5F9',
  text: '#111827',
  textMuted: '#6B7280',
  separator: '#E5E7EB',
  accent: '#137FEC',
  accentStrong: '#0A67C8',
  bubbleUser: '#EFF6FF',
  bubbleAssistant: '#FFFFFF',
  backdrop: 'rgba(15, 23, 42, 0.28)',
  tone: {
    success: { bg: '#E7F7EE', text: '#18623B' },
    warning: { bg: '#FFF3E2', text: '#85551E' },
    danger: { bg: '#FDEBEC', text: '#8A2A2E' },
  },
};

export const darkColors: AppColors = {
  bg: '#101922',
  surface: '#15202B',
  surfaceElevated: '#1A2734',
  surfaceMuted: '#223447',
  text: '#E7EDF5',
  textMuted: '#9AA9BC',
  separator: '#2A3A4D',
  accent: '#6EA8FF',
  accentStrong: '#5A97F3',
  bubbleUser: '#1E3858',
  bubbleAssistant: '#15202B',
  backdrop: 'rgba(2, 6, 12, 0.72)',
  tone: {
    success: { bg: '#183A2A', text: '#A9E2BF' },
    warning: { bg: '#3F301D', text: '#F0C78D' },
    danger: { bg: '#412527', text: '#F4BCBD' },
  },
};
