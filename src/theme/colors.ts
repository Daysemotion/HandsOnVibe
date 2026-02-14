export type Tone = 'success' | 'warning' | 'danger';

export type AppColors = {
  bg: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textMuted: string;
  separator: string;
  accent: string;
  bubbleUser: string;
  bubbleAssistant: string;
  backdrop: string;
  tone: Record<Tone, { bg: string; text: string }>;
};

export const lightColors: AppColors = {
  bg: '#F6F7F8',
  surface: '#FFFFFF',
  surfaceElevated: '#F2F3F5',
  text: '#1A1B1E',
  textMuted: '#6C7078',
  separator: '#DDE0E5',
  accent: '#0A84FF',
  bubbleUser: '#E8F2FF',
  bubbleAssistant: '#FFFFFF',
  backdrop: 'rgba(17, 20, 24, 0.36)',
  tone: {
    success: { bg: '#E8F4EC', text: '#1E5D39' },
    warning: { bg: '#F8F1E5', text: '#7D5A13' },
    danger: { bg: '#F7E9E9', text: '#8A2B2B' },
  },
};

export const darkColors: AppColors = {
  bg: '#0E1116',
  surface: '#171B22',
  surfaceElevated: '#1F2530',
  text: '#E7ECF3',
  textMuted: '#A3ABB8',
  separator: '#2B3340',
  accent: '#5AA9FF',
  bubbleUser: '#1C2D43',
  bubbleAssistant: '#171B22',
  backdrop: 'rgba(2, 4, 8, 0.62)',
  tone: {
    success: { bg: '#1D3327', text: '#9FD8B5' },
    warning: { bg: '#3A301F', text: '#E0C182' },
    danger: { bg: '#3C2323', text: '#F1B2B2' },
  },
};
