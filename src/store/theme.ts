import { create } from 'zustand';
import { Theme } from '@emotion/react';

type ThemeType = 'light' | 'dark';

const LightTheme: Theme = {
  colors: {
    fontColor: '#2F354D',
    bgColor: 'rgba(255, 255, 255, 0.50)',
    contentBgColor: '#F9FAFC',
    mainBgColor: '#FFF',
    tableBodyFontColor: '#2f354d',
    tableHeaderFontColor: '#fff',
    btnBg: '#2F354D',
    selectShadow: '0px 8px 20px 0px #dee2ec80',
    selectColor: 'rgba(0, 0, 0, 0.87)',
    nftShadow: '0px 10px 20px 1px rgba(183, 55, 55, 0.3)',
    nodataColor: 'rgba(0, 0, 0, 0.25)',
    isDark: false,
    disBtnColor: 'rgba(47, 53, 77, 0.2)',
  },
};

const DarkTheme: Theme = {
  colors: {
    fontColor: '#ffffff',
    bgColor: '#202020',
    contentBgColor: '#202020',
    mainBgColor: '#272727',
    tableBodyFontColor: '#fff',
    tableHeaderFontColor: '#272727',
    btnBg: '#FA4E44',
    selectShadow: '0px 8px 20px rgba(222, 226, 236, 0.05)',
    selectColor: 'white',
    nftShadow: 'none',
    nodataColor: 'rgba(255, 255, 255, 0.25)',
    isDark: true,
    disBtnColor: 'rgba(255, 255, 255, 0.05)',
  },
};

type State = {
  type: ThemeType;
  theme: Theme;
};

type Actions = {
  updateTheme: (type: ThemeType) => void;
};

export const useTheme = create<State & Actions>(set => {
  const storedType = localStorage.getItem('themeType') as ThemeType | null;
  const initialType: ThemeType = storedType || 'dark';

  return {
    type: initialType,
    theme: initialType === 'light' ? LightTheme : DarkTheme,
    updateTheme: type =>
      set(() => {
        localStorage.setItem('themeType', type);
        const theme = type === 'light' ? LightTheme : DarkTheme;
        return {
          type,
          theme,
        };
      }),
  };
});
