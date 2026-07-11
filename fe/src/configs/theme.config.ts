interface ColorConfig {
  background: string;
  foreground: string;
}

interface ThemeConfig {
  light: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
  };
  dark: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
  };
}

export const themeConfig: ThemeConfig = {
  light: {
    background: '#FFFFFF',
    foreground: '#262428',
    card: {
      background: '#FFFFFF',
      foreground: '#242424',
    },
    popover: {
      background: '#FFFFFF',
      foreground: '#262428',
    },
    primary: {
      background: '#262428',
      foreground: '#FFFFFF',
    },
    secondary: {
      background: '#F0F0F0',
      foreground: '#262428',
    },
    muted: {
      background: '#F0F0F0',
      foreground: '#494949',
    },
    accent: {
      background: '#AADDDD',
      foreground: '#262428',
    },
    destructive: {
      background: '#DC3545',
      foreground: '#FFFFFF',
    },
    warning: {
      background: '#FF4500',
      foreground: '#FFFFFF',
    },
    success: {
      background: '#28A745',
      foreground: '#FFFFFF',
    },
    info: {
      background: '#007AFF',
      foreground: '#FFFFFF',
    },
    border: '#E6E6E6',
    input: '#F0F0F0',
    ring: '#262428',
  },
  dark: {
    background: '#1A1820',
    foreground: '#F0F0F0',
    card: {
      background: '#242424',
      foreground: '#F0F0F0',
    },
    popover: {
      background: '#242424',
      foreground: '#F0F0F0',
    },
    primary: {
      background: '#F0F0F0',
      foreground: '#262428',
    },
    secondary: {
      background: '#262428',
      foreground: '#F0F0F0',
    },
    muted: {
      background: '#262428',
      foreground: '#A0A0A0',
    },
    accent: {
      background: '#AADDDD',
      foreground: '#262428',
    },
    destructive: {
      background: '#E83737',
      foreground: '#FFFFFF',
    },
    warning: {
      background: '#FF4500',
      foreground: '#FFFFFF',
    },
    success: {
      background: '#28A745',
      foreground: '#FFFFFF',
    },
    info: {
      background: '#007AFF',
      foreground: '#FFFFFF',
    },
    border: '#3A3840',
    input: '#313B2D',
    ring: '#AADDDD',
  },
};
